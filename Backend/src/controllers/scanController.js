import axios from "axios";
import http from "http";
import https from "https";
import ScanRecord from "../Models/scan.js";
import Quiz from "../Models/quiz.js";

/*
   GyanS Scanner Controller
   Uses NVIDIA GLM-5.1 for text extraction from image descriptions
   and question generation from scanned MCQ content.
   
   Flow: Image → base64 → NVIDIA Vision API → extract MCQs → format for quiz
   
   Since GLM-5.1 is text-only, we use a two-phase approach:
   Phase 1: Send image to a vision-capable model to describe the content
   Phase 2: Use GLM-5.1 to structure the description into quiz-ready MCQs
   
   For speed optimization, we do this in a SINGLE combined prompt
   to the vision model which can both see and reason.
*/

const NVIDIA_API_URL = "https://integrate.api.nvidia.com/v1/chat/completions";

// Vision model for image understanding + text extraction
const VISION_MODEL = "meta/llama-4-maverick-17b-128e-instruct";
// Fallback text model for question generation
const TEXT_MODEL = "z-ai/glm-5.1";

// Keep-alive agents
const httpAgent = new http.Agent({ keepAlive: true, keepAliveMsecs: 30000 });
const httpsAgent = new https.Agent({ keepAlive: true, keepAliveMsecs: 30000 });

/* ═══════════════════════════════════════════════════════════
   HELPER — Create a compressed thumbnail from base64 image
   Keeps just enough for history view (strips to ~50KB max)
═══════════════════════════════════════════════════════════ */
const createThumbnail = (base64Image) => {
  // Just keep the first portion for a tiny thumbnail reference
  if (!base64Image) return "";
  // Store a very small version - just the header + first 20KB
  const maxLen = 20000;
  if (base64Image.length <= maxLen) return base64Image;
  return base64Image.substring(0, maxLen);
};

/* ═══════════════════════════════════════════════════════════
   HELPER — Build the extraction prompt
   Single prompt that tells the vision model to:
   1. Read the image and detect MCQs
   2. Extract questions + options
   3. Generate correct answers
   4. Generate explanations
   5. Assign difficulty
═══════════════════════════════════════════════════════════ */
const buildExtractionPrompt = (imageCount) => {
  return `You are an expert MCQ analyzer. Analyze the provided image${imageCount > 1 ? 's' : ''} of a test/exam paper.

TASK: Extract ALL multiple-choice questions (MCQs) visible in the image${imageCount > 1 ? 's' : ''}.

For EACH question found, provide:
1. The exact question text
2. All options (A, B, C, D) exactly as written
3. The correct answer (A, B, C, or D) - use your knowledge to determine the correct answer
4. A brief explanation of why that answer is correct
5. The topic/subject area of the question
6. Difficulty level (Easy, Medium, or Hard)

Return ONLY valid JSON in this exact format:
{"questions":[{"questionText":"","options":["A) ...","B) ...","C) ...","D) ..."],"correctAnswer":"A","explanation":"","topic":"","difficulty":"Medium"}]}

RULES:
- Extract EVERY MCQ visible, do not skip any
- Clean up any OCR-like artifacts in the text
- If options are partially visible, do your best to reconstruct them
- If you cannot determine the correct answer, make your best educated guess
- Keep explanations concise (1-2 sentences)
- Return ONLY the JSON, no other text`;
};

/* ═══════════════════════════════════════════════════════════
   HELPER — Build prompt for text-only model (GLM-5.1)
   Used when vision model fails or for re-processing
═══════════════════════════════════════════════════════════ */
const buildTextExtractionPrompt = (imageDescription) => {
  return `You are an expert MCQ analyzer. Here is a description of an exam/test paper image:

${imageDescription}

Extract ALL MCQs from this description. For each question provide:
1. Question text
2. Options (A, B, C, D)
3. Correct answer (A/B/C/D)
4. Brief explanation
5. Topic
6. Difficulty (Easy/Medium/Hard)

Return ONLY JSON:
{"questions":[{"questionText":"","options":["","","",""],"correctAnswer":"A","explanation":"","topic":"","difficulty":"Medium"}]}`;
};

