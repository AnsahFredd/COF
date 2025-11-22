import { Title, Card, LoadingOverlay, Grid } from '@mantine/core';
import { IconUsers, IconTicket, IconCalendarEvent, IconCurrencyDollar } from '@tabler/icons-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { StatCard } from './components/StatCard';
import { formatCurrency } from './helpers';
import { useApi } from './hooks/useApi';
import { dashboardService } from 'src/services/api/dashboard';

const DashboardPage = () => {
  const { data: stats, loading: statsLoading } = useApi(() => dashboardService.getStats());
  const { data: chartData, loading: chartLoading } = useApi(() => dashboardService.getChartData());

  return (
    <div className="page-container">
      <Title order={2} mb="lg">
        Dashboard
      </Title>

      <Grid>
        <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Total Users"
            value={statsLoading ? '...' : String(stats?.totalUsers ?? 0)}
            icon={IconUsers}
            color="blue"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Total Bookings"
            value={statsLoading ? '...' : String(stats?.totalBookings ?? 0)}
            icon={IconTicket}
            color="green"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Total Events"
            value={statsLoading ? '...' : String(stats?.totalEvents ?? 0)}
            icon={IconCalendarEvent}
            color="violet"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Total Revenue"
            value={statsLoading ? '...' : formatCurrency(stats?.totalRevenue || 0)}
            icon={IconCurrencyDollar}
            color="orange"
          />
        </Grid.Col>
      </Grid>

      <Grid mt="xl">
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder pos="relative">
            <Title order={4} mb="md">
              Bookings Overview
            </Title>
            {chartLoading ? (
              <LoadingOverlay visible={true} />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData ?? []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Line type="monotone" dataKey="bookings" stroke="#228be6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder pos="relative">
            <Title order={4} mb="md">
              Revenue Overview
            </Title>
            {chartLoading ? (
              <LoadingOverlay visible={true} />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData ?? []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#40c057" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </Card>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default DashboardPage;
