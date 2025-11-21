 import { Router } from "express";
import { summarryController } from "./summarryController";


const router = Router();

router.post("/summary", summarryController);



export default router;