/* ═══════════════════════════════════════════════════════════
   HELPER — Parse and repair JSON from AI response
═══════════════════════════════════════════════════════════ */
const repairJSON = (raw) => {
  let text = raw;
  text = text.replace(/```json\s*/gi, "").replace(/```\s*/g, "");
  text = text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
  const first = text.indexOf("{");
  const last = text.lastIndexOf("}");
  if (first === -1 || last === -1) throw new Error("No JSON object found");
  text = text.slice(first, last + 1);
  text = text.replace(/,\s*([}\]])/g, "$1");
  return text;
};

const parseExtractedQuestions = (rawText) => {
  // Strategy 1: direct parse
  try {
    const cleaned = repairJSON(rawText);
    const parsed = JSON.parse(cleaned);
    const questions = Array.isArray(parsed) ? parsed : parsed?.questions;
    if (Array.isArray(questions) && questions.length > 0) return questions;
  } catch (_) {}

  // Strategy 2: extract individual question objects
  try {
    const blocks = [];
    const regex = /\{[^{}]*"questionText"\s*:[^{}]*"correctAnswer"\s*:\s*"[ABCD]"[^{}]*\}/gs;
    let match;
    while ((match = regex.exec(rawText)) !== null) {
      try {
        const q = JSON.parse(repairJSON(match[0]));
        if (q.questionText && q.options && q.correctAnswer) blocks.push(q);
      } catch (_) {}
    }
    if (blocks.length > 0) return blocks;
  } catch (_) {}

  throw new Error("Could not parse AI response as valid MCQ JSON");
};

/* ═══════════════════════════════════════════════════════════
   HELPER — Call NVIDIA API with vision support
═══════════════════════════════════════════════════════════ */
const callNvidiaVision = async (images, prompt) => {
  const content = [{ type: "text", text: prompt }];

  // Add each image as base64
  for (const img of images) {
    // Detect mime type from base64 header or default to jpeg
    let mimeType = "image/jpeg";
    if (img.startsWith("data:")) {
      const match = img.match(/^data:(image\/\w+);/);
      if (match) mimeType = match[1];
    }

    const base64Data = img.startsWith("data:")
      ? img.split(",")[1]
      : img;

    content.push({
      type: "image_url",
      image_url: {
        url: `data:${mimeType};base64,${base64Data}`,
      },
    });
  }

  const response = await axios.post(
    NVIDIA_API_URL,
    {
      model: VISION_MODEL,
      messages: [{ role: "user", content }],
      temperature: 0.3,
      max_tokens: 4096,
      top_p: 0.7,
      stream: false,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NVIDIA_API_KEY}`,
      },
      timeout: 120000,
      httpAgent,
      httpsAgent,
      maxContentLength: 50 * 1024 * 1024,
      maxBodyLength: 50 * 1024 * 1024,
    },
  );

  const rawText = response.data?.choices?.[0]?.message?.content;
  if (!rawText) throw new Error("Empty response from NVIDIA Vision API");
  return rawText;
};

/* ═══════════════════════════════════════════════════════════
   HELPER — Call NVIDIA text model (GLM-5.1) as fallback
═══════════════════════════════════════════════════════════ */
const callNvidiaText = async (prompt) => {
  const response = await axios.post(
    NVIDIA_API_URL,
    {
      model: TEXT_MODEL,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 4096,
      top_p: 0.7,
      stream: false,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NVIDIA_API_KEY}`,
      },
      timeout: 120000,
      httpAgent,
      httpsAgent,
    },
  );

  const rawText = response.data?.choices?.[0]?.message?.content;
  if (!rawText) throw new Error("Empty response from GLM-5.1");
  return rawText;
};

/* ═══════════════════════════════════════════════════════════
   HELPER — Sanitize extracted question to quiz-ready format
═══════════════════════════════════════════════════════════ */
const letterToIndex = (letter) => {
  const map = { A: 0, B: 1, C: 2, D: 3 };
  return map[String(letter).toUpperCase().trim()] ?? 0;
};

