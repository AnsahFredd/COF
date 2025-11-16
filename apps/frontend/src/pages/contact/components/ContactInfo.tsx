import React from 'react';
import { Container, SimpleGrid, Text, Title, Stack, ThemeIcon, Paper } from '@mantine/core';
import { contactDetails } from '../constants/contactDetails';

const ContactInfo: React.FC = () => {
  return (
    <Container
      size="lg"
      py={100}
      style={{
        textAlign: 'center',
      }}
    >
      <Stack align="center" mb="xl">
        <Title
          order={2}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 700,
            color: 'var(--mantine-color-gold-6)',
            fontSize: '2.5rem',
          }}
        >
          Contact Information
        </Title>
        <Text
          c="dimmed"
          style={{
            maxWidth: 600,
            marginInline: 'auto',
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Reach out to us for bookings, collaborations, or special requests. We’d love to be part of
          your next unforgettable event.
        </Text>
      </Stack>

      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl" mt="xl">
        {contactDetails.map((item, index) => (
          <Paper
            key={index}
            shadow="md"
            radius="lg"
            p="xl"
            withBorder
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(163, 142, 19, 0.2)',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.border = '1px solid var(--mantine-color-gold-6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.border = '1px solid rgba(163, 142, 19, 0.2)';
            }}
          >
            <Stack align="center" gap={10}>
              <ThemeIcon
                size={60}
                radius="xl"
                variant="filled"
                color="gold.6"
                style={{
                  boxShadow: '0 0 20px rgba(163, 142, 19, 0.5)',
                }}
              >
                <item.icon size={28} color="white" />
              </ThemeIcon>

              <Text
                fw={600}
                size="lg"
                style={{
                  color: 'var(--mantine-color-white-0)',
                  fontFamily: "'Cormorant Garamond', serif",
                }}
              >
                {item.title}
              </Text>

              <Text
                size="sm"
                c="dimmed"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                {item.value}
              </Text>
            </Stack>
          </Paper>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default ContactInfo;
