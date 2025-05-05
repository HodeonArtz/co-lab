import { AppShell, Burger, Group } from "@mantine/core";
import Brand from "./Brand";

const Header = ({
  opened,
  toggle,
}: {
  opened: boolean;
  toggle: () => void;
}) => {
  return (
    <AppShell.Header>
      <Group h="100%" px="md">
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Brand />
      </Group>
    </AppShell.Header>
  );
};

export default Header;
