import dotenv from "dotenv";

dotenv.config();

function positiveInteger(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

export const config = {
  apiKey: process.env.GEMINI_API_KEY,
  fallbackModel: process.env.GEMINI_FALLBACK_MODEL || "gemini-2.5-flash",
  lockedModel: process.env.GEMINI_MODEL_LOCK?.trim() || undefined,
  allowExperimentalModels: process.env.ALLOW_EXPERIMENTAL_MODELS === "true",
  modelCacheTtlMs: positiveInteger(process.env.GEMINI_MODEL_CACHE_TTL_MS, 24 * 60 * 60 * 1000),
  requestTimeoutMs: positiveInteger(process.env.GEMINI_REQUEST_TIMEOUT_MS, 30_000),
  maxTextLength: positiveInteger(process.env.MAX_TEXT_LENGTH, 10_000),
  maxWords: positiveInteger(process.env.MAX_TEXT_WORDS, 2_500),
  maxFileBytes: positiveInteger(process.env.MAX_FILE_BYTES, 10 * 1024 * 1024),
};

if (!config.apiKey) {
  throw new Error("GEMINI_API_KEY não configurada no .env");
}
