export interface ClientDocument {
  content: {};
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
