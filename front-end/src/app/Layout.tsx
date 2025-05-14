import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./_components/layout/Header";
import Navbar from "./_components/layout/Navbar";
import { useEffect } from "react";

const Layout = () => {
  const navigate = useNavigate();
  const [opened, { toggle }] = useDisclosure();

  useEffect(() => {
    if (localStorage.getItem("isLogged") !== "true") navigate("/auth/login");
  }, []);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened, desktop: opened },
      }}
      aside={{
        width: 350,
        breakpoint: "md",
        collapsed: { desktop: false, mobile: true },
      }}
      padding="md"
    >
      <Header {...{ opened, toggle }} />
      <Navbar />
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default Layout;
