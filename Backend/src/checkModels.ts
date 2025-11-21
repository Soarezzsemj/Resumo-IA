// src/checkModels.ts
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

async function listModels() {
  console.log("Modelos disponiveis");
  
  try {
    // Usando fetch nativo do Node.js
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.error) {
        console.error("Erro na API:", data.error.message);
        return;
    }

    if (!data.models) {
        console.log("Nenhum modelo encontrado listado.");
        return;
    }

    console.log("\n Modelos disponíveis para você:");
    // Filtra apenas os modelos que geram texto (generateContent)
    const chatModels = data.models.filter((m: any) => 
        m.supportedGenerationMethods.includes("generateContent")
    );

    chatModels.forEach((model: any) => {
        // Mostra o nome exato que você deve copiar
        console.log(`- Nome para usar no código: "${model.name.replace("models/", "")}"`);
    });

  } catch (error) {
    console.error("Erro ao conectar:", error);
  }
}

listModels();