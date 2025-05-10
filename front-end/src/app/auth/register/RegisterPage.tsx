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
import { useForm, zodResolver } from "@mantine/form";
import { Link } from "react-router-dom";
import { authSchema } from "../../../validations/zodAuthSchema";

const RegisterPage = () => {
  const registerForm = useForm<AuthForm>({
    mode: "controlled",
    validate: zodResolver(authSchema),
    validateInputOnChange: true,
  });
  function handleSubmit(values: AuthForm) {
    console.log("Signing up in with: ", values);
    console.error("Making a request to register is NOT IMPLEMENTED YET");
  }

  return (
    <Stack align="stretch">
      <Title ta="center" size="1.85rem" mb="lg">
        Sign up and start co.labing!
      </Title>
      <Title ta="center" order={2}>
        Register
      </Title>
      <Box component="form" onSubmit={registerForm.onSubmit(handleSubmit)}>
        <TextInput
          label="Username"
          placeholder="New username"
          size="md"
          radius="md"
          mb="xs"
          {...registerForm.getInputProps("username")}
        />
        <PasswordInput
          label="Password"
          placeholder="New password"
          size="md"
          radius="md"
          mb="xl"
          {...registerForm.getInputProps("password")}
        />
        <Button type="submit" fullWidth mt="xl" size="md" radius="md">
          Register
        </Button>

        <Text ta="center" mt="md">
          Already have an account?{" "}
          <Anchor component={Link} to="/auth/login" fw={500}>
            Log in
          </Anchor>
        </Text>
      </Box>
    </Stack>
  );
};

export default RegisterPage;
