import axios from "axios";
import * as cheerio from "cheerio";
import { PDFParse } from "pdf-parse";
import { AppError } from "./errors";
import { config } from "./config";

function validateUrl(value: string): URL {
  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    throw new AppError("INVALID_URL", "Informe uma URL válida.", 400);
  }
  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new AppError("INVALID_URL", "A URL deve começar com http:// ou https://.", 400);
  }
  if (["localhost", "127.0.0.1", "::1"].includes(parsed.hostname)) {
    throw new AppError("INVALID_URL", "Essa URL não pode ser acessada.", 400);
  }
  return parsed;
}

export async function extractArticleFromUrl(value: string): Promise<string> {
  const url = validateUrl(value);
  try {
    const response = await axios.get<string>(url.toString(), {
      timeout: config.requestTimeoutMs,
      responseType: "text",
      maxContentLength: 5 * 1024 * 1024,
      headers: { "User-Agent": "Resumo-IA/1.0 (article extraction)" },
    });
    const $ = cheerio.load(response.data);
    $("script, style, nav, footer, header, aside, form, noscript").remove();
    const candidates = $("article, main, [role='main']").map((_, element) => $(element).text()).get();
    const text = (candidates.sort((a, b) => b.length - a.length)[0] || $("body").text())
      .replace(/\s+/g, " ")
      .trim();
    if (!text) throw new Error("empty article");
    return text;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError("EXTRACTION_ERROR", "Não foi possível extrair o texto desse artigo.", 422);
  }
}

export async function extractTextFromFile(file: Express.Multer.File): Promise<string> {
  try {
    if (file.mimetype === "text/plain" || file.originalname.toLowerCase().endsWith(".txt")) {
      return file.buffer.toString("utf8").trim();
    }
    if (file.mimetype === "application/pdf" || file.originalname.toLowerCase().endsWith(".pdf")) {
      const parser = new PDFParse({ data: file.buffer });
      try {
        return (await parser.getText()).text.trim();
      } finally {
        await parser.destroy();
      }
    }
    throw new AppError("INVALID_FILE", "Envie um arquivo .txt ou .pdf.", 415);
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError("EXTRACTION_ERROR", "Não foi possível extrair o texto desse arquivo.", 422);
  }
}
