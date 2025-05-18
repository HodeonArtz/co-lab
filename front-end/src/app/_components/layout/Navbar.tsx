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
import { useEffect, useRef, useState } from "react";
import scrollClassnames from "./Scroll.module.css";
import FileDisplay from "../FileDisplay";
import { FileInfo, IncomingFileInfo } from "../../../types/files";
import { WS_URL } from "../../_services/wsService";
const Navbar = () => {
  const openRef = useRef<() => void>(null);
  const [onUpload, setOnUpload] = useState<
    ((fileInfo: FileWithPath[]) => void) | undefined
  >();
  const [files, setFiles] = useState<FileInfo[]>([]);

  useEffect(() => {
    const socket = new WebSocket(`${WS_URL}/file`);

    function setIncomingFiles(event: any) {
      const incomingMessages: IncomingFileInfo[] = JSON.parse(event.data);
      setFiles(
        incomingMessages.map(({ createdAt, ...fileInfo }) => {
          return { ...fileInfo, createdAt: new Date(createdAt) };
        })
      );
    }

    socket.onopen = () => {
      console.log("WebSocket conectado a file");
      /* setOnUpload(() => {
        return async () => {
          for (const file of files) {
            // 1️⃣  Envía cabecera con metadatos
            const header = {
              type: "file-start",
              name: file.name,
              size: file.size,
            };
            socket.send(JSON.stringify(header));

            // 2️⃣  Divide el archivo en chunks (p. ej. 64 kB)
            const chunkSize = 64 * 1024;
            let offset = 0;

            while (offset < file.size) {
              const blobPart = file.slice(offset, offset + chunkSize);
              const arrayBuf = await blobPart.arrayBuffer(); // convierte a ArrayBuffer
              socket.send(arrayBuf); // binario
              offset += chunkSize;
            }

            // 3️⃣  Marca fin de archivo
            socket.send(JSON.stringify({ type: "file-end", name: file.name }));
          }
          socket.send(JSON.stringify({ type: "file-info", name }));
        };
      }); */
    };

    socket.onmessage = (event) => {
      console.log("Mensaje recibido de file:", JSON.parse(event.data));
      setIncomingFiles(event);
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
  function handleUpload(files: FileWithPath[]) {
    if (!onUpload) return;
    onUpload(files);
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
              {files.map((fileInfo) => (
                <FileDisplay fileInfo={fileInfo} key={fileInfo.name} />
              ))}
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
