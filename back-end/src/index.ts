import cors from "cors";
import express from "express";
import userRoutes from "./routes/users.ts";
import { WebSocketServer } from "ws";
import { getAllMessages, postMessage } from "./services/websockets/chat.ts";
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

const wssChat = new WebSocketServer({ noServer: true });
8;
const server = app.listen(port, () => {
  console.log("Servidor en puerto 3000");
});

server.on("upgrade", (req, socket, head) => {
  const pathname = req.url;

  if (pathname === "/chat") {
    wssChat.handleUpgrade(req, socket, head, (ws) => {
      wssChat.emit("connection", ws, req);
    });
  } else {
    socket.destroy();
  }
});

function updateMessagesForUsers() {
  wssChat.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(getAllMessages())); // Puedes incluir timestamp si quieres
    }
  });
}

wssChat.on("connection", (ws) => {
  console.log("Cliente conectado a /chat");
  updateMessagesForUsers();
  ws.on("message", (msg) => {
    const data: ClientMessage = JSON.parse(msg.toString());
    console.log("[chat]", data);
    postMessage({ ...data, createdAt: new Date(), id: crypto.randomUUID() });
    updateMessagesForUsers();
  });
});

/* const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("cliente conectado");
  ws.send("!bienvenido");

  ws.on("message", (message: Buffer) => {
    console.log();
    console.log("Mensaje recibido:", JSON.parse(message.toString()));
  });

  ws.on("close", () => {
    console.log("Cliente desconectado");
  });
}); */
