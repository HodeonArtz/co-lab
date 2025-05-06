import express from "express";
import userRoutes from "./routes/users.js";

const app = express();
const port = 3000;

app.use("/users", userRoutes);
// app.use("/admin", adminRoutes);

app.listen(port, () => {
  console.log("Servidor en puerto 3000");
});
