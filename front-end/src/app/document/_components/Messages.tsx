import { Button, Group, Paper, ScrollArea, Stack, Text } from "@mantine/core";
import { RichTextEditor } from "@mantine/tiptap";
import { IconSend2 } from "@tabler/icons-react";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const MessageEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit, Underline, Highlight],
  });

  return (
    <Paper component="form">
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

        <RichTextEditor.Content />
      </RichTextEditor>
      <Group justify="end">
        <Button size="sm" rightSection={<IconSend2 size={20} />}>
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
      <Stack bd="1px">
        <MessageBox />
        <MessageBox />
        <MessageBox />
        <MessageBox isOP />
        <MessageBox />
        <MessageBox />
      </Stack>
    </ScrollArea>
  );
};

interface MessageBoxProps {
  isOP?: boolean;
}

const MessageBox = ({ isOP }: MessageBoxProps) => {
  return (
    <Paper withBorder p="xs">
      <Stack gap="xs" align={isOP ? "end" : undefined}>
        <Group justify="space-between">
          <Text size="sm" fw="bold">
            User
          </Text>
        </Group>
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
  );
};
