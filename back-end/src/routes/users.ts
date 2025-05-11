import { Router } from "express";
import { authenticateUser, registerUser } from "../services/userAuth.ts";

const router = Router();

// Ruta: /users/login
router.post("/login", (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  const isAuthenticated = authenticateUser(username, password);

  res.send({
    message: isAuthenticated
      ? "User authenticated successfuly"
      : "Wrong credentials",
    status: isAuthenticated,
  });
});

// Ruta: /users/login
router.post("/register", (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  const isRegistered = registerUser(username, password);

  res.send({
    message: isRegistered
      ? "User registered successfuly"
      : `The username ${username} is already taken.`,
    status: isRegistered,
  });
});

export default router;
