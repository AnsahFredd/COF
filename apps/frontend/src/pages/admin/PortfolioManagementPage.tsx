import {
  Box,
  Button,
  Card,
  FileInput,
  Grid,
  Group,
  Image,
  LoadingOverlay,
  Modal,
  Paper,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
  ActionIcon,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconTrash, IconUpload, IconPhoto } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { portfolioService, type PortfolioItem } from 'src/services/api';

const PortfolioManagementPage = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<PortfolioItem | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      category: '',
      image: null as File | null,
    },
    validate: {
      title: (value) => (!value ? 'Title is required' : null),
      image: (value) => (!value ? 'Image is required' : null),
    },
  });

  const fetchPortfolioItems = async () => {
    setLoading(true);
    try {
      const items = await portfolioService.getPortfolioItems();
      setPortfolioItems(items);
    } catch (error) {
      showNotification({
        title: 'Error',
        message: 'Failed to fetch portfolio items',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolioItems();
  }, []);

  const handleImageChange = (file: File | null) => {
    form.setFieldValue('image', file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (values: typeof form.values) => {
    if (!values.image) return;

    setUploading(true);
    try {
      await portfolioService.createPortfolioItem({
        title: values.title,
        description: values.description || undefined,
        category: values.category || undefined,
        image: values.image,
      });

      showNotification({
        title: 'Success',
        message: 'Portfolio item uploaded successfully',
        color: 'green',
      });

      form.reset();
      setImagePreview(null);
      fetchPortfolioItems();
    } catch (error) {
      showNotification({
        title: 'Error',
        message: 'Failed to upload portfolio item',
        color: 'red',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteClick = (item: PortfolioItem) => {
    setItemToDelete(item);
    setDeleteModalOpened(true);
  };

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;

    try {
      await portfolioService.deletePortfolioItem(itemToDelete.id);
      showNotification({
        title: 'Success',
        message: 'Portfolio item deleted successfully',
        color: 'green',
      });
      fetchPortfolioItems();
    } catch (error) {
      showNotification({
        title: 'Error',
        message: 'Failed to delete portfolio item',
        color: 'red',
      });
    } finally {
      setDeleteModalOpened(false);
      setItemToDelete(null);
    }
  };

  return (
    <Box>
      <Title order={2} mb="lg">
        Portfolio Management
      </Title>

      {/* Upload Form */}
      <Paper shadow="sm" p="lg" mb="xl" withBorder>
        <Title order={3} mb="md">
          Upload New Portfolio Item
        </Title>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextInput
                  label="Title"
                  placeholder="Enter portfolio item title"
                  required
                  {...form.getInputProps('title')}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextInput
                  label="Category"
                  placeholder="e.g., Weddings, Corporate, etc."
                  {...form.getInputProps('category')}
                />
              </Grid.Col>
            </Grid>

            <Textarea
              label="Description"
              placeholder="Enter a description (optional)"
              minRows={3}
              {...form.getInputProps('description')}
            />

            <FileInput
              label="Image"
              placeholder="Select an image"
              accept="image/*"
              required
              leftSection={<IconPhoto size={16} />}
              onChange={handleImageChange}
              value={form.values.image}
              error={form.errors.image}
            />

            {imagePreview && (
              <Box>
                <Text size="sm" fw={500} mb="xs">
                  Preview:
                </Text>
                <Image
                  src={imagePreview}
                  alt="Preview"
                  h={200}
                  w="auto"
                  fit="contain"
                  radius="md"
                />
              </Box>
            )}

            <Group justify="flex-end">
              <Button type="submit" loading={uploading} leftSection={<IconUpload size={16} />}>
                Upload Portfolio Item
              </Button>
            </Group>
          </Stack>
        </form>
      </Paper>

      {/* Portfolio Grid */}
      <Paper shadow="sm" p="lg" withBorder pos="relative">
        <LoadingOverlay visible={loading} />
        <Title order={3} mb="md">
          Portfolio Items ({portfolioItems.length})
        </Title>

        {portfolioItems.length === 0 ? (
          <Text c="dimmed" ta="center" py="xl">
            No portfolio items yet. Upload your first item above!
          </Text>
        ) : (
          <Grid>
            {portfolioItems.map((item) => (
              <Grid.Col key={item.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Card.Section>
                    <Image src={item.imageUrl} height={200} alt={item.title} fit="cover" />
                  </Card.Section>

                  <Stack gap="xs" mt="md">
                    <Text fw={500} lineClamp={1}>
                      {item.title}
                    </Text>
                    {item.description && (
                      <Text size="sm" c="dimmed" lineClamp={2}>
                        {item.description}
                      </Text>
                    )}
                    {item.category && (
                      <Text size="xs" c="blue">
                        {item.category}
                      </Text>
                    )}
                  </Stack>

                  <Group justify="flex-end" mt="md">
                    <ActionIcon color="red" variant="light" onClick={() => handleDeleteClick(item)}>
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Group>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        )}
      </Paper>

      {/* Delete Confirmation Modal */}
      <Modal
        opened={deleteModalOpened}
        onClose={() => setDeleteModalOpened(false)}
        title="Confirm Deletion"
      >
        <Text mb="md">
          Are you sure you want to delete "{itemToDelete?.title}"? This action cannot be undone.
        </Text>
        <Group justify="flex-end">
          <Button variant="default" onClick={() => setDeleteModalOpened(false)}>
            Cancel
          </Button>
          <Button color="red" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Group>
      </Modal>
    </Box>
  );
};

export default PortfolioManagementPage;
