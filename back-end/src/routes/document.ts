import { Router } from "express";
import { getDocument } from "../services/websockets/document.ts";

const router = Router();

export default router;

// Ruta: /document
router.get("/download", (_, res) => {
  res.send(getDocument());
});
