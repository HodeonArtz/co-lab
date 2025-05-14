import { Divider, Stack } from "@mantine/core";
import MessageEditor, { MessagesChannel } from "./Messages";
import { useEffect, useState } from "react";
import {
  IncomingMessageData,
  Message,
  MessageDisplay,
  WebSocketMessage,
} from "../../../types/chat";
import ChatHeader from "./ChatHeader";

const Chat = () => {
  const [onSend, setOnSend] = useState<
    (({ content }: Message) => void) | undefined
  >();

  const [messages, setMessages] = useState<MessageDisplay[] | undefined>();
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000/chat");

    function setIncomingMessages(event: any) {
      const username = localStorage.getItem("username");
      if (!username) return;
      const incomingMessages: IncomingMessageData[] = JSON.parse(event.data);
      setMessages(
        incomingMessages.map((message) => {
          return {
            ...message,
            isOp: message.username === username,
          };
        })
      );
    }

    socket.onopen = () => {
      console.log("WebSocket conectado");
      function handleOnSend({ content }: Message) {
        const username = localStorage.getItem("username");
        if (!username) return;
        const wsMessage: WebSocketMessage = { content, username };

        socket.send(JSON.stringify(wsMessage));
      }
      setOnSend(() => handleOnSend);
    };

    socket.onmessage = (event) => {
      console.log("Mensaje recibido:", JSON.parse(event.data));
      setIncomingMessages(event);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket desconectado");
    };
    return () => {
      socket.close(); // Cierra la conexión cuando el componente se desmonta
    };
  }, []);
  return (
    <Stack justify="end" h="100%">
      <ChatHeader />
      <Divider />
      <MessagesChannel messages={messages || []} />
      {onSend && <MessageEditor onSend={onSend} />}
    </Stack>
  );
};

export default Chat;
