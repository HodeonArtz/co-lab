import { readFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { WebSocket } from "ws";
import type DBJSON from "../../../database/documentDB.json";
import { wssDocument } from "../../index.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ruta = resolve(__dirname, "../../../database/documentDB.json");
const dbJson = readFileSync(ruta, "utf8");
const data: typeof DBJSON = JSON.parse(dbJson);
const dbContent = data.content;

export function getDocument() {
  const dbJson = readFileSync(ruta, "utf8");
  const data: typeof DBJSON = JSON.parse(dbJson);
  const dbDocument = data.content;

  console.log(data);

  return dbDocument.map(({ ...document }) => ({
    ...document,
  }));
}

export function sendDocumentContent(
  ws: WebSocket,
  username: string,
  documentContent: {}
) {
  wssDocument.clients.forEach((client) => {
    if (client !== ws && client.readyState === 1) {
      client.send(
        JSON.stringify({
          type: "sync",
          content: documentContent,
          username,
        })
      );
    }
  });
}
