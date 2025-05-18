import { Router } from "express";
import { getDocument } from "../services/websockets/document.ts";
import { getHistory } from "../services/websockets/documentHistory.ts";

const router = Router();

export default router;

// Ruta: /document
router.get("/download", (_, res) => {
  res.send(getDocument());
});
router.get("/history", (_, res) => {
  res.send(getHistory());
});
