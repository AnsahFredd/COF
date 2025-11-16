import React from 'react';
import { Box, Title, Text, Container } from '@mantine/core';
import { motion } from 'framer-motion';
import Contact_BackgroundImage from 'src/assets/images/contact-backimg.png';

const ContactHero: React.FC = () => {
  return (
    <Box
      bg={`url(${Contact_BackgroundImage}) center/cover no-repeat`}
      style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Overlay */}
      <Box
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 100%)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Container
        size="lg"
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          color: '#fff',
          padding: '2rem',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <Title
            order={1}
            style={{
              fontSize: '3.5rem',
              fontWeight: 700,
              fontFamily: "'Playfair Display', serif",
              letterSpacing: '1px',
              marginBottom: '1rem',
            }}
          >
            Contact Information
          </Title>
          <Text
            size="xl"
            style={{
              fontFamily: "'Poppins', sans-serif",
              opacity: 0.9,
              fontWeight: 400,
            }}
          >
            Get in touch with us
          </Text>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ContactHero;
