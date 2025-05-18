import {
  AppShell,
  Button,
  Divider,
  ScrollArea,
  Stack,
  Title,
} from "@mantine/core";
import UserDisplay from "../UserDisplay";
import { IconUpload } from "@tabler/icons-react";
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import { useRef } from "react";
import scrollClassnames from "./Scroll.module.css";
import FileDisplay from "../FileDisplay";
const Navbar = () => {
  const openRef = useRef<() => void>(null);

  function handleUpload(files: FileWithPath[]) {
    console.log(files);
  }
  return (
    <AppShell.Navbar p="md">
      <AppShell.Section>
        <Title size="h3">Files</Title>
      </AppShell.Section>
      <Divider mt="xs" mb="md" />

      <AppShell.Section>
        <Button
          w="100%"
          leftSection={<IconUpload size={18} />}
          onClick={() => openRef.current?.()}
          style={{ pointerEvents: "all" }}
        >
          Upload file
        </Button>
        <ScrollArea></ScrollArea>
      </AppShell.Section>
      <ScrollArea h="100%" my="md" classNames={scrollClassnames}>
        <AppShell.Section h="100%">
          <Dropzone
            h="100%"
            openRef={openRef}
            onDrop={handleUpload}
            activateOnClick={false}
          >
            <Stack align="stretch">
              <FileDisplay
                fileInfo={{
                  name: "document.txt",
                  createdAt: new Date(),
                  size: 0,
                }}
              />
            </Stack>
          </Dropzone>
        </AppShell.Section>
      </ScrollArea>
      <AppShell.Section>
        <UserDisplay />
      </AppShell.Section>
    </AppShell.Navbar>
  );
};

export default Navbar;
