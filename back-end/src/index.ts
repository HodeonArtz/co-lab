import cors from "cors";
import express from "express";
import { WebSocketServer } from "ws";
import chatRoutes from "./routes/chat.ts";
import documentRoutes from "./routes/document.ts";
import userRoutes from "./routes/users.ts";
import { getAllMessages, postMessage } from "./services/websockets/chat.ts";
import { documentPort } from "./services/websockets/websocketService.ts";
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
app.use("/chat", chatRoutes);
app.use("/document", documentRoutes);

const wssChat = new WebSocketServer({ noServer: true });
export const wssDocument = new WebSocketServer({ noServer: true });

export const server = app.listen(port, () => {
  console.log("Servidor en puerto 3000");
});

documentPort();

server.on("upgrade", (req, socket, head) => {
  const pathname = req.url;

  if (pathname === "/chat") {
    wssChat.handleUpgrade(req, socket, head, (ws) => {
      wssChat.emit("connection", ws, req);
    });
  } else if (pathname === "/doc") {
    wssDocument.handleUpgrade(req, socket, head, (ws) => {
      wssDocument.emit("connection", ws, req);
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
