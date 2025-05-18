import fs from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { getDocument, sendDocumentContent } from "./document.ts";
import { wssDocument, wssFiles } from "./servers.ts";
import { sendFilesList } from "./files.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ruta = resolve(__dirname, "../../../database/documentDB.json");

interface ClientDocument {
  content: {};
  username: string;
}

export function documentPort() {
  wssDocument.on("connection", (ws) => {
    console.log("usuario conectado");

    sendDocumentContent(ws, "", getDocument());

    ws.on("message", (message) => {
      const data: ClientDocument = JSON.parse(message.toString());

      // Broadcast to all connected clients
      sendDocumentContent(ws, data.username, data.content);

      // Save content periodically
      fs.writeFileSync(ruta, JSON.stringify(data.content, null, 2), "utf8");
    });
  });
}
export function filesPort() {
  wssFiles.on("connection", async (ws) => {
    console.log("usuario conectado a /files");
    await sendFilesList(ws);

    ws.on("message", async (message) => {
      await sendFilesList(ws);
    });
  });
}
