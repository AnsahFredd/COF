import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import {
  TextInput,
  Button,
  Paper,
  Title,
  Text,
  Container,
  Anchor,
  Stack,
  Alert,
} from '@mantine/core';
import { IconAlertCircle, IconMail } from '@tabler/icons-react';
import { IconContainer } from 'src/components/ui/IconContainer';
import { Link } from 'react-router-dom';
import { useForgotPassword } from 'src/features/authentication';
import { forgotPasswordSchema, type ForgotPasswordFormData } from 'src/validators';
import { ROUTES } from 'src/constants/routes';
import styles from './auth.module.css';

const ForgotPasswordPage = () => {
  const { sendResetEmail, isLoading, isSuccess, error } = useForgotPassword();

  const form = useForm<ForgotPasswordFormData>({
    validate: zodResolver(forgotPasswordSchema),
    initialValues: {
      email: '',
    },
  });

  const handleSubmit = async (values: ForgotPasswordFormData) => {
    try {
      await sendResetEmail(values);
    } catch (err) {
      // Error handled by mutation
    }
  };

  // Check if email field is filled
  const isFormValid = form.values.email.trim() !== '';

  return (
    <div className={styles.authContainer}>
      <Container size={460} className={styles.authPaper}>
        <Paper withBorder shadow="md" p={40} radius="md">
          <Title className={styles.authTitle}>Forgot your password?</Title>
          <Text c="dimmed" size="sm" className={styles.authSubtext}>
            Enter your email to receive reset instructions
          </Text>

          {isSuccess ? (
            <Stack align="center" gap="lg">
              <IconContainer variant="success" size="md">
                <IconMail size={40} />
              </IconContainer>

              <Stack gap="xs" align="center">
                <Title order={3} fw={600}>
                  Check your email
                </Title>
                <Text c="dimmed" size="sm" ta="center" maw={350}>
                  We've sent password reset instructions to your email address.
                </Text>
              </Stack>

              <Anchor component={Link} to={ROUTES.LOGIN} mt="md" fw={500}>
                Back to login
              </Anchor>
            </Stack>
          ) : (
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack gap="md">
                {error && (
                  <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
                    {error.message || 'Failed to send reset email'}
                  </Alert>
                )}

                <TextInput
                  label="Email"
                  placeholder="your@email.com"
                  required
                  size="md"
                  {...form.getInputProps('email')}
                />

                <Button
                  fullWidth
                  type="submit"
                  loading={isLoading}
                  size="md"
                  mt="sm"
                  disabled={!isFormValid || isLoading}
                >
                  Send reset link
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

export default ForgotPasswordPage;
