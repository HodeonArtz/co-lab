import { AppShell, ScrollArea } from "@mantine/core";

const Navbar = () => {
  return (
    <AppShell.Navbar p="md">
      <AppShell.Section>Navbar header</AppShell.Section>
      <AppShell.Section grow my="md" component={ScrollArea}></AppShell.Section>
      <AppShell.Section>Navbar footer – always at the bottom</AppShell.Section>
    </AppShell.Navbar>
  );
};

export default Navbar;
