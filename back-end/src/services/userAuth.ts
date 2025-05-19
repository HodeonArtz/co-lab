import { readFileSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import type DBJSON from "../../database/db.json";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ruta = resolve(__dirname, "../../database/db.json");
const dbUsersJson = readFileSync(ruta, "utf8");
const data: typeof DBJSON = JSON.parse(dbUsersJson);
const dbUsers = data.usuarios;

export function authenticateUser(reqUsername: string, reqPasswd: string) {
  return !!dbUsers.find(
    ({ username, password }) =>
      username === reqUsername && password === reqPasswd
  );
}

export function registerUser(reqUsername: string, reqPasswd: string) {
  const userAlreadyExist = dbUsers.find(
    ({ username }) => username === reqUsername
  );

  if (userAlreadyExist) {
    return false;
  } else {
    dbUsers.push({ username: reqUsername, password: reqPasswd });
    writeFileSync(ruta, JSON.stringify(data), "utf8");
    return true;
  }
}
