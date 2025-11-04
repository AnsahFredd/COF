import { Container, Title, Text, Box, Stack } from '@mantine/core';
import { motion } from 'framer-motion';
import { easeOut } from 'framer-motion';

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
    <Box
      component="section"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(to bottom, #020617, #0f172a, var(--mantine-color-body))',
        paddingTop: '5rem',
      }}
    >
      <Box
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.3,
        }}
      >
        <Box
          style={{
            position: 'absolute',
            top: '5rem',
            left: '2.5rem',
            width: '18rem',
            height: '18rem',
            background: 'rgba(217, 119, 6, 0.2)',
            borderRadius: '9999px',
            filter: 'blur(64px)',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          }}
        />
        <Box
          style={{
            position: 'absolute',
            bottom: '5rem',
            right: '2.5rem',
            width: '24rem',
            height: '24rem',
            background: 'rgba(245, 158, 11, 0.1)',
            borderRadius: '9999px',
            filter: 'blur(64px)',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            animationDelay: '1s',
          }}
        />
      </Box>

      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <Container
          size="lg"
          style={{
            position: 'relative',
            zIndex: 10,
            textAlign: 'center',
          }}
        >
          <Stack gap="xl">
            <motion.div variants={itemVariants}>
              <Stack gap="md">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Text
                    size="sm"
                    fw={300}
                    c="rgb(217, 119, 6)"
                    tt="uppercase"
                    style={{ letterSpacing: '0.1em' }}
                  >
                    Cofuel Events
                  </Text>
                </motion.div>
                <Title
                  order={1}
                  fw={300}
                  c="white"
                  style={{
                    fontSize: 'clamp(3rem, 7vw, 4.5rem)',
                    lineHeight: 1.2,
                    letterSpacing: '-0.02em',
                  }}
                >
                  Our{' '}
                  <Text span fw={400} c="rgb(245, 158, 11)" inherit>
                    Services
                  </Text>
                </Title>
              </Stack>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Text
                size="xl"
                fw={300}
                c="rgb(203, 213, 225)"
                maw={600}
                mx="auto"
                style={{ lineHeight: 1.7 }}
              >
                Elevating moments into unforgettable experiences through meticulous attention to
                detail and creative excellence
              </Text>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Box
                style={{
                  width: '4rem',
                  height: '1px',
                  background:
                    'linear-gradient(to right, transparent, rgb(245, 158, 11), transparent)',
                  margin: '1rem auto 0',
                }}
              />
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              style={{ paddingTop: '2rem' }}
            >
              <svg
                style={{
                  width: '1.5rem',
                  height: '1.5rem',
                  margin: '0 auto',
                  color: 'rgb(245, 158, 11)',
                }}
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
