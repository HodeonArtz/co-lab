import { AppShell, Container } from "@mantine/core";
import { DocumentEditor } from "./_components/DocumentEditor";

const DocumentPage = () => {
  return (
    <>
      <Container>
        <DocumentEditor />
      </Container>

      <AppShell.Aside p="md">ff</AppShell.Aside>
    </>
  );
};

export default DocumentPage;
