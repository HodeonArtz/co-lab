import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { theme } from "./theme";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <RouterProvider router={routes} />
    </MantineProvider>
  );
}
