import {
  Button,
  Flex,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Text,
  Transition,
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
import { useHover } from "@mantine/hooks";

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

  function handleSubmit(value: Message) {
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
    <ScrollArea style={{ flexGrow: 1 }}>
      <Flex
        bd="1px"
        direction="column-reverse"
        justify="flex-end"
        gap="lg"
        h="100%"
      >
        <MessageBox isOP user="John Doe" createdAt={new Date()}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem odio,
          aliquid aliquam alias sit vitae mollitia in eveniet magni incidunt,
          officiis repudiandae obcaecati eum excepturi, eligendi voluptate minus
          vero deleniti.
        </MessageBox>
        <MessageBox user="Jane Doe" createdAt={new Date()}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem odio,
          aliquid aliquam alias sit vitae mollitia in eveniet magni incidunt,
          officiis repudiandae obcaecati eum excepturi, eligendi voluptate minus
          vero deleniti.
        </MessageBox>
        <MessageBox user="Jane Doe" createdAt={new Date()}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem odio,
          aliquid aliquam alias sit vitae mollitia in eveniet magni incidunt,
          officiis repudiandae obcaecati eum excepturi, eligendi voluptate minus
          vero deleniti.
        </MessageBox>
      </Flex>
    </ScrollArea>
  );
};

interface MessageBoxProps {
  children: string;
  user: string;
  createdAt: Date;
  isOP?: boolean;
}

const MessageBox = ({ isOP, user, children, createdAt }: MessageBoxProps) => {
  const { hovered, ref } = useHover();
  return (
    <Stack gap="4" ref={ref}>
      <Group justify={isOP ? "end" : undefined}>
        <Text size="sm" fw="bold">
          {user}
        </Text>
      </Group>
      <Paper withBorder p="sm">
        <Stack gap="xs" align={isOP ? "end" : undefined}>
          <Text ta={isOP ? "right" : undefined}>{children}</Text>
        </Stack>
      </Paper>
      <Stack align={isOP ? "start" : "end"} h="1rem">
        <Transition mounted={hovered}>
          {(styles) => (
            <Text display="block" size="xs" c="dimmed" style={styles}>
              Sent at {createdAt.toISOString()}
            </Text>
          )}
        </Transition>
      </Stack>
    </Stack>
  );
};