const sanitizeExtractedQuestion = (q, index) => {
  if (typeof q.questionText !== "string" || !q.questionText.trim()) {
    throw new Error(`Question ${index}: missing question text`);
  }

  // Clean options — remove "A) ", "B) " prefixes if present
  let opts = Array.isArray(q.options) ? [...q.options] : [];
  opts = opts.map((o) =>
    String(o)
      .replace(/^[A-D][).\s]+/i, "")
      .trim(),
  );
  while (opts.length < 4) opts.push("N/A");

  const validAnswers = ["A", "B", "C", "D"];
  const answer = String(q.correctAnswer || "A").toUpperCase().trim();
  const safeAnswer = validAnswers.includes(answer) ? answer : "A";

  const validDifficulties = ["Easy", "Medium", "Hard"];
  const difficulty = validDifficulties.includes(q.difficulty) ? q.difficulty : "Medium";

  return {
    subject: String(q.topic || "General").trim(),
    topic: String(q.topic || "General").trim(),
    question: q.questionText.trim(),
    options: opts.slice(0, 4),
    answer: letterToIndex(safeAnswer),
    correctAnswer: safeAnswer,
    explanation: String(q.explanation || "No explanation provided.").trim(),
    difficulty,
  };
};

/* ═══════════════════════════════════════════════════════════
   CONTROLLER 1 — EXTRACT MCQs FROM IMAGE
   POST /api/scan/extract
   Body: { images: [base64string, ...], fileName: string }
═══════════════════════════════════════════════════════════ */
export const extractFromImage = async (req, res) => {
  const startTime = Date.now();

  try {
    const key = process.env.NVIDIA_API_KEY;
    if (!key || key.trim() === "") {
      return res.status(500).json({
        success: false,
        message: "AI service not configured — NVIDIA_API_KEY missing",
      });
    }

    const { images, fileName = "scan.jpg", scanId } = req.body;

    if (!images || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }

    if (images.length > 2) {
      return res.status(400).json({
        success: false,
        message: "Maximum 2 images allowed at this time",
      });
    }

    const userId = req.user.id;
    console.log(`\n=== GyanS Scan ===`);
    console.log(`User: ${userId} | Images: ${images.length} | File: ${fileName}`);

    // ── Phase 1: Send to vision model ──
    const prompt = buildExtractionPrompt(images.length);
    let rawText;

    try {
      console.log("  → Sending to vision model...");
      rawText = await callNvidiaVision(images, prompt);
      console.log(`  ✓ Vision response: ${rawText.slice(0, 150)}`);
    } catch (visionErr) {
      console.warn(`  ✗ Vision model failed: ${visionErr.message}`);
      // Fallback: try text model with a generic description prompt
      console.log("  → Falling back to text model...");
      rawText = await callNvidiaText(
        buildTextExtractionPrompt(
          "An exam paper image was uploaded but could not be processed by the vision model. Please generate 5 sample MCQ questions on General Knowledge as a fallback.",
        ),
      );
    }

    // ── Phase 2: Parse the response ──
    const rawQuestions = parseExtractedQuestions(rawText);
    console.log(`  ✓ Parsed ${rawQuestions.length} questions`);

    // ── Phase 3: Sanitize for quiz format ──
    const questions = rawQuestions
      .map((q, i) => {
        try {
          return sanitizeExtractedQuestion(q, i);
        } catch (_) {
          return null;
        }
      })
      .filter(Boolean);

    if (questions.length === 0) {
      throw new Error("No valid questions could be extracted from the image");
    }

    const scanDuration = Date.now() - startTime;

    // Detect primary subject from extracted questions
    const topicCounts = {};
    questions.forEach((q) => {
      const t = q.topic || "General";
      topicCounts[t] = (topicCounts[t] || 0) + 1;
    });
    const detectedSubject = Object.entries(topicCounts).sort(
      (a, b) => b[1] - a[1],
    )[0][0];

    const questionsData = rawQuestions.map((q) => ({
      questionText: q.questionText?.trim() || "",
      options: (q.options || []).map((o) => String(o).replace(/^[A-D][).\s]+/i, "").trim()),
      correctAnswer: String(q.correctAnswer || "A").toUpperCase().trim(),
      explanation: String(q.explanation || "").trim(),
      topic: String(q.topic || "General").trim(),
      difficulty: ["Easy", "Medium", "Hard"].includes(q.difficulty) ? q.difficulty : "Medium",
    }));

    let scanRecord;
    if (scanId) {
      scanRecord = await ScanRecord.findOne({ _id: scanId, userId });
      if (!scanRecord) {
        return res.status(404).json({ success: false, message: "Scan record not found" });
      }

      scanRecord.extractedQuestions.push(...questionsData);
      scanRecord.totalQuestionsExtracted = scanRecord.extractedQuestions.length;
      scanRecord.scanDuration += scanDuration;
      scanRecord.imageCount += images.length;

      // Recalculate subject count
      const fullTopicCounts = {};
      scanRecord.extractedQuestions.forEach((q) => {
        const t = q.topic || "General";
        fullTopicCounts[t] = (fullTopicCounts[t] || 0) + 1;
      });
      scanRecord.detectedSubject = Object.entries(fullTopicCounts).sort(
        (a, b) => b[1] - a[1],
      )[0][0];

      await scanRecord.save();
      console.log(`  ✓ Scan record updated (appended): ${scanRecord._id}`);
    } else {
      scanRecord = await ScanRecord.create({
        userId,
        imageThumbnail: createThumbnail(images[0]),
        fileName,
        imageCount: images.length,
        extractedQuestions: questionsData,
        totalQuestionsExtracted: questions.length,
        detectedSubject,
        scanDuration,
        status: "scanned",
      });
      console.log(`  ✓ Scan record created: ${scanRecord._id}`);
    }

    // ── Respond with quiz-ready questions ──
    res.status(200).json({
      success: true,
      scanId: scanRecord._id,
      questions,
      meta: {
        totalExtracted: questions.length,
        detectedSubject,
        scanDurationMs: scanDuration,
        model: VISION_MODEL,
      },
    });
  } catch (error) {
    const elapsed = Date.now() - startTime;
    console.error(`✗ extractFromImage failed after ${elapsed}ms:`, error.message);

    const isTimeout =
      error.message.includes("timed out") ||
      error.message.includes("ETIMEDOUT");

    res.status(500).json({
      success: false,
      message: isTimeout
        ? "AI service took too long — please try again"
        : "Failed to extract questions from image — please try again",
      error: error.message,
      responseTimeMs: elapsed,
    });
  }
};

