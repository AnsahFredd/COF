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
  Anchor,
} from '@mantine/core';
import { IconAlertCircle, IconCheck } from '@tabler/icons-react';
import { useSearchParams, Link } from 'react-router-dom';
import { useResetPassword } from 'src/features/authentication';
import { resetPasswordSchema, type ResetPasswordFormData } from 'src/validators';
import { ROUTES } from 'src/constants/routes';
import styles from './auth.module.css';

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
      <div className={styles.authContainer}>
        <Container size={460} className={styles.authPaper}>
          <Paper withBorder shadow="md" p={40} radius="md">
            <Stack align="center" gap="lg">
              <div className={`${styles.iconContainer} ${styles.iconContainerError}`}>
                <IconAlertCircle size={40} className={styles.iconError} />
              </div>

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
      </div>
    );
  }

  return (
    <div className={styles.authContainer}>
      <Container size={460} className={styles.authPaper}>
        <Paper withBorder shadow="md" p={40} radius="md">
          <Title className={styles.authTitle}>Reset your password</Title>
          <Text c="dimmed" size="sm" className={styles.authSubtext}>
            Enter your new password below
          </Text>

          {isSuccess ? (
            <Stack align="center" gap="lg">
              <div className={`${styles.iconContainer} ${styles.iconContainerSuccess}`}>
                <IconCheck size={40} className={styles.iconSuccess} />
              </div>

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
    </div>
  );
};

export default ResetPasswordPage;
