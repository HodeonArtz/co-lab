import cors from "cors";
import express from "express";
import chatRoutes from "./routes/chat.ts";
import documentRoutes from "./routes/document.ts";
import userRoutes from "./routes/users.ts";
import filesRoutes from "./routes/files.ts";
import {
  postMessage,
  updateMessagesForUsers,
} from "./services/websockets/chat.ts";
import { documentPort } from "./services/websockets/websocketService.ts";
import { webSockets, wssChat } from "./services/websockets/servers.ts";
import path from "node:path";
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
app.use("/files", filesRoutes);

documentPort();
export const server = app.listen(port, () => {
  console.log("Servidor en puerto 3000");
});

server.on("upgrade", (req, socket, head) => {
  const pathname = req.url;
  const webSocketArray = Object.values(webSockets);
  if (
    !pathname ||
    !webSocketArray.map(({ route }) => route).includes(pathname)
  ) {
    socket.destroy();
    return;
  }

  webSocketArray.forEach(({ route, wsServer }) => {
    if (pathname === route)
      wsServer.handleUpgrade(req, socket, head, (ws) =>
        wsServer.emit("connection", ws, req)
      );
  });
});

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

const FILE_DIR = path.resolve("uploads");
