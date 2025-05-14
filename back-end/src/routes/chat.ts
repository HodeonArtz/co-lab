import { Router } from "express";
import { getAllMessages } from "../services/websockets/chat.ts";

const router = Router();

export default router;

// Ruta: /messageslist
router.get("/messageslist", (_, res) => {
  res.send(getAllMessages());
});
