export type AppErrorCode =
  | "INVALID_TEXT"
  | "MODEL_UNAVAILABLE"
  | "RATE_LIMIT"
  | "TIMEOUT"
  | "MALFORMED_RESPONSE"
  | "AI_ERROR"
  | "INVALID_URL"
  | "EXTRACTION_ERROR"
  | "INVALID_FILE";

export class AppError extends Error {
  constructor(
    public readonly code: AppErrorCode,
    message: string,
    public readonly statusCode = 500,
  ) {
    super(message);
    this.name = "AppError";
  }
}
