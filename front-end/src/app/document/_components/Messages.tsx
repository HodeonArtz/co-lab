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
import { Message, MessageDisplay } from "../../../types/chat";
import { useEffect, useRef } from "react";
import { useHover } from "@mantine/hooks";

interface Props {
  onSend: ({ content }: Message) => void;
}

const MessageEditor = ({ onSend }: Props) => {
  const messageForm = useForm<Message>({
    onSubmitPreventDefault: "always",
  });
  const editor = useEditor({
    extensions: [StarterKit, Underline, Highlight],
    onUpdate({ editor }) {
      messageForm.setFieldValue("content", editor.getHTML());
    },
  });

  function handleSubmit({ content }: Message) {
    editor?.commands.setContent("");
    onSend({ content });
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

interface MessagesChannelProps {
  messages: MessageDisplay[];
}

export const MessagesChannel = ({ messages }: MessagesChannelProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current!.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]); // 🚨 Importante: se ejecuta cada vez que llegan mensajes
  return (
    <ScrollArea style={{ flexGrow: 1 }} viewportRef={scrollRef}>
      <Flex bd="1px" direction="column" justify="flex-end" gap="lg" h="100%">
        {messages.map(({ id, content, createdAt, isOp, username }) => (
          <MessageBox
            key={id}
            isOP={isOp}
            user={username}
            createdAt={new Date(createdAt)}
          >
            {content}
          </MessageBox>
        ))}
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
