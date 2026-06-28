import axios from "axios";
import http from "http";
import https from "https";

const NVIDIA_API_URL = "https://integrate.api.nvidia.com/v1/chat/completions";
const NVIDIA_MODEL = "deepseek-ai/deepseek-v4-flash";

const httpAgent = new http.Agent({ keepAlive: true, keepAliveMsecs: 30000 });
const httpsAgent = new https.Agent({ keepAlive: true, keepAliveMsecs: 30000 });

// Helper to clean LLM markdown output and extract pure JSON content
const cleanJSON = (str) => {
  let cleaned = str.trim();
  // Strip code blocks if present
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.slice(7);
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.slice(3);
  }
  if (cleaned.endsWith("```")) {
    cleaned = cleaned.slice(0, -3);
  }
  return cleaned.trim();
};

/**
 * Call DeepSeek V4 Flash to analyze code and generate educational feedback
 * @param {object} problem - Mongoose Problem doc
 * @param {string} code - Submitted code
 * @param {string} language - Submission language
 * @param {string} submissionStatus - Accepted / Wrong Answer / TLE / etc.
 * @returns {Promise<object>} Parsed review object matching aiReview schema requirements
 */
export const requestAIReview = async (problem, code, language, submissionStatus) => {
  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) {
    console.warn("NVIDIA_API_KEY is not configured. Returning fallback educational review.");
    return generateFallbackReview(problem, language);
  }

  const prompt = `
You are an expert DSA Coach. Analyze the user's solution and generate a structured educational review in raw JSON format.
Do NOT solve the problem directly. Instead, evaluate the provided code with pedagogical feedback.

=== Problem Details ===
Title: ${problem.title}
Topic: ${problem.topic}
Difficulty: ${problem.difficulty}
Statement: ${problem.statement}
Constraints: ${problem.constraints}

=== User Submission ===
Language: ${language}
Submission Status: ${submissionStatus}
Code:
\`\`\`${language}
${code}
\`\`\`

=== JSON Response Format ===
Return EXACTLY a JSON object matching this structure. Ensure it is valid JSON and contains NO other text, explanations, or code blocks outside the JSON itself:
{
  "timeComplexity": "O(...) explanation",
  "spaceComplexity": "O(...) explanation",
  "betterApproach": "Description of the optimal approach (e.g. trading space for time, using hashmap, two pointers)",
  "optimizationSuggestions": [
    "Suggestion 1",
    "Suggestion 2"
  ],
  "edgeCasesMissed": [
    "Edge case 1 (e.g. empty arrays, negative integers, overflow)",
    "Edge case 2"
  ],
  "codeQualityRating": "A+ / A / B / C based on modularity, naming, efficiency",
  "dryRunExplanation": "Step-by-step trace of how this solution executes on a small input example, describing loop values and pointer states",
  "interviewTips": [
    "Tip 1 (how to explain this in an interview)",
    "Tip 2"
  ]
}
`;

  try {
    const response = await axios.post(
      NVIDIA_API_URL,
      {
        model: NVIDIA_MODEL,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
        max_tokens: 1500,
        stream: false
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        },
        timeout: 60000,
        httpAgent,
        httpsAgent
      }
    );

    const content = response.data?.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error("Empty response content from Nvidia NIM DeepSeek endpoint.");
    }

    const parsedJson = JSON.parse(cleanJSON(content));
    return parsedJson;
  } catch (error) {
    console.error("DeepSeek review request failed:", error.message);
    return generateFallbackReview(problem, language);
  }
};

// Return a fallback mock review if the endpoint is offline or key is missing
const generateFallbackReview = (problem, language) => {
  return {
    timeComplexity: "O(N^2) brute-force or optimal O(N log N) based on implementation.",
    spaceComplexity: "O(1) auxiliary space or O(N) depending on storage allocation.",
    betterApproach: `For ${problem.topic} problems, ensure you check if sorting, two-pointers, or hash-maps can optimize lookup speeds from quadratic to linear time.`,
    optimizationSuggestions: [
      "Avoid nested loops where a single pass with auxiliary structures would suffice.",
      "Check memory pre-allocation to prevent overheads."
    ],
    edgeCasesMissed: [
      "Empty inputs or single-element boundary constraints.",
      "Integer boundary overflow risks under high input limits."
    ],
    codeQualityRating: "B+",
    dryRunExplanation: `Analyzing execution path for '${problem.title}' on language '${language}'. Input is parsed, loops track base indexing elements, and updates occur in-place.`,
    interviewTips: [
      "Clarify constraints (e.g. signed vs unsigned, memory constraints) with the interviewer first.",
      "State the brute-force time and space complexity explicitly before writing the optimized version."
    ]
  };
};
