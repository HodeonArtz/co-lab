import { Stack } from "@mantine/core";
import MessageEditor, { MessagesChannel } from "./Messages";

const Chat = () => {
  return (
    <Stack justify="end" h="100%">
      <MessagesChannel />
      <MessageEditor />
    </Stack>
  );
};

export default Chat;
