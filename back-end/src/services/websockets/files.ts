import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import { WebSocket } from "ws";
import { wssFiles } from "./servers.ts";

export interface FileInfo {
  name: string; // nombre del archivo
  fullPath: string; // ruta absoluta
  size: number; // bytes
  isDirectory: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export async function listFiles(): Promise<FileInfo[]> {
  const dir = "../../../database/uploaded_files";
  // Lee la carpeta y obtén Dirent para saber si es archivo o dir.
  const dirents = await readdir(dir, { withFileTypes: true });

  // Para cada entrada, obtén sus stats en paralelo.
  const infos = await Promise.all(
    dirents.map(async (dirent) => {
      const fullPath = path.resolve(dir, dirent.name);
      const stats = await stat(fullPath);

      return {
        name: dirent.name,
        fullPath,
        size: stats.size,
        isDirectory: dirent.isDirectory(),
        createdAt: stats.birthtime,
        updatedAt: stats.mtime,
      } satisfies FileInfo;
    })
  );

  return infos;
}
export async function sendFilesList(ws: WebSocket) {
  wssFiles.clients.forEach(async (client) => {
    client.send(JSON.stringify(await listFiles()));
  });
}
