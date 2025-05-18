interface ClientMessage {
  username: string;
  content: string;
}
interface Message extends ClientMessage {
  id: string;
  createdAt: Date;
}
interface HistoryVersion {
  username: string;
  updatedAt: string;
  delta: {};
}
