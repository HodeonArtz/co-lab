import { backendPath } from "./paths";
const authRoute = `${backendPath}/user`;

export async function login(username: string, password: string) {
  return await fetch(`${authRoute}/login`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export async function register(username: string, password: string) {
  return fetch(`${authRoute}/register`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}
