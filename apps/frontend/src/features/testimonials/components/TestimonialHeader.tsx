import { Group, Stack, Title, Text } from '@mantine/core';
import { Sparkles } from 'lucide-react';
import { SectionHeaderProps } from '../interface';
import { getTitleGradient } from '../helpers';

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, badge }) => {
  return (
    <Stack align="center" gap="md" mb="lg">
      <Group gap="xs" c="gold.6">
        <Sparkles size={20} />
        <Text size="sm" fw={600} tt="uppercase" style={{ letterSpacing: 1 }}>
          {badge}
        </Text>
      </Group>
      <Title order={1} size="2.5rem" ta="center" fw={700} style={getTitleGradient()}>
        {title}
      </Title>
      <Text size="lg" c="dimmed" ta="center" maw={600}>
        {subtitle}
      </Text>
    </Stack>
  );
};
