interface ClientMessage {
  username: string;
  content: string;
}
interface Message extends ClientMessage {
  id: string;
  createdAt: Date;
}
