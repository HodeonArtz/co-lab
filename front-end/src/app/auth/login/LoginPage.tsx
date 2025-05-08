import {
  Anchor,
  Box,
  Button,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <Stack align="stretch">
      <Title ta="center" size="1.85rem" mb="lg">
        Welcome back!
      </Title>
      <Title ta="center" order={2}>
        Log in
      </Title>
      <Box>
        <TextInput
          label="Username"
          placeholder="Your username"
          size="md"
          radius="md"
          mb="xs"
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          size="md"
          radius="md"
          mb="xl"
        />
        <Button fullWidth mt="xl" size="md" radius="md">
          Login
        </Button>

        <Text ta="center" mt="md">
          Don&apos;t have an account?{" "}
          <Anchor component={Link} to="/auth/register" fw={500}>
            Register
          </Anchor>
        </Text>
      </Box>
    </Stack>
  );
};

export default LoginPage;
