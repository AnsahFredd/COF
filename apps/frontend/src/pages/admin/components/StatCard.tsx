import { ActionIcon, Card, Group, Text } from '@mantine/core';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<{ size: number }>;
  color: string;
}

export const StatCard = ({ title, value, icon: Icon, color }: StatCardProps) => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className="stat-card"
      style={{
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow =
          '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--mantine-shadow-sm)';
      }}
    >
      <Group justify="space-between" align="flex-start">
        <div>
          <Text size="xs" c="dimmed" tt="uppercase" fw={700} mb={4}>
            {title}
          </Text>
          <Text size="xl" fw={700} style={{ lineHeight: 1 }}>
            {value}
          </Text>
        </div>
        <ActionIcon size={48} radius="md" variant="light" color={color} style={{ opacity: 0.8 }}>
          <Icon size={24} />
        </ActionIcon>
      </Group>
    </Card>
  );
};
