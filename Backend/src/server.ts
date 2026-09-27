import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes"; // <--- IMPORTA AQUI
import { log } from "./logger";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", routes); // <--- REGISTRA AQUI

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => log("info", "Servidor iniciado", { port: PORT }));
