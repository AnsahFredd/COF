import {
  AppShell,
  Burger,
  Group,
  NavLink,
  Text,
  Avatar,
  Menu,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  IconDashboard,
  IconUsers,
  IconCalendarEvent,
  IconTicket,
  IconBell,
  IconLogout,
  IconSettings,
  IconChevronDown,
  IconPhoto,
} from '@tabler/icons-react';
import { useAuth } from 'src/features/authentication';
import { ROUTES } from 'src/constants/routes';

const AdminLayout = () => {
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  const navItems = [
    { label: 'Dashboard', icon: IconDashboard, path: ROUTES.ADMIN.DASHBOARD },
    { label: 'Users', icon: IconUsers, path: ROUTES.ADMIN.USERS },
    { label: 'Events', icon: IconCalendarEvent, path: ROUTES.ADMIN.EVENTS },
    { label: 'Bookings', icon: IconTicket, path: ROUTES.ADMIN.BOOKINGS },
    { label: 'Notifications', icon: IconBell, path: ROUTES.ADMIN.NOTIFICATIONS },
    { label: 'Portfolio', icon: IconPhoto, path: ROUTES.ADMIN.PORTFOLIO },
  ];

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Text size="xl" fw={700}>
              Event Booking Admin
            </Text>
          </Group>

          <Menu shadow="md" width={200}>
            <Menu.Target>
              <UnstyledButton>
                <Group gap="xs">
                  <Avatar color="blue" radius="xl">
                    {user?.firstName?.charAt(0) || 'A'}
                  </Avatar>
                  <div style={{ flex: 1 }}>
                    <Text size="sm" fw={500}>
                      {user?.firstName}
                    </Text>
                    <Text c="dimmed" size="xs">
                      {user?.role}
                    </Text>
                  </div>
                  <IconChevronDown size={16} />
                </Group>
              </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Account</Menu.Label>
              <Menu.Item
                leftSection={<IconSettings size={14} />}
                onClick={() => navigate(ROUTES.ADMIN.SETTINGS)}
              >
                Settings
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item color="red" leftSection={<IconLogout size={14} />} onClick={handleLogout}>
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Text size="xs" fw={700} c="dimmed" mb="md">
          NAVIGATION
        </Text>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            label={item.label}
            leftSection={<item.icon size={20} stroke={1.5} />}
            active={location.pathname === item.path}
            onClick={() => navigate(item.path)}
            mb={4}
          />
        ))}
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default AdminLayout;
