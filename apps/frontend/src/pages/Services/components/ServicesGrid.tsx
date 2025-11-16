import { useState } from 'react';
import { easeOut, motion } from 'framer-motion';
import { Box, Container, SimpleGrid, Title, Text, Button, Stack, Image } from '@mantine/core';
import servicesData from '../constants/servicesData';
import { Link } from 'react-router-dom';

export default function ServicesGrid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  };

  return (
    <Box component="section" w="100%" py={96} px="xl" bg="var(--mantine-color-body)">
      <Container size="xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="xl">
            {servicesData.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ cursor: 'pointer' }}
              >
                <Box
                  pos="relative"
                  h={384}
                  style={{ overflow: 'hidden', borderRadius: '8px' }}
                  bg="gray.9"
                >
                  {/* Background Image */}
                  <motion.div
                    animate={{
                      scale: hoveredIndex === index ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    style={{ width: '100%', height: '100%' }}
                  >
                    <Image
                      src={service.mainimage}
                      alt={service.title}
                      h="100%"
                      w="100%"
                      fit="cover"
                    />
                  </motion.div>

                  <motion.div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(to top, rgb(2 6 23) 0%, rgba(2, 6, 23, 0.4) 50%, transparent 100%)',
                    }}
                    animate={{
                      opacity: hoveredIndex === index ? 0.8 : 0.6,
                    }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Content */}
                  <Box
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      padding: '2rem',
                      zIndex: 10,
                    }}
                  >
                    <motion.div
                      animate={{
                        y: hoveredIndex === index ? -8 : 0,
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <Title
                        order={3}
                        size="1.875rem"
                        fw={300}
                        c="white"
                        mb="sm"
                        style={{ letterSpacing: '-0.025em' }}
                      >
                        {service.title}
                      </Title>
                      <Box w={48} h={1} bg="orange.6" mb="md" />
                      <Text size="sm" c="gray.2" fw={300} lh={1.75} lineClamp={2}>
                        {service.description[0]}
                      </Text>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: hoveredIndex === index ? 1 : 0,
                        y: hoveredIndex === index ? 0 : 10,
                      }}
                      transition={{ duration: 0.3 }}
                      style={{ marginTop: '1.5rem' }}
                    >
                      <Button
                        component={Link}
                        to={`/services/${service.slug}`}
                        variant="outline"
                        color="orange.6"
                        size="sm"
                        fw={300}
                        style={{
                          letterSpacing: '0.05em',
                        }}
                        styles={{
                          root: {
                            transition: 'all 0.3s',
                            '&:hover': {
                              backgroundColor: 'var(--mantine-color-orange-6)',
                              color: 'rgb(2 6 23)',
                            },
                          },
                        }}
                      >
                        Explore
                      </Button>
                    </motion.div>
                  </Box>
                </Box>

                <motion.div
                  style={{ marginTop: '1.5rem' }}
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0.7,
                  }}
                >
                  <Text size="sm" c="gray.6" fw={300} lh={1.75}>
                    {service.description[0]}
                  </Text>
                </motion.div>
              </motion.div>
            ))}
          </SimpleGrid>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ marginTop: '6rem' }}
        >
          <Stack align="center" gap="xl">
            <Text size="sm" c="gray.6" fw={300} tt="uppercase" style={{ letterSpacing: '0.15em' }}>
              Ready to elevate your event?
            </Text>
            <Title
              order={2}
              size="clamp(2.25rem, 4vw, 3rem)"
              fw={300}
              ta="center"
              c="var(--mantine-color-text)"
            >
              Let's Create Something{' '}
              <Text component="span" c="orange.6" fw={400} inherit>
                Extraordinary
              </Text>
            </Title>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                color="orange.6"
                size="md"
                fw={300}
                mt="lg"
                px="xl"
                style={{
                  letterSpacing: '0.05em',
                }}
                styles={{
                  root: {
                    transition: 'all 0.3s',
                    '&:hover': {
                      backgroundColor: 'var(--mantine-color-orange-6)',
                      color: 'rgb(2 6 23)',
                    },
                  },
                }}
              >
                Get in Touch
              </Button>
            </motion.div>
          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
}
