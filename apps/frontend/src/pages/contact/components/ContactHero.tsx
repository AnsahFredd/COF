import React from 'react';
import { Box, Title, Text, Container } from '@mantine/core';
import { motion } from 'framer-motion';
import Contact_BackgroundImage from 'src/assets/images/contact-backimg.png';
import classes from '../Contact.module.css';

const ContactHero: React.FC = () => {
  return (
    <Box
      bg={`url(${Contact_BackgroundImage}) center/cover no-repeat`}
      className={classes.heroContainer}
    >
      {/* Overlay */}
      <Box className={classes.overlay} />

      {/* Content */}
      <Container size="lg" className={classes.contentContainer}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <Title order={1} className={classes.title}>
            Contact Information
          </Title>
          <Text size="xl" className={classes.subtitle}>
            Get in touch with us
          </Text>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ContactHero;
