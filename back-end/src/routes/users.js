import { Router } from "express";

const router = Router();

// Ruta: /users/
router.get("/", (req, res) => {
  res.send("Lista de usuarios");
});

// Ruta: /users/profile
router.get("/profile", (req, res) => {
  res.send("Perfil del usuario");
});

export default router;
