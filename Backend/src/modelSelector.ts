import axios from "axios";
import { config } from "./config";
import { log } from "./logger";

type ListedModel = {
  name?: string;
  supportedGenerationMethods?: string[];
};

export type SelectedModel = {
  model: string;
  fallback: boolean;
  source: "discovery" | "cache" | "configured";
};

let cachedModel: { model: string; selectedAt: number } | undefined;
let lastSelection: SelectedModel | undefined;

function modelVersion(model: string): number[] {
  const match = model.replace(/^models\//, "").match(/^gemini-(\d+(?:\.\d+)*).*flash/i);
  return match ? match[1].split(".").map(Number) : [];
}

function compareVersions(left: string, right: string): number {
  const a = modelVersion(left);
  const b = modelVersion(right);
  for (let index = 0; index < Math.max(a.length, b.length); index += 1) {
    const difference = (a[index] || 0) - (b[index] || 0);
    if (difference !== 0) return difference;
  }
  return left.localeCompare(right);
}

export function selectLatestFlashModel(models: ListedModel[], allowExperimental = false): string | undefined {
  const candidates = models
    .filter((item) => {
      const name = item.name?.replace(/^models\//, "");
      if (!name || !name.toLowerCase().includes("flash")) return false;
      if (!item.supportedGenerationMethods?.includes("generateContent")) return false;
      if (!allowExperimental && /(?:preview|experimental|-exp)(?:$|-)/i.test(name)) return false;
      return modelVersion(name).length > 0;
    })
    .map((item) => item.name!.replace(/^models\//, ""));

  return candidates.sort((left, right) => compareVersions(right, left))[0];
}

async function discoverModel(): Promise<string> {
  const response = await axios.get<{ models?: ListedModel[] }>(
    "https://generativelanguage.googleapis.com/v1beta/models",
    { params: { key: config.apiKey }, timeout: config.requestTimeoutMs },
  );
  const model = selectLatestFlashModel(response.data.models || [], config.allowExperimentalModels);
  if (!model) throw new Error("Nenhum modelo Flash estável com generateContent foi encontrado.");
  return model;
}

export async function getSelectedModel(): Promise<SelectedModel> {
  if (config.lockedModel) {
    lastSelection = { model: config.lockedModel, fallback: false, source: "configured" };
    return lastSelection;
  }

  if (cachedModel && Date.now() - cachedModel.selectedAt < config.modelCacheTtlMs) {
    lastSelection = { model: cachedModel.model, fallback: false, source: "cache" };
    return lastSelection;
  }

  try {
    const model = await discoverModel();
    cachedModel = { model, selectedAt: Date.now() };
    lastSelection = { model, fallback: false, source: "discovery" };
    log("info", "Modelo Flash selecionado", { model, fallback: false, source: "discovery" });
    return lastSelection;
  } catch (error) {
    if (cachedModel) {
      lastSelection = { model: cachedModel.model, fallback: true, source: "cache" };
      log("warn", "Falha ao atualizar modelos; usando último modelo em cache", {
        model: cachedModel.model,
        fallback: true,
        error: error instanceof Error ? error.message : String(error),
      });
      return lastSelection;
    }

    lastSelection = { model: config.fallbackModel, fallback: true, source: "configured" };
    log("warn", "Falha ao listar modelos; usando modelo de fallback configurado", {
      model: config.fallbackModel,
      fallback: true,
      error: error instanceof Error ? error.message : String(error),
    });
    return lastSelection;
  }
}

export function getModelInfo(): SelectedModel {
  return lastSelection || {
    model: config.lockedModel || config.fallbackModel,
    fallback: !config.lockedModel,
    source: config.lockedModel ? "configured" : "configured",
  };
}
