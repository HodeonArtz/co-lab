import { ActionIcon, Group, Title } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { fetchAndGetAllMessages } from "../../_services/chat";

const ChatHeader = () => {
  async function handleDownload() {
    const url = await fetchAndGetAllMessages();
    // Crea un enlace temporal y simula el clic para descargar
    const a = document.createElement("a");
    a.href = url;
    a.download = "datos.json"; // Nombre del archivo
    a.click();

    // Limpia la URL creada
    URL.revokeObjectURL(url);
  }
  return (
    <Group justify="space-between">
      <Title size="h3">Chat</Title>
      <ActionIcon size="lg" variant="outline">
        <IconDownload onClick={handleDownload} />
      </ActionIcon>
    </Group>
  );
};

export default ChatHeader;
