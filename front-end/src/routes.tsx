import { createBrowserRouter } from "react-router-dom";
import Layout from "./app/Layout";
import HomePage from "./app/HomePage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ index: true, element: <HomePage /> }],
  },
]);
