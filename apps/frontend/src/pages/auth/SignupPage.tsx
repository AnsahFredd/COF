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
  Alert,
  Stack,
  Group,
  Checkbox,
} from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { signupSchema, type SignupFormData } from 'src/validators';
import { useSignup } from 'src/features/authentication';
import { ROUTES } from 'src/constants/routes';
import { RouterLink } from 'src/components/ui/RouterLink';
import styles from './auth.module.css';

const SignupPage = () => {
  const { signup, isLoading, error } = useSignup();

  const form = useForm<SignupFormData>({
    validate: zodResolver(signupSchema),
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
  });

  const handleSubmit = async (values: SignupFormData) => {
    try {
      await signup(values);
    } catch (error) {
      // Error handled by mutation
    }
  };

  // Check if all required fields are filled
  const isFormValid =
    form.values.firstName.trim() !== '' &&
    form.values.lastName.trim() !== '' &&
    form.values.email.trim() !== '' &&
    form.values.password.trim() !== '' &&
    form.values.confirmPassword.trim() !== '' &&
    form.values.agreeToTerms === true;

  return (
    <div className={styles.authContainer}>
      <Container size={500} className={styles.authPaper}>
        <Paper withBorder shadow="md" p={30} radius="md">
          <Title className={styles.authTitle}>Create your account</Title>
          <Text c="dimmed" size="sm" className={styles.authSubtext}>
            Already have an account?{' '}
            <Anchor size="sm" component={RouterLink} to={ROUTES.LOGIN}>
              Sign in
            </Anchor>
          </Text>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack className={styles.formStack}>
              {error && (
                <Alert icon={<IconAlertCircle size={16} />} title="Signup failed" color="red">
                  {error.message || 'Something went wrong. Please try again.'}
                </Alert>
              )}

              <Group grow>
                <TextInput
                  label="First name"
                  placeholder="John"
                  required
                  {...form.getInputProps('firstName')}
                />
                <TextInput
                  label="Last name"
                  placeholder="Doe"
                  required
                  {...form.getInputProps('lastName')}
                />
              </Group>

              <TextInput
                label="Email"
                placeholder="your@email.com"
                required
                {...form.getInputProps('email')}
              />

              <TextInput
                label="Phone (optional)"
                placeholder="0244 123 456"
                {...form.getInputProps('phone')}
              />

              <PasswordInput
                label="Password"
                placeholder="Create a strong password"
                required
                {...form.getInputProps('password')}
              />

              <PasswordInput
                label="Confirm password"
                placeholder="Confirm your password"
                required
                {...form.getInputProps('confirmPassword')}
              />

              <Checkbox
                label={
                  <>
                    I agree to the{' '}
                    <Anchor size="sm" href="/terms" target="_blank">
                      terms and conditions
                    </Anchor>
                  </>
                }
                required
                {...form.getInputProps('agreeToTerms', {
                  type: 'checkbox',
                })}
              />

              <Button
                fullWidth
                type="submit"
                loading={isLoading}
                disabled={!isFormValid || isLoading}
                className={styles.submitButton}
              >
                Create account
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default SignupPage;
