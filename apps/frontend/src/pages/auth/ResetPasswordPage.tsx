import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import {
  PasswordInput,
  Button,
  Paper,
  Title,
  Text,
  Container,
  Stack,
  Alert,
  Center,
  Anchor,
} from '@mantine/core';
import { IconAlertCircle, IconCheck } from '@tabler/icons-react';
import { useSearchParams, Link } from 'react-router-dom';
import { useResetPassword } from 'src/features/authentication';
import { resetPasswordSchema, type ResetPasswordFormData } from 'src/validators';
import { ROUTES } from 'src/constants/routes';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const { resetPassword, isLoading, isSuccess, error } = useResetPassword();

  const form = useForm<ResetPasswordFormData>({
    validate: zodResolver(resetPasswordSchema),
    initialValues: {
      token,
      password: '',
      confirmPassword: '',
    },
  });

  const handleSubmit = async (values: ResetPasswordFormData) => {
    try {
      await resetPassword(values);
    } catch (err) {
      // Error handled by mutation
    }
  };

  // Check if all required fields are filled
  const isFormValid =
    form.values.password.trim() !== '' && form.values.confirmPassword.trim() !== '';

  if (!token) {
    return (
      <Center style={{ minHeight: '100vh' }}>
        <Container size={460}>
          <Paper withBorder shadow="md" p={40} radius="md">
            <Stack align="center" gap="lg">
              <Center
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  backgroundColor: 'var(--mantine-color-red-0)',
                }}
              >
                <IconAlertCircle
                  size={40}
                  style={{
                    color: 'var(--mantine-color-red-6)',
                  }}
                />
              </Center>

              <Stack gap="xs" align="center">
                <Title order={3} fw={600}>
                  Invalid Reset Link
                </Title>
                <Text c="dimmed" size="sm" ta="center" maw={350}>
                  This password reset link is invalid or has expired. Please request a new one.
                </Text>
              </Stack>

              <Anchor component={Link} to={ROUTES.FORGOT_PASSWORD} mt="md" fw={500}>
                Request new reset link
              </Anchor>
            </Stack>
          </Paper>
        </Container>
      </Center>
    );
  }

  return (
    <Center style={{ minHeight: '100vh' }}>
      <Container size={460}>
        <Paper withBorder shadow="md" p={40} radius="md">
          <Title ta="center" fw={900} size="h1">
            Reset your password
          </Title>
          <Text c="dimmed" size="sm" ta="center" mt={8} mb={30}>
            Enter your new password below
          </Text>

          {isSuccess ? (
            <Stack align="center" gap="lg">
              <Center
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  backgroundColor: 'var(--mantine-color-green-0)',
                }}
              >
                <IconCheck
                  size={40}
                  style={{
                    color: 'var(--mantine-color-green-6)',
                  }}
                />
              </Center>

              <Stack gap="xs" align="center">
                <Title order={3} fw={600}>
                  Password reset successful!
                </Title>
                <Text c="dimmed" size="sm" ta="center" maw={350}>
                  Your password has been successfully reset. You can now sign in with your new
                  password.
                </Text>
              </Stack>

              <Anchor component={Link} to={ROUTES.LOGIN} mt="md" fw={500}>
                Go to login
              </Anchor>
            </Stack>
          ) : (
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack gap="md">
                {error && (
                  <Alert icon={<IconAlertCircle size={16} />} title="Reset failed" color="red">
                    {error.message || 'Failed to reset password'}
                  </Alert>
                )}

                <PasswordInput
                  label="New password"
                  placeholder="Create a strong password"
                  required
                  size="md"
                  {...form.getInputProps('password')}
                />

                <PasswordInput
                  label="Confirm password"
                  placeholder="Confirm your password"
                  required
                  size="md"
                  {...form.getInputProps('confirmPassword')}
                />

                <Button
                  fullWidth
                  type="submit"
                  loading={isLoading}
                  size="md"
                  mt="sm"
                  disabled={!isFormValid || isLoading}
                >
                  Reset password
                </Button>

                <Text size="sm" ta="center" mt="md">
                  <Anchor component={Link} to={ROUTES.LOGIN} fw={500}>
                    Back to login
                  </Anchor>
                </Text>
              </Stack>
            </form>
          )}
        </Paper>
      </Container>
    </Center>
  );
};

export default ResetPasswordPage;
