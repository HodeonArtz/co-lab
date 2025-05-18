import fs from "fs";
import { dirname, resolve } from "path";
import { getDocument, sendDocumentContent } from "./document.ts";
import { addChange } from "./documentHistory.ts";
import { wssDocument, wssFiles } from "./servers.ts";
import { sendFilesList } from "./files.ts";

const __dirname = dirname(__filename);

const ruta = resolve(__dirname, "../../../database/documentDB.json");

interface ClientDocument {
  content: {};
  date: string;
  username: string;
}

export function documentPort() {
  wssDocument.on("connection", (ws) => {
    console.log("usuario conectado");

    sendDocumentContent(ws, "", "", getDocument());

    ws.on("message", (message) => {
      const newData: ClientDocument = JSON.parse(message.toString());
      const content = fs.readFileSync(ruta, "utf8");
      let dbData = JSON.parse(content);

      /* let change = {};

      dbData.push(change); */

      // Broadcast to all connected clients
      sendDocumentContent(ws, newData.username, newData.date, newData.content);
      addChange(newData.content, newData.username);
      console.log();

      // Save content periodically
      fs.writeFileSync(ruta, JSON.stringify(newData.content, null, 2), "utf8");
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
