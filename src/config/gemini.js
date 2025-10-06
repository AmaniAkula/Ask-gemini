// gemini2.js

const BASE_URL = "https://generativelanguage.googleapis.com/v1/models";
const MODEL = "gemini-2.0-flash";
const GENERATE_PATH = "generateContent";

/**
 * Call Gemini 2.0 Flash generateContent API.
 * @param {string} prompt - the text prompt
 * @param {Object} [opts] - optional generation parameters
 * @param {string} apiKey - your API key
 * @returns {Promise<string>} - generated content
 */
export async function generateGeminiResponse(prompt, opts = {}, apiKey) {
  if (!apiKey) {
    throw new Error("API key is required");
  }
  const url = `${BASE_URL}/${MODEL}:${GENERATE_PATH}?key=${encodeURIComponent(apiKey)}`;

  // Build request body
  const body = {
 
    generationConfig: {
      temperature: opts.temperature ?? 1.0,
      topP: opts.topP ?? 0.95,
      topK: opts.topK ?? 64,
      candidateCount: opts.candidateCount ?? 1,
      maxOutputTokens: opts.maxOutputTokens ?? 256,
      stopSequences: opts.stopSequences,
      presencePenalty: opts.presencePenalty,
      frequencyPenalty: opts.frequencyPenalty
    }
    // You can also include safetySettings, systemInstruction, tools, etc. per API spec. :contentReference[oaicite:0]{index=0}
  };

  const resp = await fetch(url, {
         method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      }),
    });


  if (!resp.ok) {
throw new Error(`HTTP ${res.status}`);


  }

  const json = await resp.json();

  // The response shape will depend on the API. Based on docs:
  //   { candidates: [ { output: { text: "..." } } ], ... } or similar. :contentReference[oaicite:1]{index=1}
  if (json.candidates && Array.isArray(json.candidates) && json.candidates.length > 0) {
    const first = json.candidates[0];
   if (first.content && first.content.parts && first.content.parts.length > 0) {
    return first.content.parts[0].text; // ✅ only the text
    }
  }

  // Fallback: return pretty JSON
  console.warn("Unexpected response from Gemini:", json);
  return JSON.stringify(json, null, 2);
}
