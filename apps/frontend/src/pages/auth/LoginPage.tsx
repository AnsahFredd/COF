import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Text,
  Container,
  Anchor,
  Checkbox,
  Stack,
  Alert,
  Center,
} from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { loginSchema, type LoginFormData } from 'src/validators';
import { useLogin } from 'src/features/authentication';
import { ROUTES } from 'src/constants/routes';
import { RouterLink } from 'src/components/ui/RouterLink';

const LoginPage = () => {
  const { login, isLoading, error } = useLogin();

  const form = useForm<LoginFormData>({
    validate: zodResolver(loginSchema),
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const handleSubmit = async (values: LoginFormData) => {
    try {
      await login(values);
    } catch (error) {
      // Error handled by mutation
    }
  };

  // Check if all required fields are filled
  const isFormValid = form.values.email.trim() !== '' && form.values.password.trim() !== '';

  return (
    <Center style={{ minHeight: '100vh' }}>
      <Container size={500}>
        <Paper withBorder shadow="md" p={30} radius="md">
          <Title ta="center" fw={900}>
            Welcome back!
          </Title>
          <Text c="dimmed" size="sm" ta="center" mt={5} mb={20}>
            Don't have an account yet?{' '}
            <Anchor size="sm" component={RouterLink} to={ROUTES.SIGNUP}>
              Create account
            </Anchor>
          </Text>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
              {error && (
                <Alert icon={<IconAlertCircle size={16} />} title="Login failed" color="red">
                  {error.message || 'Invalid email or password.'}
                </Alert>
              )}

              <TextInput
                label="Email"
                placeholder="ansfredd@gmail.com"
                required
                {...form.getInputProps('email')}
              />

              <PasswordInput
                label="Password"
                placeholder="Your password"
                required
                {...form.getInputProps('password')}
              />

              <Checkbox
                label="Remember me"
                {...form.getInputProps('rememberMe', { type: 'checkbox' })}
              />

              <Button
                fullWidth
                type="submit"
                loading={isLoading}
                disabled={!isFormValid || isLoading}
              >
                Sign in
              </Button>

              <Text size="sm" ta="center">
                <Anchor size="sm" component={RouterLink} to={ROUTES.FORGOT_PASSWORD}>
                  Forgot password?
                </Anchor>
              </Text>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Center>
  );
};

export default LoginPage;
