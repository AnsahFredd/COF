import { Box, Text, Container } from '@mantine/core';
import classes from './About.module.css';

const AboutHero = () => {
  return (
    <Box className={classes.heroContainer}>
      {/* Background Image */}
      <Box
        className={classes.heroBackground}
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80")',
        }}
      />

      {/* Overlay */}
      <Box className={classes.heroOverlay} />

      {/* Content */}
      <Container size="xl" className={classes.heroContent}>
        <Text className={classes.heroTitle}>About Us</Text>
        <Text className={classes.heroText}>
          Crafting unforgettable moments and turning your dreams into reality through meticulous
          planning and creative innovation.
        </Text>
      </Container>
    </Box>
  );
};

export default AboutHero;
