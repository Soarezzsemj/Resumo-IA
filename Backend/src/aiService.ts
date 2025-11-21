import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

// Verifica a chave antes de iniciar
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    throw new Error("GEMINI_API_KEY não configurada no .env");
}

// Inicializa o cliente do Google Gemini
const genAI = new GoogleGenerativeAI(apiKey);

// Inicializa o modelo específico (Flash é rápido e ideal para resumos)
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function generateSummary(text: string) {
  try {
    // Configuração do prompt
    const prompt = `Resuma o seguinte texto de forma concisa e direta em português: \n\n${text}`;

    // Chamada à IA
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    // Retorna o texto gerado
    return response.text();

  } catch (error) {
    console.error("Erro ao chamar a IA do Gemini:", error);
    throw new Error("Falha ao gerar resumo com Gemini.");
  }
}