import { backendPath } from "./paths";
const authRoute = `${backendPath}/user`;

export async function login(
  username: string,
  password: string
): Promise<AuthResponse> {
  return await (
    await fetch(`${authRoute}/login`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ username, password }),
    })
  ).json();
}

export async function register(
  username: string,
  password: string
): Promise<AuthResponse> {
  return await (
    await fetch(`${authRoute}/register`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ username, password }),
    })
  ).json();
}
export function getCurrentUser() {
  return localStorage.getItem("username");
}

export function logoutUser() {
  localStorage.setItem("isLogged", "false");
  localStorage.removeItem("username");
}
