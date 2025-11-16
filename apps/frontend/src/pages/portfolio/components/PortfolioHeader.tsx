'use client';

import { Box, Stack, Text, Button, Divider } from '@mantine/core';
import { motion, easeOut } from 'framer-motion';
import { useRef } from 'react';
import styles from '../portfolio.module.css';

const PortfolioHeader = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToPortfolio = () => {
    const portfolioSection = document.getElementById('portfolio-gallery');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easeOut },
    },
  };

  return (
    <Box className={styles.heroContainer} w="100%" ref={containerRef}>
      {/* Gradient Background */}
      <Box className={styles.gradientOverlay} />

      <motion.div
        className={styles.heroContent}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Stack
          gap={20}
          justify="center"
          align="center"
          style={{ maxWidth: '900px', textAlign: 'center' }}
        >
          <motion.div variants={itemVariants}>
            <Text component="span" className={styles.eyebrow}>
              SERVING YOU TO YOUR SATISFACTION
            </Text>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Text component="h1" className={styles.heroTitle}>
              Cofuel Home of Events
            </Text>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Divider className={styles.goldDivider} />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Text component="p" className={styles.heroSubtitle}>
              Creating Timeless Experiences
            </Text>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button className={styles.ctaButton} onClick={scrollToPortfolio}>
              View Portfolio
            </Button>
          </motion.div>
        </Stack>
      </motion.div>

      <motion.div
        className={styles.scrollIndicator}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Box className={styles.scrollDot} />
      </motion.div>
    </Box>
  );
};

export default PortfolioHeader;
