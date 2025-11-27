import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { Container, Title, Text, Image, Box, Stack, SimpleGrid, Center } from '@mantine/core';
import servicesData from './constants/servicesData';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    return (
      <Center h="80vh">
        <Text size="xl" c="dimmed">
          Service not found
        </Text>
      </Center>
    );
  }

  return (
    <Box w="100%" bg="var(--mantine-color-body)">
      {/* Hero Section with Background Image */}
      <motion.section
        style={{
          position: 'relative',
          width: '100%',
          height: '500px',
          overflow: 'hidden',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Image */}
        <Box
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <Image
            src={service.mainimage || '/placeholder.svg'}
            alt={service.title}
            h="100%"
            w="100%"
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        </Box>

        {/* Gradient Overlays */}
        <Box
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.3) 100%)',
          }}
        />

        {/* Content Container */}
        <Container
          size="xl"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '3rem 2rem',
          }}
        >
          <Title
            order={1}
            size="3.75rem"
            fw={700}
            c="white"
            mb="md"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              lineHeight: 1.1,
              textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)',
            }}
          >
            {service.title}
          </Title>
        </Container>
      </motion.section>

      {/* Content Section */}
      <Container size="lg" px="xl" py={80}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Stack gap="xl">
            {/* Description Section */}
            <Box>
              <Box
                w={60}
                h={4}
                mb="xl"
                style={{
                  background:
                    'linear-gradient(90deg, var(--mantine-color-gold-6), var(--mantine-color-gold-4))',
                  borderRadius: '2px',
                }}
              />
              <Title order={2} size="2rem" mb="lg" c="gray.9" fw={600}>
                About This Service
              </Title>
              <Stack gap="md">
                {service.description.map((desc, idx) => (
                  <Text key={idx} size="lg" c="gray.7" fw={400} lh={1.8}>
                    {desc}
                  </Text>
                ))}
              </Stack>
            </Box>

            {/* Gallery Section */}
            <Box mt={40}>
              <Title order={2} size="1.75rem" mb="xl" c="gray.9" fw={600}>
                Gallery
              </Title>
              <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
                {service.images.map((img, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.03, y: -5 }}
                    transition={{
                      duration: 0.3,
                      ease: 'easeOut',
                    }}
                  >
                    <Box
                      style={{
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <Image
                        src={img}
                        alt={`${service.title} ${idx + 1}`}
                        h={280}
                        w="100%"
                        style={{
                          objectFit: 'cover',
                        }}
                      />
                    </Box>
                  </motion.div>
                ))}
              </SimpleGrid>
            </Box>
          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
}
