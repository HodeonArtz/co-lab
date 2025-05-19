import { readFileSync } from "fs";
import { dirname, resolve } from "path";
import { WebSocket } from "ws";
import type DBJSON from "../../../database/documentDB.json";
import { wssDocument } from "./servers.ts";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ruta = resolve(__dirname, "../../../database/documentDB.json");

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
  date: string,
  documentContent: {}
) {
  wssDocument.clients.forEach((client) => {
    if (client !== ws && client.readyState === 1) {
      client.send(
        JSON.stringify({
          type: "sync",
          content: documentContent,
          username,
          date: date,
        })
      );
    }
  });
}
