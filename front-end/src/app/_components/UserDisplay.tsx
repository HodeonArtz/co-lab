import { ActionIcon, Avatar, Group, Stack, Text, Tooltip } from "@mantine/core";
import { getCurrentUser, logoutUser } from "../_services/authService";
import { IconLogout } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const UserDisplay = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();

  function handleLogout() {
    logoutUser();
    navigate("/auth/login");
  }
  return (
    <Group justify="space-between" align="center">
      <Group align="center">
        <Avatar radius="xl" />
        <Stack gap={0}>
          <Text fw="bold">{user || ""}</Text>
          <Text>User</Text>
        </Stack>
      </Group>
      <Tooltip label="Log out">
        <ActionIcon size="lg" variant="subtle" onClick={handleLogout}>
          <IconLogout />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
};

export default UserDisplay;
