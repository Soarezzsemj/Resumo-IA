import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function generateSummary(text: string) {
  const apiKey = process.env.IA_API_KEY;
  const apiUrl = process.env.IA_API_URL;

  if (!apiKey || !apiUrl) {
    throw new Error("API key ou API URL não configuradas no .env");
  }

  try {
    const response = await axios.post(
      apiUrl,
      {
        model: "gpt-4o-mini", // coloque o modelo grátis
        messages: [
          {
            role: "system",
            content: "Você é um assistente que resume textos."
          },
          {
            role: "user",
            content: text
          }
        ],
        temperature: 0.3
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        }
      }
    );

    return response.data.choices[0].message.content;

  } catch (error) {
    console.error("Erro ao chamar a IA:", error);
    throw new Error("Erro ao chamar a IA");
  }
}
