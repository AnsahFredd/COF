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
      <motion.section
        style={{
          position: 'relative',
          width: '100%',
          height: '384px',
          overflow: 'hidden',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src={service.mainimage || '/placeholder.svg'}
          alt={service.title}
          h="100%"
          w="100%"
          fit="cover"
        />
        <Box
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgb(2 6 23) 0%, transparent 100%)',
          }}
        />
        <Box
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'flex-end',
            padding: '3rem',
          }}
        >
          <Title
            order={1}
            size="3.75rem"
            fw={300}
            c="white"
            style={{
              fontSize: 'clamp(3rem, 5vw, 3.75rem)',
            }}
          >
            {service.title}
          </Title>
        </Box>
      </motion.section>

      <Container size="lg" px="xl" py={80}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Stack gap="xl">
            <Box>
              <Box w={48} h={1} bg="orange.6" mb="md" />
              <Stack gap="md">
                {service.description.map((desc, idx) => (
                  <Text key={idx} size="lg" c="gray.7" fw={300} lh={1.75}>
                    {desc}
                  </Text>
                ))}
              </Stack>
            </Box>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md" mt={64}>
              {service.images.map((img, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  transition={{
                    duration: 0.4,
                  }}
                >
                  <Image
                    src={img}
                    alt={`${service.title} ${idx + 1}`}
                    h={256}
                    w="100%"
                    fit="cover"
                    radius="md"
                  />
                </motion.div>
              ))}
            </SimpleGrid>
          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
}
