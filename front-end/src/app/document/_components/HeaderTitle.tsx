import { ActionIcon, Group, Title } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { ReactNode } from "react";

interface Props {
  onDownload: () => void;
  children: string | ReactNode;
}

const HeaderTitle = ({ onDownload, children }: Props) => {
  return (
    <Group justify="space-between">
      <Title size="h3">{children}</Title>
      <ActionIcon size="lg" variant="outline">
        <IconDownload onClick={onDownload} />
      </ActionIcon>
    </Group>
  );
};

export default HeaderTitle;
