import { GoogleGenerativeAI } from "@google/generative-ai";
import { AppError } from "./errors";
import { config } from "./config";
import { log } from "./logger";
import { getSelectedModel } from "./modelSelector";

const genAI = new GoogleGenerativeAI(config.apiKey!);

export async function generateSummary(text: string, format = "paragraph", tone = "formal", language = "pt-BR"): Promise<{ summary: string; model: string; fallback: boolean }> {
  const selected = await getSelectedModel();
  const model = genAI.getGenerativeModel({ model: selected.model });
  const formatInstruction = format === "topics"
    ? "Organize a resposta em tópicos curtos."
    : format === "tldr"
      ? "Responda com uma única frase, no formato TL;DR."
      : "Escreva a resposta em um parágrafo conciso.";
  const toneInstruction = tone === "casual" ? "Use um tom casual e acessível." : tone === "technical" ? "Use um tom técnico e preciso." : "Use um tom formal e objetivo.";
  const languageInstruction = language === "en" ? "Escreva a resposta em inglês." : language === "es" ? "Escreva a resposta em espanhol." : "Escreva a resposta em português do Brasil.";
  const prompt = `Resuma o seguinte texto de forma concisa e direta. ${formatInstruction} ${toneInstruction} ${languageInstruction}\n\n${text}`;

  try {
    const result = await Promise.race([
      model.generateContent(prompt),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new AppError("TIMEOUT", "A geração demorou mais que o esperado.", 504)), config.requestTimeoutMs),
      ),
    ]);
    const summary = (await result.response).text()?.trim();
    if (!summary) throw new AppError("MALFORMED_RESPONSE", "O modelo não retornou um resumo válido.", 502);

    log("info", "Resumo gerado", { model: selected.model, fallback: selected.fallback });
    return { summary, model: selected.model, fallback: selected.fallback };
  } catch (error) {
    if (error instanceof AppError) throw error;
    const status = (error as { response?: { status?: number } }).response?.status;
    if (status === 429) throw new AppError("RATE_LIMIT", "O serviço de IA está temporariamente sobrecarregado.", 429);
    if (status === 404) throw new AppError("MODEL_UNAVAILABLE", "O modelo selecionado não está disponível.", 503);
    log("error", "Erro ao chamar Gemini", {
      model: selected.model,
      fallback: selected.fallback,
      error: error instanceof Error ? error.message : String(error),
    });
    throw new AppError("AI_ERROR", "Não foi possível gerar o resumo agora.", 502);
  }
}
