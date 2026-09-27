 import { Router } from "express";
import { summarryController } from "./summarryController";
import { getModelInfo } from "./modelSelector";
import multer from "multer";
import { extractTextFromFile } from "./contentExtractor";
import { config } from "./config";

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: config.maxFileBytes } });

router.post("/summary", upload.single("file"), summarryController);
router.post("/extract-file", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "Envie um arquivo .txt ou .pdf.", code: "INVALID_FILE" });
  try {
    return res.json({ text: await extractTextFromFile(req.file) });
  } catch (error) {
    const status = error instanceof Error && "statusCode" in error ? Number((error as { statusCode: number }).statusCode) : 422;
    return res.status(status).json({ error: error instanceof Error ? error.message : "Falha ao extrair arquivo.", code: "EXTRACTION_ERROR" });
  }
});
router.get("/model-info", (_req, res) => res.json(getModelInfo()));

router.get("/ping", (req, res) => {
  res.json({ ok: true, msg: "API funcionando!" });
});




export default router;