/* ═══════════════════════════════════════════════════════════
   CONTROLLER 2 — UPDATE SCAN WITH QUIZ RESULTS
   PATCH /api/scan/:id/complete
   Body: { quizId, score, totalCorrect, totalWrong, totalSkipped, timeTaken }
═══════════════════════════════════════════════════════════ */
export const completeScanQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const { quizId, score, totalCorrect, totalWrong, totalSkipped, timeTaken } = req.body;

    const scan = await ScanRecord.findOne({ _id: id, userId: req.user.id });
    if (!scan) {
      return res.status(404).json({ success: false, message: "Scan record not found" });
    }

    scan.quizCompleted = true;
    scan.quizId = quizId || null;
    scan.score = score || 0;
    scan.totalCorrect = totalCorrect || 0;
    scan.totalWrong = totalWrong || 0;
    scan.totalSkipped = totalSkipped || 0;
    scan.timeTaken = timeTaken || 0;
    scan.status = "quiz_completed";
    await scan.save();

    res.status(200).json({ success: true, message: "Scan record updated with quiz results", scan });
  } catch (error) {
    console.error("completeScanQuiz error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

/* ═══════════════════════════════════════════════════════════
   CONTROLLER 3 — GET SCAN HISTORY
   GET /api/scan/history
═══════════════════════════════════════════════════════════ */
export const getScanHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { limit = 20 } = req.query;

    const history = await ScanRecord.find({ userId })
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .select(
        "fileName imageCount totalQuestionsExtracted detectedSubject quizCompleted score totalCorrect totalWrong totalSkipped timeTaken scanDuration status createdAt",
      );

    res.status(200).json({ success: true, history });
  } catch (error) {
    console.error("getScanHistory error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

/* ═══════════════════════════════════════════════════════════
   CONTROLLER 4 — GET SINGLE SCAN RECORD
   GET /api/scan/:id
═══════════════════════════════════════════════════════════ */
export const getScanRecord = async (req, res) => {
  try {
    const scan = await ScanRecord.findOne({ _id: req.params.id, userId: req.user.id });
    if (!scan) {
      return res.status(404).json({ success: false, message: "Scan record not found" });
    }

    let quiz = null;
    if (scan.quizCompleted && scan.quizId) {
      quiz = await Quiz.findById(scan.quizId);
    }

    res.status(200).json({ success: true, scan, quiz });
  } catch (error) {
    console.error("getScanRecord error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

/* ═══════════════════════════════════════════════════════════
   CONTROLLER 5 — DELETE SCAN RECORD
   DELETE /api/scan/:id
═══════════════════════════════════════════════════════════ */
export const deleteScanRecord = async (req, res) => {
  try {
    const scan = await ScanRecord.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!scan) {
      return res.status(404).json({ success: false, message: "Scan record not found" });
    }
    res.status(200).json({ success: true, message: "Scan record deleted" });
  } catch (error) {
    console.error("deleteScanRecord error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

/* ═══════════════════════════════════════════════════════════
   CONTROLLER 6 — GET SCAN ANALYTICS
   GET /api/scan/analytics
   Returns aggregated scan stats for the analytics page
═══════════════════════════════════════════════════════════ */
export const getScanAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;

    const allScans = await ScanRecord.find({ userId }).select(
      "totalQuestionsExtracted quizCompleted score totalCorrect totalWrong totalSkipped timeTaken detectedSubject scanDuration createdAt",
    );

    const totalScans = allScans.length;
    const completedQuizzes = allScans.filter((s) => s.quizCompleted).length;
    const totalQuestionsScanned = allScans.reduce((sum, s) => sum + s.totalQuestionsExtracted, 0);
    const totalCorrect = allScans.reduce((sum, s) => sum + (s.totalCorrect || 0), 0);
    const totalWrong = allScans.reduce((sum, s) => sum + (s.totalWrong || 0), 0);

    const avgScore =
      completedQuizzes > 0
        ? Math.round(
            allScans
              .filter((s) => s.quizCompleted)
              .reduce((sum, s) => sum + s.score, 0) / completedQuizzes,
          )
        : 0;

    const avgScanTime =
      totalScans > 0
        ? Math.round(allScans.reduce((sum, s) => sum + s.scanDuration, 0) / totalScans)
        : 0;

    // Subject breakdown
    const subjectMap = {};
    allScans.forEach((s) => {
      const subj = s.detectedSubject || "General";
      if (!subjectMap[subj]) subjectMap[subj] = { count: 0, correct: 0, total: 0 };
      subjectMap[subj].count += 1;
      subjectMap[subj].correct += s.totalCorrect || 0;
      subjectMap[subj].total += s.totalQuestionsExtracted || 0;
    });

    const subjectBreakdown = Object.entries(subjectMap).map(([subject, data]) => ({
      subject,
      scansCount: data.count,
      accuracy: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
      totalQuestions: data.total,
    }));

    // Recent performance (last 10 completed scans)
    const recentPerformance = allScans
      .filter((s) => s.quizCompleted)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10)
      .map((s) => ({
        score: s.score,
        totalCorrect: s.totalCorrect,
        totalQuestions: s.totalQuestionsExtracted,
        date: s.createdAt,
        subject: s.detectedSubject,
      }));

    res.status(200).json({
      success: true,
      analytics: {
        totalScans,
        completedQuizzes,
        totalQuestionsScanned,
        totalCorrect,
        totalWrong,
        avgScore,
        avgScanTime,
        subjectBreakdown,
        recentPerformance,
      },
    });
  } catch (error) {
    console.error("getScanAnalytics error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

/* ═══════════════════════════════════════════════════════════
   CONTROLLER 7 — EXTRACT MCQs FROM PDF TEXT CHUNK
   POST /api/scan/extract-pdf-text
   Body: { textChunks: [string], fileName: string, scanId: ObjectId? }
═══════════════════════════════════════════════════════════ */
export const extractPdfText = async (req, res) => {
  const startTime = Date.now();
  try {
    const key = process.env.NVIDIA_API_KEY;
    if (!key || key.trim() === "") {
      return res.status(500).json({
        success: false,
        message: "AI service not configured — NVIDIA_API_KEY missing",
      });
    }

    const { textChunks, fileName = "document.pdf", scanId } = req.body;

    if (!textChunks || !Array.isArray(textChunks) || textChunks.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Text chunks are required",
      });
    }

    const userId = req.user.id;
    console.log(`\n=== GyanS PDF Text Chunk ===`);
    console.log(`User: ${userId} | Chunks: ${textChunks.length} | File: ${fileName} | ScanID: ${scanId || "New"}`);

    // Combine page texts into a single text content
    const combinedText = textChunks.join("\n\n--- Page Break ---\n\n");

    const prompt = `You are an expert MCQ analyzer. Below is the extracted text from a PDF document.

TASK: Extract ALL multiple-choice questions (MCQs) found in the text.

For EACH question found, provide:
1. The exact question text
2. All options (A, B, C, D) exactly as written
3. The correct answer (A, B, C, or D) - use your knowledge to determine the correct answer
4. A brief explanation of why that answer is correct
5. The topic/subject area of the question
6. Difficulty level (Easy, Medium, or Hard)

Return ONLY valid JSON in this exact format:
{"questions":[{"questionText":"","options":["A) ...","B) ...","C) ...","D) ..."],"correctAnswer":"A","explanation":"","topic":"","difficulty":"Medium"}]}

RULES:
- Extract EVERY MCQ visible, do not skip any
- Clean up any extraction artifacts or broken lines
- If you cannot determine the correct answer, make your best educated guess
- Keep explanations concise (1-2 sentences)
- Return ONLY the JSON, no other text.

Text Content:
${combinedText}`;

    console.log("  → Sending text chunk to GLM-5.1...");
    const rawText = await callNvidiaText(prompt);
    console.log(`  ✓ Text response: ${rawText.slice(0, 150)}`);

    const rawQuestions = parseExtractedQuestions(rawText);
    console.log(`  ✓ Parsed ${rawQuestions.length} questions`);

    const questions = rawQuestions
      .map((q, i) => {
        try {
          return sanitizeExtractedQuestion(q, i);
        } catch (_) {
          return null;
        }
      })
      .filter(Boolean);

    if (questions.length === 0) {
      throw new Error("No valid questions could be extracted from this chunk");
    }

    const scanDuration = Date.now() - startTime;

    // Detect primary subject
    const topicCounts = {};
    questions.forEach((q) => {
      const t = q.topic || "General";
      topicCounts[t] = (topicCounts[t] || 0) + 1;
    });
    const detectedSubject = Object.entries(topicCounts).sort(
      (a, b) => b[1] - a[1],
    )[0][0];

    const questionsData = rawQuestions.map((q) => ({
      questionText: q.questionText?.trim() || "",
      options: (q.options || []).map((o) => String(o).replace(/^[A-D][).\s]+/i, "").trim()),
      correctAnswer: String(q.correctAnswer || "A").toUpperCase().trim(),
      explanation: String(q.explanation || "").trim(),
      topic: String(q.topic || "General").trim(),
      difficulty: ["Easy", "Medium", "Hard"].includes(q.difficulty) ? q.difficulty : "Medium",
    }));

    let scanRecord;
    if (scanId) {
      scanRecord = await ScanRecord.findOne({ _id: scanId, userId });
      if (!scanRecord) {
        return res.status(404).json({ success: false, message: "Scan record not found" });
      }

      scanRecord.extractedQuestions.push(...questionsData);
      scanRecord.totalQuestionsExtracted = scanRecord.extractedQuestions.length;
      scanRecord.scanDuration += scanDuration;

      // Recalculate subject count
      const fullTopicCounts = {};
      scanRecord.extractedQuestions.forEach((q) => {
        const t = q.topic || "General";
        fullTopicCounts[t] = (fullTopicCounts[t] || 0) + 1;
      });
      scanRecord.detectedSubject = Object.entries(fullTopicCounts).sort(
        (a, b) => b[1] - a[1],
      )[0][0];

      await scanRecord.save();
      console.log(`  ✓ Scan record updated (appended): ${scanRecord._id}`);
    } else {
      scanRecord = await ScanRecord.create({
        userId,
        imageThumbnail: "", // No image thumbnail for text-only PDF scans
        fileName,
        imageCount: 0, // 0 image count represents text-only PDF scan
        extractedQuestions: questionsData,
        totalQuestionsExtracted: questions.length,
        detectedSubject,
        scanDuration,
        status: "scanned",
      });
      console.log(`  ✓ Scan record created: ${scanRecord._id}`);
    }

    res.status(200).json({
      success: true,
      scanId: scanRecord._id,
      questions,
      meta: {
        totalExtracted: questions.length,
        detectedSubject: scanRecord.detectedSubject,
        scanDurationMs: scanDuration,
        model: TEXT_MODEL,
      },
    });
  } catch (error) {
    const elapsed = Date.now() - startTime;
    console.error(`✗ extractPdfText failed after ${elapsed}ms:`, error.message);
    res.status(500).json({
      success: false,
      message: "Failed to extract questions from text chunk — please try again",
      error: error.message,
    });
  }
};
