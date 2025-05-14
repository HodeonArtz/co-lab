import { AppShell, Container } from "@mantine/core";
import { DocumentEditor } from "./_components/DocumentEditor";
import Chat from "./_components/Chat";

const DocumentPage = () => {
  return (
    <>
      <Container>
        <DocumentEditor />
      </Container>

      <AppShell.Aside p="md">
        <Chat />
      </AppShell.Aside>
    </>
  );
};

export default DocumentPage;
