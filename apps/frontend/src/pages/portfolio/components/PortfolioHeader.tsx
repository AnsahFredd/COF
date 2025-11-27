import { Box, Stack, Text } from '@mantine/core';
import { motion, Variants } from 'framer-motion';
import { useRef } from 'react';
import styles from '../portfolio.module.css';
import heroBg from 'src/assets/images/image16.jpg';

const PortfolioHeader = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToPortfolio = () => {
    const portfolioSection = document.getElementById('portfolio-gallery');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <Box className={styles.heroContainer} w="100%" ref={containerRef}>
      <Box component="img" src={heroBg} alt="Hero Background" className={styles.heroBgImage} />

      <Box className={styles.gradientOverlay} />

      <Box className={styles.gridPattern} />

      <motion.div className={styles.heroContent}>
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <Stack gap={24} justify="center" align="center" className={styles.contentWrapper}>
            {/* Main title */}
            <motion.div variants={itemVariants}>
              <h1 className={styles.heroTitle}>Crafting Unforgettable Events</h1>
            </motion.div>
          </Stack>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollIndicator}
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        onClick={scrollToPortfolio}
      >
        <Text className={styles.scrollText}>Scroll to explore</Text>
        <Box className={styles.scrollDot}>
          <motion.div
            className={styles.scrollDotInner}
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </Box>
      </motion.div>
    </Box>
  );
};

export default PortfolioHeader;
