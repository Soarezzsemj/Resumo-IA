import { Request, Response } from "express";
import { generateSummary } from "./aiService";
import { error } from 'console';

export async function summarryController(req: Request, res: Response) {
    try {
        const { text } = req.body;


        if (!text) {
            return res.status(400).json({ error: "O campo 'text' é obrigatório." });
        }

        const result = await generateSummary(text);
        return res.json({ summary: result });

    } catch (error) {
        return res.status(500).json({ error: (error as Error).message });
    }
}


