import { readFileSync, writeFileSync } from "fs";
import { diff } from "jsondiffpatch";
import { dirname, resolve } from "path";
import type DocumentDBJSON from "../../../database/documentDB.json";

const __dirname = dirname(__filename);

const documentPath = resolve(__dirname, "../../../database/documentDB.json");
const historyPath = resolve(
  __dirname,
  "../../../database/documentHistory.json"
);

interface HistoryVersion {
  username: string;
  updatedAt: string;
  delta: any;
}

export function getHistory() {
  const dbJson = readFileSync(historyPath, "utf8");
  return JSON.parse(dbJson);
}

export function addChange(newContent: any, username: string) {
  const history = getHistory();
  const dbJson = readFileSync(documentPath, "utf8");
  const oldContent: typeof DocumentDBJSON = JSON.parse(dbJson);

  const change: HistoryVersion = {
    updatedAt: new Date().toISOString(),
    username,
    delta: diff(newContent.content, oldContent.content),
  };
  history.push(change);
  writeFileSync(historyPath, JSON.stringify(history, null, 2));
}
