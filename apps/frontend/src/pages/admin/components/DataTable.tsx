import { LoadingOverlay, ActionIcon, Group, Table, ScrollArea, Text } from '@mantine/core';
import { IconEye, IconEdit, IconTrash } from '@tabler/icons-react';

interface DataTableProps<T> {
  columns: {
    key: string;
    label: string;
    render?: (row: T) => React.ReactNode;
  }[];
  data: T[];
  loading: boolean;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  onView?: (row: T) => void;
}

export const DataTable = <T extends { id: string | number }>({
  columns,
  data,
  loading,
  onEdit,
  onDelete,
  onView,
}: DataTableProps<T>) => {
  return (
    <div style={{ position: 'relative', minHeight: 200 }}>
      <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
      <ScrollArea>
        <Table verticalSpacing="sm" striped highlightOnHover className="data-table">
          <Table.Thead>
            <Table.Tr>
              {columns.map((col) => (
                <Table.Th key={col.key} style={{ whiteSpace: 'nowrap' }}>
                  {col.label}
                </Table.Th>
              ))}
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data.length > 0 ? (
              data.map((row) => (
                <Table.Tr key={row.id}>
                  {columns.map((col) => (
                    <Table.Td key={col.key}>
                      {col.render ? (
                        col.render(row)
                      ) : (
                        <Text size="sm">{(row as any)[col.key]}</Text>
                      )}
                    </Table.Td>
                  ))}
                  <Table.Td>
                    <Group gap="xs">
                      {onView && (
                        <ActionIcon variant="subtle" color="blue" onClick={() => onView(row)}>
                          <IconEye size={18} />
                        </ActionIcon>
                      )}
                      {onEdit && (
                        <ActionIcon variant="subtle" color="yellow" onClick={() => onEdit(row)}>
                          <IconEdit size={18} />
                        </ActionIcon>
                      )}
                      {onDelete && (
                        <ActionIcon variant="subtle" color="red" onClick={() => onDelete(row)}>
                          <IconTrash size={18} />
                        </ActionIcon>
                      )}
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))
            ) : (
              <Table.Tr>
                <Table.Td colSpan={columns.length + 1}>
                  <Text ta="center" c="dimmed" py="xl">
                    No data found
                  </Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </div>
  );
};
