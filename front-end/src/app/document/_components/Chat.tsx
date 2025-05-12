import { Stack, Title } from "@mantine/core";
import MessageEditor, { MessagesChannel } from "./Messages";

const Chat = () => {
  return (
    <Stack justify="end" h="100%">
      <Title size="h3 ">Chat</Title>
      <MessagesChannel />
      <MessageEditor />
    </Stack>
  );
};

export default Chat;
