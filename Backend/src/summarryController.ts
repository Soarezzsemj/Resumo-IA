import { Request, Response } from "express";
import { generateSummary } from "./aiService";
import { AppError } from "./errors";
import { config } from "./config";
import { log } from "./logger";
import { extractArticleFromUrl, extractTextFromFile } from "./contentExtractor";

export async function summarryController(req: Request, res: Response) {
  try {
    let text = req.body?.text;
    const url = req.body?.url;
    const format = req.body?.format;
    const tone = req.body?.tone;
    const language = req.body?.language;
    if (url) text = await extractArticleFromUrl(url);
    if (req.file) text = await extractTextFromFile(req.file);
    if (typeof text !== "string" || !text.trim()) {
      throw new AppError("INVALID_TEXT", "Envie um texto não vazio.", 400);
    }
    if (text.length > config.maxTextLength) {
      throw new AppError("INVALID_TEXT", `O texto deve ter no máximo ${config.maxTextLength} caracteres.`, 413);
    }
    if (text.trim().split(/\s+/).length > config.maxWords) {
      throw new AppError("INVALID_TEXT", `O texto deve ter no máximo ${config.maxWords} palavras.`, 413);
    }

    if (format !== undefined && !["topics", "paragraph", "tldr"].includes(format)) {
      throw new AppError("INVALID_TEXT", "Formato de resumo inválido.", 400);
    }
    if (tone !== undefined && !["formal", "casual", "technical"].includes(tone)) {
      throw new AppError("INVALID_TEXT", "Tom de resumo inválido.", 400);
    }
    if (language !== undefined && !["pt-BR", "en", "es"].includes(language)) {
      throw new AppError("INVALID_TEXT", "Idioma de resumo inválido.", 400);
    }
    return res.json({ ...(await generateSummary(text, format, tone, language)), sourceText: text });
  } catch (error) {
    const appError = error instanceof AppError
      ? error
      : new AppError("AI_ERROR", "Não foi possível processar sua solicitação.", 500);
    log(appError.statusCode >= 500 ? "error" : "warn", "Requisição de resumo rejeitada", {
      code: appError.code,
      error: appError.message,
    });
    return res.status(appError.statusCode).json({ error: appError.message, code: appError.code });
  }
}
