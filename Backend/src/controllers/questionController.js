import axios from "axios";
import http from "http";
import https from "https";

const NVIDIA_API_URL = "https://integrate.api.nvidia.com/v1/chat/completions";
const NVIDIA_MODEL = "deepseek-ai/deepseek-v4-flash";

// ─── Validate API key at startup ─────────────────────────────────────────────
let apiKeyWarned = false;
// Log key status at module load so Render logs show it immediately
setTimeout(() => {
  const key = process.env.NVIDIA_API_KEY;
  if (!key || key.trim() === "") {
    console.error(
      "❌ NVIDIA_API_KEY is NOT set — quiz generation will fail! Add it to Render environment variables.",
    );
  } else {
    console.log(`NVIDIA_API_KEY loaded (starts with: ${key.slice(0, 12)}...)`);
  }
}, 1000);

// ─── Keep-alive agents prevent TCP idle timeouts on slow AI responses ─────────
const httpAgent = new http.Agent({ keepAlive: true, keepAliveMsecs: 30000 });
const httpsAgent = new https.Agent({ keepAlive: true, keepAliveMsecs: 30000 });

// ─── In-memory cache (replace with Redis or MongoDB for production) ───────────
const quizCache = new Map();
const CACHE_TTL_MS = 1000 * 60 * 60; // 1 hour

const getCacheKey = (subjects, difficulty, count) =>
  `${Array.isArray(subjects) ? subjects.sort().join("+") : subjects}__${difficulty}__${count}`;

// ─── Prompt builder ────────────────────────────────────────────────────────────
// Optimized: much shorter prompt = fewer input tokens = faster first-token
const buildPrompt = (subjects, difficulty, count) => {
  const subjectList = Array.isArray(subjects) ? subjects.join(", ") : subjects;

  return `
Generate ${count} ${difficulty} MCQs on ${subjectList}.

Return ONLY JSON:
{"quiz":[{"question":"","options":["","","",""],"correctAnswer":"A"}]}`;
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

// ─── Single NVIDIA API call using axios with keep-alive ───────────────────────
const callNvidia = async (prompt) => {
  try {
    const response = await axios.post(
      NVIDIA_API_URL,
      {
        model: NVIDIA_MODEL,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.4,
        max_tokens: 1000,
        top_p: 0.7,
        stream: false,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NVIDIA_API_KEY}`,
        },
        timeout: 120000, // 120s total request timeout
        httpAgent,
        httpsAgent,
        // Prevent axios from buffering large responses in memory
        maxContentLength: 50 * 1024 * 1024,
        maxBodyLength: 50 * 1024 * 1024,
      },
    );

    const rawText = response.data?.choices?.[0]?.message?.content;
    if (!rawText) {
      console.error(
        "NVIDIA API returned empty content:",
        JSON.stringify(response.data).slice(0, 300),
      );
      throw new Error("Empty response from NVIDIA API");
    }

    return rawText;
  } catch (err) {
    // Axios wraps errors — extract useful info
    if (err.code === "ECONNABORTED" || err.code === "ETIMEDOUT") {
      throw new Error(
        "NVIDIA API request timed out — the AI service is slow, please retry",
      );
    }
    if (err.response) {
      const status = err.response.status;
      const body =
        typeof err.response.data === "string"
          ? err.response.data.slice(0, 500)
          : JSON.stringify(err.response.data).slice(0, 500);
      console.error(`NVIDIA API error — Status: ${status}, Body: ${body}`);
      throw new Error(`NVIDIA API ${status}: ${body.slice(0, 200)}`);
    }
    throw err;
  }
};

// ─── Generate one chunk with retries ──────────────────────────────────────────
const generateChunk = async (subjects, difficulty, chunkSize) => {
  const MAX_RETRIES = 2;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(
        `  Chunk attempt ${attempt}: generating ${chunkSize} questions...`,
      );
      const prompt = buildPrompt(subjects, difficulty, chunkSize);
      const rawText = await callNvidia(prompt);

      console.log(`  Raw response preview: ${rawText.slice(0, 150)}`);

      const questions = parseResponse(rawText);
      console.log(`  ✓ Got ${questions.length} questions`);
      return questions;
    } catch (err) {
      console.warn(`  ✗ Attempt ${attempt} failed: ${err.message}`);
      if (attempt === MAX_RETRIES) throw err;
      await new Promise((r) => setTimeout(r, 500)); // short backoff
    }
  }
};

// ─── Chunked generation: splits requests into ≤5-question batches ─────────────
// Using 5 instead of 10 gives better parallelism:
// 10 questions = 2 parallel 5-question calls ≈ half the wall-clock time
const generateInChunks = async (subjects, difficulty, totalCount) => {
  const CHUNK_SIZE = 5;

  if (totalCount <= CHUNK_SIZE) {
    // Small request — single call
    return generateChunk(subjects, difficulty, totalCount);
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
  const results = await Promise.all(
    chunks.map((size) => generateChunk(subjects, difficulty, size)),
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
    // Guard: check API key
    const key = process.env.NVIDIA_API_KEY;
    if (!key || key.trim() === "") {
      if (!apiKeyWarned) {
        console.error(
          "❌ NVIDIA_API_KEY is missing from environment variables.",
        );
        console.error(
          "   → Go to Render dashboard → your service → Environment → add NVIDIA_API_KEY",
        );
        apiKeyWarned = true;
      }
      return res.status(500).json({
        success: false,
        message:
          "AI service is not configured — NVIDIA_API_KEY missing on server",
      });
    }

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
    console.error(`  Full error:`, error.stack || error);

    // Friendly error message
    const isTimeout =
      error.message.includes("timed out") ||
      error.message.includes("ETIMEDOUT") ||
      error.message.includes("ECONNABORTED");
    const isUnavailable =
      error.message.includes("Cannot connect") ||
      error.message.includes("NVIDIA API") ||
      isTimeout;

    return res.status(500).json({
      success: false,
      message: isTimeout
        ? "AI service took too long — please try again"
        : isUnavailable
          ? "AI service is temporarily unavailable, please try again"
          : "Failed to generate questions — please try again",
      error: error.message,
      responseTimeMs: elapsed,
    });
  }
};
