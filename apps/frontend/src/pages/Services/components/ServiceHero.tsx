import { Container, Title, Text, Box, Stack } from '@mantine/core';
import { motion } from 'framer-motion';
import { easeOut } from 'framer-motion';
import heroBg from '../../../assets/images/image17.jpg';
import classes from '../Services.module.css';

export default function ServicesHero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easeOut },
    },
  };

  return (
    <Box component="section" className={classes.heroSection}>
      {/* Background Image */}
      <Box
        component="img"
        src={heroBg}
        alt="Services Background"
        className={classes.heroBackground}
      />

      {/* Dark Overlay for text readability */}
      <Box className={classes.heroOverlay} />

      {/* Decorative blur orbs */}
      <Box className={classes.decorativeOrbs}>
        <Box className={classes.orb1} />
        <Box className={classes.orb2} />
      </Box>

      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <Container size="lg" className={classes.heroContent}>
          <Stack gap="xl" align="center">
            <motion.div variants={itemVariants}>
              <Stack gap="md" align="center">
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.6,
                  }}
                >
                  <Text
                    size="sm"
                    fw={300}
                    c="rgb(217, 119, 6)"
                    tt="uppercase"
                    style={{
                      letterSpacing: '0.1em',
                    }}
                  >
                    Cofuel Events
                  </Text>
                </motion.div>
                <Title order={1} fw={300} c="white" className={classes.heroTitle}>
                  Our{' '}
                  <Text span fw={400} c="rgb(245, 158, 11)" inherit>
                    Services
                  </Text>
                </Title>
              </Stack>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Text size="xl" fw={300} c="rgb(203, 213, 225)" className={classes.heroSubtitle}>
                Elevating moments into unforgettable experiences through meticulous attention to
                detail and creative excellence
              </Text>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Box className={classes.heroDivider} />
            </motion.div>

            <motion.div
              variants={itemVariants}
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
              }}
              className={classes.scrollIconWrapper}
            >
              <svg
                className={classes.scrollIcon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          </Stack>
        </Container>
      </motion.div>
    </Box>
  );
}
