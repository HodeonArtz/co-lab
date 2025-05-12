import { Stack } from "@mantine/core";
import MessageEditor, { MessagesChannel } from "./Messages";

const Chat = () => {
  return (
    <Stack justify="end" h="100%" style={{ flexGrow: "1" }}>
      <MessagesChannel />
      <MessageEditor />
    </Stack>
  );
};

export default Chat;
