import { Container, Title, Text, Box, List, Anchor } from '@mantine/core';
import classes from './legal.module.css';

export default function TermsPage() {
  return (
    <Box className={classes.legalContainer}>
      {/* Hero Section */}
      <Box className={classes.hero}>
        <Container size="lg">
          <Title className={classes.heroTitle}>Terms & Conditions</Title>
          <Text className={classes.heroSubtitle}>
            Please read these terms carefully before using our services.
          </Text>
          <Text className={classes.lastUpdated}>Last Updated: November 27, 2025</Text>
        </Container>
      </Box>

      {/* Content Section */}
      <Container size="md" py={60}>
        <Box>
          <Title order={2} className={classes.sectionTitle}>
            1. Acceptance of Terms
          </Title>
          <Text className={classes.text}>
            By accessing and using CoFuel Events' services, you accept and agree to be bound by
            these Terms and Conditions. If you do not agree to these terms, please do not use our
            services.
          </Text>
        </Box>

        <Box>
          <Title order={2} className={classes.sectionTitle}>
            2. Services
          </Title>
          <Text className={classes.text}>
            CoFuel Events provides event planning, styling, catering, and related services. We
            reserve the right to modify, suspend, or discontinue any aspect of our services at any
            time.
          </Text>
        </Box>

        <Box>
          <Title order={2} className={classes.sectionTitle}>
            3. Booking and Payment
          </Title>
          <List className={classes.list}>
            <List.Item>All bookings are subject to availability and confirmation</List.Item>
            <List.Item>A deposit may be required to secure your booking</List.Item>
            <List.Item>Full payment is due as per the agreed payment schedule</List.Item>
            <List.Item>We accept various payment methods as specified during booking</List.Item>
            <List.Item>All prices are in the local currency unless otherwise stated</List.Item>
          </List>
        </Box>

        <Box>
          <Title order={2} className={classes.sectionTitle}>
            4. Cancellation and Refund Policy
          </Title>
          <List className={classes.list}>
            <List.Item>Cancellations must be made in writing</List.Item>
            <List.Item>Cancellations made more than 30 days before the event: 50% refund</List.Item>
            <List.Item>Cancellations made 15-30 days before the event: 25% refund</List.Item>
            <List.Item>Cancellations made less than 15 days before the event: No refund</List.Item>
            <List.Item>Deposits are non-refundable</List.Item>
          </List>
        </Box>

        <Box>
          <Title order={2} className={classes.sectionTitle}>
            5. Client Responsibilities
          </Title>
          <Text className={classes.text}>As a client, you agree to:</Text>
          <List className={classes.list}>
            <List.Item>Provide accurate and complete information</List.Item>
            <List.Item>Communicate event requirements clearly and in a timely manner</List.Item>
            <List.Item>Ensure venue access and necessary permissions are obtained</List.Item>
            <List.Item>Adhere to agreed timelines and payment schedules</List.Item>
          </List>
        </Box>

        <Box>
          <Title order={2} className={classes.sectionTitle}>
            6. Liability and Indemnification
          </Title>
          <Text className={classes.text}>
            CoFuel Events will exercise reasonable care in providing services. However, we are not
            liable for:
          </Text>
          <List className={classes.list}>
            <List.Item>Circumstances beyond our reasonable control (force majeure)</List.Item>
            <List.Item>Damages resulting from client-provided materials or instructions</List.Item>
            <List.Item>Third-party vendor failures</List.Item>
          </List>
        </Box>

        <Box>
          <Title order={2} className={classes.sectionTitle}>
            7. Intellectual Property
          </Title>
          <Text className={classes.text}>
            All content, designs, and materials created by CoFuel Events remain our intellectual
            property unless otherwise agreed in writing. You may not reproduce, distribute, or use
            our materials without permission.
          </Text>
        </Box>

        <Box>
          <Title order={2} className={classes.sectionTitle}>
            8. Photography and Media
          </Title>
          <Text className={classes.text}>
            We may photograph or record events for promotional purposes. By using our services, you
            grant us permission to use such media unless you explicitly opt out in writing.
          </Text>
        </Box>

        <Box>
          <Title order={2} className={classes.sectionTitle}>
            9. Modifications to Terms
          </Title>
          <Text className={classes.text}>
            We reserve the right to modify these Terms and Conditions at any time. Changes will be
            effective immediately upon posting. Your continued use of our services constitutes
            acceptance of the modified terms.
          </Text>
        </Box>

        <Box>
          <Title order={2} className={classes.sectionTitle}>
            10. Governing Law
          </Title>
          <Text className={classes.text}>
            These Terms and Conditions are governed by the laws of Ghana. Any disputes will be
            subject to the exclusive jurisdiction of the courts in Accra, Ghana.
          </Text>
        </Box>

        <Box>
          <Title order={2} className={classes.sectionTitle}>
            11. Contact Information
          </Title>
          <Text className={classes.text}>
            For questions about these Terms and Conditions, please contact us:
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
