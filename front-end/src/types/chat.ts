export interface Message {
  content: string;
}
export interface WebSocketMessage extends Message {
  username: string;
}

export interface IncomingMessageData {
  id: string;
  createdAt: string;
  username: string;
  content: string;
}
export interface MessageDisplay extends IncomingMessageData {
  isOp: boolean;
}
