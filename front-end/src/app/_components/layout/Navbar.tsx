import { AppShell, Divider, ScrollArea, Stack, Title } from "@mantine/core";
import UserDisplay from "../UserDisplay";

const Navbar = () => {
  return (
    <AppShell.Navbar p="md">
      <AppShell.Section>
        <Title size="h3">Files</Title>
      </AppShell.Section>
      <Divider my="md" />
      <AppShell.Section grow my="md" component={ScrollArea}>
        <Stack>f</Stack>
      </AppShell.Section>
      <AppShell.Section>
        <UserDisplay />
      </AppShell.Section>
    </AppShell.Navbar>
  );
};

export default Navbar;
