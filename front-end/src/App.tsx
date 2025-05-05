import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <RouterProvider router={routes} />
    </MantineProvider>
  );
}
