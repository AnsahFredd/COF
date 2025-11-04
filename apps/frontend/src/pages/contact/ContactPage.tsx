import React from 'react';
import { Container, Title, Text, Paper } from '@mantine/core';
import { ContactForm } from './components/ContactForm';
import ContactHero from './components/ContactHero';
import ContactInfo from './components/ContactInfo'; // ✅ new import

const ContactPage: React.FC = () => {
  return (
    <div style={{ width: '100%', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Hero Section */}
      <ContactHero />

      {/* Contact Info / Details Section */}
      <ContactInfo />

      {/* Contact Form Section */}
      <Container size="sm" py="xl">
        <Paper shadow="md" radius="md" p="xl" withBorder>
          <Title order={2} mb="sm" ta="center">
            Contact Us
          </Title>
          <Text c="dimmed" ta="center" mb="xl">
            Have any questions, feedback, or partnership ideas? Send us a message — we’ll get back
            to you soon.
          </Text>
          <ContactForm />
        </Paper>
      </Container>
    </div>
  );
};

export default ContactPage;
