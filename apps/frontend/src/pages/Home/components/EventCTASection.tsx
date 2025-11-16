import { Container, Button, Paper, Text, Group, Stack, Title, SimpleGrid } from '@mantine/core';
import {
  IconCalendar,
  IconMail,
  IconHeart,
  IconAward,
  IconUsers,
  IconSparkles,
  IconTarget,
  IconEye,
} from '@tabler/icons-react';
import styles from './EventCTA.module.css';

export const EventCTASection = () => {
  return (
    <div className={styles.wrapper}>
      <Container size="xl">
        {/* Header Section */}
        <div className={styles.headerSection}>
          <Title order={1} className={styles.mainTitle}>
            What Drives Us
          </Title>
          <Text className={styles.mainSubtitle}>
            We're more than event planners—we're dream makers committed to excellence, creativity,
            and creating moments that last a lifetime.
          </Text>
        </div>

        {/* Mission, Vision & Values Grid */}
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" className={styles.contentGrid}>
          {/* Mission */}
          <Paper className={styles.contentCard} radius="xl" shadow="md">
            <div className={styles.iconBox}>
              <IconTarget size={32} />
            </div>
            <Title order={2} className={styles.cardTitle}>
              Our Mission
            </Title>
            <Text className={styles.cardText}>
              To create extraordinary events that exceed expectations and leave lasting impressions.
              We're dedicated to transforming your vision into reality through meticulous planning,
              creative innovation, and unwavering attention to detail.
            </Text>
          </Paper>

          {/* Vision */}
          <Paper className={styles.contentCard} radius="xl" shadow="md">
            <div className={styles.iconBox}>
              <IconEye size={32} />
            </div>
            <Title order={2} className={styles.cardTitle}>
              Our Vision
            </Title>
            <Text className={styles.cardText}>
              To be recognized as the premier event planning company that sets the standard for
              creativity, excellence, and client satisfaction. We envision a world where every
              celebration is a work of art.
            </Text>
          </Paper>

          {/* Core Values Preview */}
          <Paper className={styles.contentCard} radius="xl" shadow="md">
            <div className={styles.iconBox}>
              <IconHeart size={32} />
            </div>
            <Title order={2} className={styles.cardTitle}>
              Core Values
            </Title>
            <Stack gap="sm" className={styles.valuesList}>
              <Group gap="xs">
                <IconSparkles size={18} className={styles.valueIcon} />
                <Text size="sm" fw={600}>
                  Passion & Excellence
                </Text>
              </Group>
              <Group gap="xs">
                <IconUsers size={18} className={styles.valueIcon} />
                <Text size="sm" fw={600}>
                  Client-Focused
                </Text>
              </Group>
              <Group gap="xs">
                <IconSparkles size={18} className={styles.valueIcon} />
                <Text size="sm" fw={600}>
                  Creativity & Innovation
                </Text>
              </Group>
              <Group gap="xs">
                <IconAward size={18} className={styles.valueIcon} />
                <Text size="sm" fw={600}>
                  Integrity & Trust
                </Text>
              </Group>
            </Stack>
          </Paper>
        </SimpleGrid>

        {/* Bottom CTA */}
        <Paper className={styles.bottomCta} radius="xl" shadow="lg">
          <Stack align="center" gap="lg">
            <Title order={2} className={styles.bottomTitle}>
              Ready to Start Planning?
            </Title>
            <Text className={styles.bottomSubtitle}>
              Join hundreds of satisfied clients who trusted us with their special moments. Let's
              create something amazing together!
            </Text>
            <Group gap="md" className={styles.buttonGroup}>
              <Button
                size="xl"
                radius="xl"
                className={styles.primaryButton}
                leftSection={<IconCalendar size={20} />}
              >
                Book Your Event
              </Button>
              <Button
                size="xl"
                radius="xl"
                variant="outline"
                className={styles.secondaryButton}
                leftSection={<IconMail size={20} />}
              >
                Get a Quote
              </Button>
            </Group>
          </Stack>
        </Paper>
      </Container>
    </div>
  );
};
