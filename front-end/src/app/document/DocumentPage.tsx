import { Box, Text } from "@mantine/core";
import { useParams } from "react-router-dom";

const DocumentPage = () => {
  const { id } = useParams();

  return (
    <Box>
      <Text>DocumentPage</Text>
      <Text>{id}</Text>
    </Box>
  );
};

export default DocumentPage;
