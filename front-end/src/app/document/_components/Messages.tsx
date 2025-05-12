import {
  Button,
  Flex,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { RichTextEditor } from "@mantine/tiptap";
import { IconSend2 } from "@tabler/icons-react";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Message } from "../../../types/chat";
import { useEffect } from "react";

const MessageEditor = () => {
  const messageForm = useForm<Message>({
    onSubmitPreventDefault: "always",
  });
  const editor = useEditor({
    extensions: [StarterKit, Underline, Highlight],
    onUpdate({ editor }) {
      messageForm.setFieldValue("content", editor.getHTML());
    },
  });

  function handleSubmit(value) {
    console.log(value);
  }

  useEffect(() => {
    if (editor) messageForm.setFieldValue("content", editor.getHTML());
  }, []);

  return (
    <Paper component="form" onSubmit={messageForm.onSubmit(handleSubmit)}>
      <RichTextEditor editor={editor} variant="subtle" mb="sm">
        <RichTextEditor.Toolbar sticky stickyOffset="var(--docs-header-height)">
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content {...messageForm.getInputProps("content")} />
      </RichTextEditor>
      <Group justify="end">
        <Button type="submit" size="sm" rightSection={<IconSend2 size={20} />}>
          Enviar
        </Button>
      </Group>
    </Paper>
  );
};

export default MessageEditor;

export const MessagesChannel = () => {
  return (
    <ScrollArea h="100%">
      <Flex bd="1px" direction="column-reverse" gap="lg">
        <MessageBox isOP />
        <MessageBox />
        <MessageBox />
        <MessageBox />
        <MessageBox />
        <MessageBox />
      </Flex>
    </ScrollArea>
  );
};

interface MessageBoxProps {
  isOP?: boolean;
}

const MessageBox = ({ isOP }: MessageBoxProps) => {
  return (
    <Stack gap="4">
      <Group justify={isOP ? "end" : undefined}>
        <Text size="sm" fw="bold">
          User
        </Text>
      </Group>
      <Paper withBorder p="sm">
        <Stack gap="xs" align={isOP ? "end" : undefined}>
          <Text ta={isOP ? "right" : undefined}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Reprehenderit aperiam nisi molestiae. Fugiat magni velit quam, autem
            repellat ut impedit alias ducimus soluta aut aperiam quos. Commodi
            porro sit corrupti.
          </Text>
        </Stack>
        <Stack align={isOP ? "start" : "end"}>
          <Text display="block" size="xs" c="dimmed">
            Sent on 2025-05-05 20:40
          </Text>
        </Stack>
      </Paper>
    </Stack>
  );
};
