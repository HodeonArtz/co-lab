import { ActionIcon, NavLink } from "@mantine/core";
import { IconDownload, IconTrash } from "@tabler/icons-react";
import { getFile } from "../_services/files";
import { FileInfo } from "../../types/files";

interface Props {
  fileInfo: FileInfo;
}

const FileDisplay = ({ fileInfo: { name } }: Props) => {
  async function handleDownload() {
    const url = await getFile(name);
    // Crea un enlace temporal y simula el clic para descargar
    const a = document.createElement("a");
    a.href = url;
    a.download = name; // Nombre del archivo
    a.click();

    // Limpia la URL creada
    URL.revokeObjectURL(url);
  }
  return (
    <NavLink
      label="With icon"
      rightSection={
        <ActionIcon.Group>
          <ActionIcon variant="subtle" size="md">
            <IconDownload size={16} stroke={1.5} onClick={handleDownload} />
          </ActionIcon>
          <ActionIcon variant="subtle" size="md" color="red">
            <IconTrash size={16} stroke={1.5} />
          </ActionIcon>
        </ActionIcon.Group>
      }
      variant="subtle"
      active
    />
  );
};

export default FileDisplay;
