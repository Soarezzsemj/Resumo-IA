 import { Router } from "express";
import { summarryController } from "./summarryController";


const router = Router();

router.post("/summary", summarryController);

router.get("/ping", (req, res) => {
  res.json({ ok: true, msg: "API funcionando!" });
});




export default router;