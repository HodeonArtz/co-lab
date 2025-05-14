import { readFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import type DBJSON from "../../../database/documentDB.json";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ruta = resolve(__dirname, "../../../database/db.json");
const dbJson = readFileSync(ruta, "utf8");
const data: typeof DBJSON = JSON.parse(dbJson);
const dbContent = data.content;

export function getDocument() {
  const dbJson = readFileSync(ruta, "utf8");
  const data: typeof DBJSON = JSON.parse(dbJson);
  const dbDocument = data.content;

  return dbDocument.map(({ ...document }) => ({
    ...document,
  }));
}
