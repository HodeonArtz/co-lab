import { readFileSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import type DBJSON from "../../../database/db.json";
import { wssChat } from "./servers.ts";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ruta = resolve(__dirname, "../../../database/db.json");
const dbJson = readFileSync(ruta, "utf8");
const data: typeof DBJSON = JSON.parse(dbJson);
const dbMessages = data.messages;

export function postMessage({ createdAt, ...message }: Message) {
  dbMessages.push({ createdAt: createdAt.toISOString(), ...message });
  writeFileSync(ruta, JSON.stringify(data), "utf8");
}

export function getAllMessages(): Message[] {
  const dbJson = readFileSync(ruta, "utf8");
  const data: typeof DBJSON = JSON.parse(dbJson);
  const dbMessages = data.messages;

  return dbMessages.map(({ createdAt, ...dbMessage }) => ({
    createdAt: new Date(createdAt),
    ...dbMessage,
  }));
}
export function updateMessagesForUsers() {
  wssChat.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(getAllMessages())); // Puedes incluir timestamp si quieres
    }
  });
}
