import { Router } from "express";
import { authenticateUser } from "../services/userAuth.ts";

const router = Router();

// Ruta: /users/
// router.get("/", (req, res) => {
//   res.send("Lista de usuarios");
// });

// // Ruta: /users/profile
// router.get("/profile", (req, res) => {
//   res.send("Perfil del usuario");
// });

// Ruta: /users/login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const isAuthenticated = authenticateUser(username, password);

  res.send(isAuthenticated);
});

export default router;
