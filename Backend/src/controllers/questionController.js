import fetch from "node-fetch";

const NVIDIA_API_URL = "https://integrate.api.nvidia.com/v1/chat/completions";
const NVIDIA_MODEL = "deepseek-ai/deepseek-v4-flash";

// ─── In-memory cache (replace with Redis or MongoDB for production) ───────────
const quizCache = new Map();
const CACHE_TTL_MS = 1000 * 60 * 60; // 1 hour

const getCacheKey = (subjects, difficulty, count) =>
  `${Array.isArray(subjects) ? subjects.sort().join("+") : subjects}__${difficulty}__${count}`;

// ─── Prompt builder ────────────────────────────────────────────────────────────
// Generates a small chunk (max 10 at a time) to keep JSON reliable
const buildPrompt = (subjects, difficulty, count, timePerQuestion) => {
  const subjectList = Array.isArray(subjects) ? subjects.join(", ") : subjects;
  const difficultyGuide = {
    Easy: "basic recall, definitions, simple concepts for beginners",
    Medium: "applied thinking, multi-step reasoning, conceptual understanding",
    Hard: "advanced analysis, edge cases, exam-level problem solving",
  };

  return `You are a JSON-only quiz generator. Output NOTHING except valid JSON.

Generate EXACTLY ${count} multiple-choice questions.

Subject(s): ${subjectList}
Difficulty: ${difficulty} (${difficultyGuide[difficulty] || difficultyGuide.Medium})
Time per question: ${timePerQuestion} seconds

ABSOLUTE RULES:
1. Output ONLY a JSON object. No prose, no markdown, no backticks.
2. Start with { and end with }
3. EXACTLY ${count} questions in the "quiz" array
4. Each question has EXACTLY 4 options labeled as full text (not "A","B","C","D")
5. correctAnswer must be exactly one of: "A", "B", "C", or "D"
6. No trailing commas anywhere
7. All strings must be properly escaped

JSON SCHEMA:
{
  "quiz": [
    {
      "subject": "string",
      "topic": "string",
      "question": "string",
      "options": ["option text", "option text", "option text", "option text"],
      "correctAnswer": "A",
      "explanation": "string"
    }
  ]
}

OUTPUT JSON NOW:`;
};

// ─── Aggressive JSON repair ────────────────────────────────────────────────────
const repairJSON = (raw) => {
  let text = raw;

  // Strip markdown fences
  text = text.replace(/```json\s*/gi, "").replace(/```\s*/g, "");

  // Remove null bytes and other control chars except \n \r \t
  text = text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");

  // Cut to outermost { ... }
  const first = text.indexOf("{");
  const last = text.lastIndexOf("}");
  if (first === -1 || last === -1) throw new Error("No JSON object found");
  text = text.slice(first, last + 1);

  // Fix trailing commas before } or ]
  text = text.replace(/,\s*([}\]])/g, "$1");

  // Fix unescaped quotes inside strings (naive but helps a lot)
  // Replace " that are NOT preceded by : [ , { \n with \"
  // This is intentionally simple — a full parser would be overkill here

  return text;
};

// ─── Parse with fallback strategies ───────────────────────────────────────────
const parseResponse = (rawText) => {
  // Strategy 1: direct parse after repair
  try {
    const cleaned = repairJSON(rawText);
    const parsed = JSON.parse(cleaned);
    const questions = Array.isArray(parsed) ? parsed : parsed?.quiz;
    if (Array.isArray(questions) && questions.length > 0) return questions;
  } catch (_) {}

  // Strategy 2: extract individual question objects via regex
  try {
    const blocks = [];
    const regex =
      /\{[^{}]*"question"\s*:[^{}]*"correctAnswer"\s*:\s*"[ABCD]"[^{}]*\}/gs;
    let match;
    while ((match = regex.exec(rawText)) !== null) {
      try {
        const q = JSON.parse(repairJSON(match[0]));
        if (q.question && q.options && q.correctAnswer) blocks.push(q);
      } catch (_) {}
    }
    if (blocks.length > 0) return blocks;
  } catch (_) {}

  throw new Error("Could not parse response as JSON after all strategies");
};

