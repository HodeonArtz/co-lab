import { WebSocketServer } from "ws";

export const webSockets: Record<
  string,
  { wsServer: WebSocketServer; route: string }
> = {
  wssChat: {
    route: "/chat",
    wsServer: new WebSocketServer({ noServer: true }),
  },
  wssDocument: {
    route: "/doc",
    wsServer: new WebSocketServer({ noServer: true }),
  },
  wssFiles: {
    route: "/file",
    wsServer: new WebSocketServer({ noServer: true }),
  },
};
export const {
  wssDocument: { wsServer: wssDocument },
  wssChat: { wsServer: wssChat },
  wssFiles: { wsServer: wssFiles },
} = webSockets;
