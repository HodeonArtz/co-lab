import { backendPath } from "./paths";

export interface ClientDocument {
  content: {};
  date: string;
  username: string;
}

export let socket: WebSocket | null = null;

export const connectSocket = (url: string) => {
  socket = new WebSocket(url);
  socket.onopen = () => console.log("WebSocket connected");
};

export const sendEditorUpdate = (update: ClientDocument) => {
  if (socket?.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(update));
  } else {
    console.warn("WebSocket not connected");
  }
};
export async function fetchAndGetDocument() {
  const response = await fetch(`${backendPath}/document/download`);
  const data = await response.json();

  // Crea un Blob con el contenido del JSON
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });

  // Crea una URL del Blob
  const url = URL.createObjectURL(blob);
  return url;
}