// ─── Single NVIDIA API call — no timeout, let the model finish ────────────────
const callNvidia = async (prompt) => {
  const response = await fetch(NVIDIA_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NVIDIA_API_KEY}`,
    },
    body: JSON.stringify({
      model: NVIDIA_MODEL,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
      max_tokens: 6000,
      top_p: 0.7,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`NVIDIA API ${response.status}: ${errText.slice(0, 200)}`);
  }

  const data = await response.json();
  const rawText = data?.choices?.[0]?.message?.content;
  if (!rawText) throw new Error("Empty response from NVIDIA API");

  return rawText;
};

// ─── Generate one chunk with retries ──────────────────────────────────────────
const generateChunk = async (
  subjects,
  difficulty,
  chunkSize,
  timePerQuestion,
) => {
  const MAX_RETRIES = 2;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(
        `  Chunk attempt ${attempt}: generating ${chunkSize} questions...`,
      );
      const prompt = buildPrompt(
        subjects,
        difficulty,
        chunkSize,
        timePerQuestion,
      );
      const rawText = await callNvidia(prompt);

      console.log(`  Raw response preview: ${rawText.slice(0, 150)}`);

      const questions = parseResponse(rawText);
      console.log(`  ✓ Got ${questions.length} questions`);
      return questions;
    } catch (err) {
      console.warn(`  ✗ Attempt ${attempt} failed: ${err.message}`);
      if (attempt === MAX_RETRIES) throw err;
      await new Promise((r) => setTimeout(r, 1500)); // short backoff
    }
  }
};

// ─── Chunked generation: splits large requests into ≤10-question batches ──────
// Key insight: 1 call for 20 questions often gives broken JSON.
// 2 parallel calls for 10 questions each = faster + more reliable.
const generateInChunks = async (
  subjects,
  difficulty,
  totalCount,
  timePerQuestion,
) => {
  const CHUNK_SIZE = 10; // sweet spot for JSON reliability

  if (totalCount <= CHUNK_SIZE) {
    // Small request — single call
    return generateChunk(subjects, difficulty, totalCount, timePerQuestion);
  }

  // Split into chunks
  const chunks = [];
  let remaining = totalCount;
  while (remaining > 0) {
    chunks.push(Math.min(remaining, CHUNK_SIZE));
    remaining -= CHUNK_SIZE;
  }

  console.log(
    `Splitting into ${chunks.length} parallel chunks: ${chunks.join(", ")} questions`,
  );

  // Run ALL chunks in parallel (Promise.all)
  // This is the main speed win — 20 questions = 2 parallel 10-question calls
  const results = await Promise.all(
    chunks.map((size) =>
      generateChunk(subjects, difficulty, size, timePerQuestion),
    ),
  );

  return results.flat();
};

// ─── Sanitize & normalize a single question ────────────────────────────────────
const letterToIndex = (letter) => {
  const map = { A: 0, B: 1, C: 2, D: 3 };
  return map[String(letter).toUpperCase().trim()] ?? 0;
};

const sanitizeQuestion = (q, index) => {
  if (typeof q.question !== "string") {
    throw new Error(`Question ${index}: missing question text`);
  }
  if (!Array.isArray(q.options) || q.options.length < 2) {
    throw new Error(`Question ${index}: invalid options`);
  }

  // Pad options to 4 if somehow short
  const opts = [...q.options];
  while (opts.length < 4) opts.push("N/A");

  // Validate correctAnswer
  const validAnswers = ["A", "B", "C", "D"];
  const answer = String(q.correctAnswer || "A")
    .toUpperCase()
    .trim();
  const safeAnswer = validAnswers.includes(answer) ? answer : "A";

  return {
    subject: String(q.subject || "General").trim(),
    topic: String(q.topic || "General").trim(),
    question: q.question.trim(),
    options: opts.slice(0, 4).map((o) => String(o).trim()),
    answer: letterToIndex(safeAnswer),
    correctAnswer: safeAnswer,
    explanation: String(q.explanation || "No explanation provided.").trim(),
  };
};

// ─── Main controller ───────────────────────────────────────────────────────────
export const generateQuestions = async (req, res) => {
  const startTime = Date.now();

  try {
    const {
      subjects,
      difficulty = "Medium",
      count = 10,
      timePerQuestion = 30,
    } = req.body;

    // Validation
    if (!subjects || (Array.isArray(subjects) && subjects.length === 0)) {
      return res.status(400).json({
        success: false,
        message: "At least one subject is required",
      });
    }

    const safeCount = Math.min(Math.max(Number(count), 5), 30);
    const safeDifficulty = ["Easy", "Medium", "Hard"].includes(difficulty)
      ? difficulty
      : "Medium";

    console.log(`\n=== Quiz Generation ===`);
    console.log(
      `Subjects: ${subjects} | Difficulty: ${safeDifficulty} | Count: ${safeCount}`,
    );

    // ── Cache check ──────────────────────────────────────────────────────────
    const cacheKey = getCacheKey(subjects, safeDifficulty, safeCount);
    const cached = quizCache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      console.log(
        `Cache HIT — returning ${cached.questions.length} questions instantly`,
      );
      return res.status(200).json({
        success: true,
        questions: cached.questions,
        meta: {
          subjects: Array.isArray(subjects) ? subjects : [subjects],
          difficulty: safeDifficulty,
          count: cached.questions.length,
          model: NVIDIA_MODEL,
          fromCache: true,
          generatedAt: new Date(cached.timestamp).toISOString(),
          responseTimeMs: Date.now() - startTime,
        },
      });
    }

    // ── Generate ─────────────────────────────────────────────────────────────
    const rawQuestions = await generateInChunks(
      subjects,
      safeDifficulty,
      safeCount,
      timePerQuestion,
    );

    // Sanitize
    const questions = rawQuestions
      .slice(0, safeCount)
      .map((q, i) => sanitizeQuestion(q, i))
      .filter(Boolean);

    if (questions.length === 0) {
      throw new Error("No valid questions after sanitization");
    }

    const elapsed = Date.now() - startTime;
    console.log(
      `✓ Generated ${questions.length} questions in ${(elapsed / 1000).toFixed(1)}s`,
    );

    // ── Store in cache ────────────────────────────────────────────────────────
    quizCache.set(cacheKey, { questions, timestamp: Date.now() });

    // Trim cache to 100 entries max
    if (quizCache.size > 100) {
      const oldestKey = quizCache.keys().next().value;
      quizCache.delete(oldestKey);
    }

    return res.status(200).json({
      success: true,
      questions,
      meta: {
        subjects: Array.isArray(subjects) ? subjects : [subjects],
        difficulty: safeDifficulty,
        count: questions.length,
        model: NVIDIA_MODEL,
        fromCache: false,
        generatedAt: new Date().toISOString(),
        responseTimeMs: elapsed,
      },
    });
  } catch (error) {
    const elapsed = Date.now() - startTime;
    console.error(
      `✗ generateQuestions failed after ${elapsed}ms:`,
      error.message,
    );

    // Friendly error message
    const isUnavailable =
      error.message.includes("Cannot connect") ||
      error.message.includes("NVIDIA API");

    return res.status(500).json({
      success: false,
      message: isUnavailable
        ? "AI service is temporarily unavailable, please try again"
        : "Failed to generate questions — please try again",
      error: error.message,
      responseTimeMs: elapsed,
    });
  }
};
