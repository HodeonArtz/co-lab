import express from "express";
import fs from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { WebSocketServer } from "ws";
import { wssDocument } from "../../index.ts";
const server = new WebSocketServer({ port: 8000 });
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ruta = resolve(__dirname, "../../../database/documentDB.json");

interface ClientDocument {
  content: {};
  username: string;
}
// // Endpoint to download history
// app.get("/history/download", (req, res) => {
//   const file = "./history.json";
//   res.download(file);
// });

// app.listen(3002, () => {
//   console.log("HTTP server on http://localhost:3002");
// });

export function documentPort() {
  let documentContent = {};
  let history = [];

  wssDocument.on("connection", (ws) => {
    console.log("usuario conectado");
    ws.on("message", (message) => {
      const data: ClientDocument = JSON.parse(message.toString());
      const timestamp = new Date().toISOString();

      documentContent = data.content;

      const entry = {
        ...data,
        timestamp,
      };

      // Broadcast to all connected clients (optional)
      wssDocument.clients.forEach((client) => {
        if (client !== ws && client.readyState === 1) {
          client.send(
            JSON.stringify({
              type: "sync",
              content: documentContent,
              username: data.username,
            })
          );
        }
      });

      // Save content periodically
      fs.writeFileSync(ruta, JSON.stringify(documentContent, null, 2), "utf8");
      // fs.writeFileSync("./history.json", JSON.stringify(history, null, 2));
    });
  });
}
