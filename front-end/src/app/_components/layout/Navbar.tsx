import { AppShell, ScrollArea } from "@mantine/core";
import UserDisplay from "../UserDisplay";

const Navbar = () => {
  return (
    <AppShell.Navbar p="md">
      <AppShell.Section>Navbar header</AppShell.Section>
      <AppShell.Section grow my="md" component={ScrollArea}></AppShell.Section>
      <AppShell.Section>
        <UserDisplay />
      </AppShell.Section>
    </AppShell.Navbar>
  );
};

export default Navbar;
