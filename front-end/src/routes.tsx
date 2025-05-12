import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "./app/auth/AuthLayout";
import LoginPage from "./app/auth/login/LoginPage";
import RegisterPage from "./app/auth/register/RegisterPage";
import DocumentPage from "./app/document/DocumentPage";
import Layout from "./app/Layout";
import NotFoundPage from "./app/NotFoundPage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <DocumentPage /> },
      { path: "document", element: <DocumentPage /> },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      { element: <LoginPage />, index: true },
      { path: "login", element: <LoginPage />, index: true },
      { path: "register", element: <RegisterPage /> },
    ],
  },
  {
    path: "*",
    element: <Layout />,
    children: [{ path: "*", element: <NotFoundPage /> }],
  },
]);
