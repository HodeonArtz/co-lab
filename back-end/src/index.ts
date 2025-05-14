import cors from "cors";
import express from "express";
import userRoutes from "./routes/users.ts";
import { documentPort } from "./services/websocket/websocketService.ts";

const app = express();
const port = 3000;
app.use(
  cors({
    origin: "*",
    credentials: false,
  })
);

app.use(express.json());

app.use("/user", userRoutes);
// app.use("/admin", adminRoutes);

app.listen(port, () => {
  console.log("Servidor en puerto 3000");
});

documentPort();
