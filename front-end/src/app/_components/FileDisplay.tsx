import { ActionIcon, NavLink } from "@mantine/core";
import { IconDownload, IconTrash } from "@tabler/icons-react";

const FileDisplay = () => {
  return (
    <NavLink
      label="With icon"
      rightSection={
        <ActionIcon.Group>
          <ActionIcon variant="subtle" size="md">
            <IconDownload size={16} stroke={1.5} />
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
