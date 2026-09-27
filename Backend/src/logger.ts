type LogLevel = "info" | "warn" | "error";

export function log(level: LogLevel, message: string, fields: Record<string, unknown> = {}): void {
  const entry = { timestamp: new Date().toISOString(), level, message, ...fields };
  console[level](JSON.stringify(entry));
}
