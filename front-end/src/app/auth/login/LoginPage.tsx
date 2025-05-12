import {
  Alert,
  Anchor,
  Box,
  Button,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconAlertTriangle } from "@tabler/icons-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authSchema } from "../../../validations/zodAuthSchema";
import { login } from "../../_services/authService";

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | undefined>();
  const loginForm = useForm<AuthForm>({
    mode: "controlled",
    validate: zodResolver(authSchema),
    validateInputOnChange: true,
  });

  async function handleSubmit(values: AuthForm) {
    console.log("Logging in with: ", values);
    const isLogged = await login(values.username, values.password);
    console.log(isLogged);
    if (!isLogged.status) {
      setError(isLogged.message);
    } else {
      localStorage.setItem("isLogged", "true");
      navigate("/");
    }
  }

  return (
    <Stack align="stretch">
      <Title ta="center" size="1.85rem" mb="lg">
        Welcome back!
      </Title>
      <Title ta="center" order={2}>
        Log in
      </Title>
      <Box component="form" onSubmit={loginForm.onSubmit(handleSubmit)}>
        <TextInput
          label="Username"
          placeholder="Your username"
          size="md"
          radius="md"
          mb="xs"
          {...loginForm.getInputProps("username")}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          size="md"
          radius="md"
          mb="xl"
          {...loginForm.getInputProps("password")}
        />
        <Button type="submit" fullWidth mt="xl" size="md" radius="md">
          Login
        </Button>

        {error && (
          <Alert mt="md" color="red" title="ERROR" icon={<IconAlertTriangle />}>
            {error}
          </Alert>
        )}

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
