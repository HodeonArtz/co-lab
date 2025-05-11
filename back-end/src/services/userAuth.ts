import db from "../../database/db.json" with { type: "json" };
const dbUsers = db.usuarios;

export function authenticateUser(reqUsername: string, reqPasswd: string) {
  return !!dbUsers.find(
    ({ username, password }) =>
      username === reqUsername && password === reqPasswd
  );
}
