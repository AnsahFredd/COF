import { Container, Title, Text, Box, List, Anchor } from '@mantine/core';
import classes from './legal.module.css';

export default function PrivacyPolicyPage() {
  return (
    <Box className={classes.legalContainer}>
      {/* Hero Section */}
      <Box className={classes.hero}>
        <Container size="lg">
          <Title className={classes.heroTitle}>Privacy Policy</Title>
          <Text className={classes.heroSubtitle}>
            Your privacy is important to us. Learn how we protect your data.
          </Text>
          <Text className={classes.lastUpdated}>Last Updated: November 27, 2025</Text>
        </Container>
      </Box>

      {/* Content Section */}
      <Container size="md" py={60}>
        <Box>
          <Title order={2} className={classes.sectionTitle}>
            1. Introduction
          </Title>
          <Text className={classes.text}>
            Welcome to CoFuel Events ("we," "our," or "us"). We are committed to protecting your
            personal information and your right to privacy. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you visit our website or use
            our services.
          </Text>
        </Box>

        <Box>
          <Title order={2} className={classes.sectionTitle}>
            2. Information We Collect
          </Title>
          <Text className={classes.text}>
            We collect information that you provide directly to us, including:
          </Text>
          <List className={classes.list}>
            <List.Item>
              Personal identification information (name, email address, phone number)
            </List.Item>
            <List.Item>Event details and preferences</List.Item>
            <List.Item>Payment and billing information</List.Item>
            <List.Item>Communication preferences</List.Item>
            <List.Item>Feedback and correspondence</List.Item>
          </List>
        </Box>

        <Box>
          <Title order={2} className={classes.sectionTitle}>
            3. How We Use Your Information
          </Title>
          <Text className={classes.text}>We use the information we collect to:</Text>
          <List className={classes.list}>
            <List.Item>Provide, maintain, and improve our services</List.Item>
            <List.Item>Process your bookings and transactions</List.Item>
            <List.Item>Send you confirmations, updates, and administrative messages</List.Item>
            <List.Item>Respond to your inquiries and provide customer support</List.Item>
            <List.Item>Send you marketing communications (with your consent)</List.Item>
            <List.Item>Comply with legal obligations</List.Item>
          </List>
        </Box>

        <Box>
          <Title order={2} className={classes.sectionTitle}>
            4. Information Sharing and Disclosure
          </Title>
          <Text className={classes.text}>
            We do not sell your personal information. We may share your information with:
          </Text>
          <List className={classes.list}>
            <List.Item>Service providers who assist in our operations</List.Item>
            <List.Item>Payment processors for transaction processing</List.Item>
            <List.Item>Legal authorities when required by law</List.Item>
          </List>
        </Box>

        <Box>
          <Title order={2} className={classes.sectionTitle}>
            5. Data Security
          </Title>
          <Text className={classes.text}>
            We implement appropriate technical and organizational measures to protect your personal
            information. However, no method of transmission over the internet is 100% secure, and we
            cannot guarantee absolute security.
          </Text>
        </Box>

        <Box>
          <Title order={2} className={classes.sectionTitle}>
            6. Your Rights
          </Title>
          <Text className={classes.text}>You have the right to:</Text>
          <List className={classes.list}>
            <List.Item>Access your personal information</List.Item>
            <List.Item>Correct inaccurate data</List.Item>
            <List.Item>Request deletion of your data</List.Item>
            <List.Item>Opt-out of marketing communications</List.Item>
            <List.Item>Withdraw consent at any time</List.Item>
          </List>
        </Box>

        <Box>
          <Title order={2} className={classes.sectionTitle}>
            7. Cookies and Tracking
          </Title>
          <Text className={classes.text}>
            We use cookies and similar tracking technologies to improve your browsing experience and
            analyze website traffic. You can control cookies through your browser settings.
          </Text>
        </Box>

        <Box>
          <Title order={2} className={classes.sectionTitle}>
            8. Changes to This Policy
          </Title>
          <Text className={classes.text}>
            We may update this Privacy Policy from time to time. We will notify you of any changes
            by posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </Text>
        </Box>

        <Box>
          <Title order={2} className={classes.sectionTitle}>
            9. Contact Us
          </Title>
          <Text className={classes.text}>
            If you have any questions about this Privacy Policy, please contact us at:
          </Text>
          <Text className={classes.text} mt={12}>
            Email:{' '}
            <Anchor href="mailto:coffiesamuel887@gmail.com" className={classes.link}>
              coffiesamuel887@gmail.com
            </Anchor>
          </Text>
          <Text className={classes.text}>Phone: +233 531 593 780</Text>
          <Text className={classes.text}>Location: Accra, Ghana</Text>
        </Box>
      </Container>
    </Box>
  );
}
