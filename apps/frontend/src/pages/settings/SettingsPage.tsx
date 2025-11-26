import {
  Avatar,
  Button,
  Card,
  Container,
  Divider,
  Group,
  PasswordInput,
  Stack,
  Switch,
  Tabs,
  Text,
  TextInput,
  Title,
  LoadingOverlay,
} from '@mantine/core';
import { IconBell, IconLock, IconUser, IconUpload } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { settingsService } from 'src/services/api/settings';
import { useAuth } from 'src/features/authentication/hooks/useAuth';
import { notifications } from '@mantine/notifications';

const SettingsPage = () => {
  const { user, refreshUser } = useAuth();
  const [activeTab, setActiveTab] = useState<string | null>('general');
  const [loading, setLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [preferences, setPreferences] = useState({
    email: true,
    push: true,
    marketing: false,
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
      });
      if (user.notificationPreferences) {
        setPreferences(user.notificationPreferences);
      }
    }
  }, [user]);

  const handleProfileUpdate = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await settingsService.updateProfile(String(user.id), profileData);
      await refreshUser();
      notifications.show({
        title: 'Success',
        message: 'Profile updated successfully',
        color: 'green',
      });
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to update profile',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      notifications.show({
        title: 'Error',
        message: 'Passwords do not match',
        color: 'red',
      });
      return;
    }
    setLoading(true);
    try {
      await settingsService.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      notifications.show({
        title: 'Success',
        message: 'Password changed successfully',
        color: 'green',
      });
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to change password',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePreferencesUpdate = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await settingsService.updatePreferences(String(user.id), preferences);
      await refreshUser();
      notifications.show({
        title: 'Success',
        message: 'Preferences updated successfully',
        color: 'green',
      });
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to update preferences',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="lg" py="xl">
      <LoadingOverlay visible={loading} />
      <Title order={2} mb="lg">
        Settings
      </Title>

      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List mb="lg">
          <Tabs.Tab value="general" leftSection={<IconUser size={16} />}>
            General
          </Tabs.Tab>
          <Tabs.Tab value="security" leftSection={<IconLock size={16} />}>
            Security
          </Tabs.Tab>
          <Tabs.Tab value="notifications" leftSection={<IconBell size={16} />}>
            Notifications
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="general">
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Stack gap="md">
              <Title order={4}>Profile Information</Title>
              <Group>
                <Avatar size={100} radius={100} src={user?.avatar} color="blue">
                  {user?.firstName?.[0]}
                  {user?.lastName?.[0]}
                </Avatar>
                <Stack gap="xs">
                  <Button variant="light" leftSection={<IconUpload size={16} />}>
                    Upload new picture
                  </Button>
                  <Text size="xs" c="dimmed">
                    JPG, GIF or PNG. Max size of 800K
                  </Text>
                </Stack>
              </Group>

              <Divider my="sm" />

              <Group grow>
                <TextInput
                  label="First Name"
                  placeholder="Your first name"
                  value={profileData.firstName}
                  onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                />
                <TextInput
                  label="Last Name"
                  placeholder="Your last name"
                  value={profileData.lastName}
                  onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                />
              </Group>
              <TextInput
                label="Email"
                placeholder="Your email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              />

              <Group justify="flex-end" mt="md">
                <Button onClick={handleProfileUpdate}>Save Changes</Button>
              </Group>
            </Stack>
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="security">
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Stack gap="md">
              <Title order={4}>Change Password</Title>
              <PasswordInput
                label="Current Password"
                placeholder="Enter current password"
                value={passwordData.currentPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, currentPassword: e.target.value })
                }
              />
              <PasswordInput
                label="New Password"
                placeholder="Enter new password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              />
              <PasswordInput
                label="Confirm New Password"
                placeholder="Confirm new password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                }
              />

              <Group justify="flex-end" mt="md">
                <Button onClick={handlePasswordChange}>Update Password</Button>
              </Group>
            </Stack>
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="notifications">
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Stack gap="lg">
              <Title order={4}>Notification Preferences</Title>

              <Group justify="space-between">
                <div>
                  <Text fw={500}>Email Notifications</Text>
                  <Text size="sm" c="dimmed">
                    Receive emails about new bookings and events
                  </Text>
                </div>
                <Switch
                  checked={preferences.email}
                  onChange={(e) =>
                    setPreferences({ ...preferences, email: e.currentTarget.checked })
                  }
                  size="md"
                />
              </Group>

              <Divider />

              <Group justify="space-between">
                <div>
                  <Text fw={500}>Push Notifications</Text>
                  <Text size="sm" c="dimmed">
                    Receive push notifications on your device
                  </Text>
                </div>
                <Switch
                  checked={preferences.push}
                  onChange={(e) =>
                    setPreferences({ ...preferences, push: e.currentTarget.checked })
                  }
                  size="md"
                />
              </Group>

              <Divider />

              <Group justify="space-between">
                <div>
                  <Text fw={500}>Marketing Emails</Text>
                  <Text size="sm" c="dimmed">
                    Receive emails about new features and updates
                  </Text>
                </div>
                <Switch
                  checked={preferences.marketing}
                  onChange={(e) =>
                    setPreferences({ ...preferences, marketing: e.currentTarget.checked })
                  }
                  size="md"
                />
              </Group>

              <Group justify="flex-end" mt="md">
                <Button onClick={handlePreferencesUpdate}>Save Preferences</Button>
              </Group>
            </Stack>
          </Card>
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};

export default SettingsPage;
