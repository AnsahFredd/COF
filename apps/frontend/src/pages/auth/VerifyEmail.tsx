import { useEffect } from 'react';
import { Container, Paper, Title, Text, Loader, Alert, Stack } from '@mantine/core';
import { IconCheck, IconAlertCircle } from '@tabler/icons-react';
import { useSearchParams } from 'react-router-dom';
import { useVerifyEmail } from 'src/features/authentication';

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const { verifyEmail, isLoading, isSuccess, error } = useVerifyEmail();

  useEffect(() => {
    if (token) {
      verifyEmail({ token });
    }
  }, [token, verifyEmail]);

  return (
    <Container size={420} my={40}>
      <Title ta="center" fw={900}>
        Email Verification
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Stack gap="md" align="center">
          {isLoading && (
            <>
              <Loader size="lg" />
              <Text>Verifying your email...</Text>
            </>
          )}

          {isSuccess && (
            <Alert icon={<IconCheck size={16} />} title="Email verified!" color="green">
              Your email has been successfully verified. Redirecting to dashboard...
            </Alert>
          )}

          {error && (
            <Alert icon={<IconAlertCircle size={16} />} title="Verification failed" color="red">
              {error.message || 'This verification link is invalid or has expired.'}
            </Alert>
          )}

          {!token && (
            <Alert icon={<IconAlertCircle size={16} />} title="Invalid link" color="red">
              No verification token provided.
            </Alert>
          )}
        </Stack>
      </Paper>
    </Container>
  );
};

export default VerifyEmailPage;
