import { createBrowserRouter } from "react-router-dom";
import Layout from "./app/Layout";
import HomePage from "./app/HomePage";
import RegisterPage from "./app/auth/register/RegisterPage";
import LoginPage from "./app/auth/login/LoginPage";
import DocumentPage from "./app/document/DocumentPage";
import AuthLayout from "./app/auth/AuthLayout";
import NotFoundPage from "./app/NotFoundPage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "document/:id", element: <DocumentPage /> },
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
