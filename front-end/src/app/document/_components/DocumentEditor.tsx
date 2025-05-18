import { ActionIcon, Group, Stack, Title } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { Link, RichTextEditor } from "@mantine/tiptap";
import { IconClockDown, IconDownload } from "@tabler/icons-react";
import Highlight from "@tiptap/extension-highlight";
import SubScript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorEvents, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { fetchAndGetDocumentHistory } from "../../_services/documentHistoryService";
import {
  connectSocket,
  fetchAndGetDocument,
  sendEditorUpdate,
  socket,
} from "../../_services/documentService";
import { WS_URL } from "../../_services/wsService";

export function DocumentEditor() {
  const handleOnChange = useDebouncedCallback(
    ({ editor }: EditorEvents["update"]) => {
      console.log(editor.getText());
      const content = editor.getJSON();

      sendEditorUpdate({
        content: content,
        date: new Date().toISOString(),
        username: localStorage.getItem("username")!,
      });
    },
    950
  );

  const handleOnDownload = async () => {
    const url = await fetchAndGetDocument();
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.json"; // Nombre del archivo
    a.click();

    // Limpia la URL creada
    URL.revokeObjectURL(url);
  };
  const handleOnDownloadHistory = async () => {
    const url = await fetchAndGetDocumentHistory();
    const a = document.createElement("a");
    a.href = url;
    a.download = "document_history.json"; // Nombre del archivo
    a.click();

    // Limpia la URL creada
    URL.revokeObjectURL(url);
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    onUpdate: handleOnChange,
  });
  useEffect(() => {
    connectSocket(`${WS_URL}/doc`);
    if (socket)
      socket.onmessage = (e) => {
        console.log("Received", e.data);
        if (JSON.parse(e.data).username === localStorage.getItem("username")) {
          return;
        }
        editor?.commands.setContent(JSON.parse(e.data).content);
      };
  }, []);

  return (
    <Stack>
      <Group justify="space-between">
        <Title size="h3">Document</Title>
        <ActionIcon.Group>
          <ActionIcon size="lg" variant="outline">
            <IconClockDown onClick={handleOnDownloadHistory} />
          </ActionIcon>
          <ActionIcon size="lg" variant="outline">
            <IconDownload onClick={handleOnDownload} />
          </ActionIcon>
        </ActionIcon.Group>
      </Group>
      <RichTextEditor editor={editor} mih="500px">
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

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Undo />
            <RichTextEditor.Redo />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>
    </Stack>
  );
}
