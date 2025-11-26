// apps/frontend/src/pages/admin/helpers/user.ts

import { Column, Table as TanStackTable } from '@tanstack/react-table';
import { showNotification } from '@mantine/notifications';
import type { User } from 'src/services/api/users';

// PageInfo interface for pagination context
export interface PageInfo {
  page: number;
  limit: number;
  total: number;
}

// Calculate the actual item number based on pagination
const calculateItemNumber = (pageInfo: PageInfo, rowIndex: number): number => {
  return (pageInfo.page - 1) * pageInfo.limit + rowIndex + 1;
};

interface ExportOpts {
  pageInfo?: PageInfo;
  filenameBase?: string;
}

type AnyObj = Record<string, unknown>;
type MaybeDate = string | number | boolean | Date | null | undefined | object;

const NON_EXPORTABLE_IDS = new Set(['select', 'actions']);

const formatCell = (v: MaybeDate): string => {
  if (v === null || v === undefined) return '';
  if (v instanceof Date) return v.toISOString();
  if (typeof v === 'object') {
    try {
      return JSON.stringify(v);
    } catch {
      return String(v);
    }
  }
  return String(v);
};

const csvEscape = (s: string) => (/[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s);

const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

const nowStamp = () => {
  const pad = (n: number) => n.toString().padStart(2, '0');
  const d = new Date();
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}_${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
};

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const getHeaderText = <T>(col: Column<T, unknown>) => {
  switch (col.id) {
    case 'index':
      return '#';
    case 'id':
      return 'User ID';
    case 'firstName':
      return 'First Name';
    case 'lastName':
      return 'Last Name';
    case 'email':
      return 'Email';
    case 'role':
      return 'Role';
    case 'emailVerified':
      return 'Email Verified';
    case 'createdAt':
      return 'Created At';
    case 'updatedAt':
      return 'Updated At';
    default:
      return col.id;
  }
};

/** Mirror your table's cell formatting by column id */
const getExportValue = (
  columnId: string,
  user: User,
  rowIndex: number,
  opts?: ExportOpts
): string => {
  switch (columnId) {
    case 'index': {
      if (opts?.pageInfo) {
        return String(calculateItemNumber(opts.pageInfo, rowIndex));
      }
      return String(rowIndex + 1);
    }
    case 'id':
      return String(user.id ?? '');
    case 'firstName':
      return String(user.firstName ?? '');
    case 'lastName':
      return String(user.lastName);
    case 'email':
      return String(user.email ?? '');
    case 'role':
      return String(user.role ?? '');
    case 'emailVerified':
      return user.email ? 'Yes' : 'No';
    case 'createdAt':
      return user.createdAt ? formatDate(new Date(user.createdAt)) : '';
    case 'updatedAt':
      return user.updatedAt ? formatDate(new Date(user.updatedAt)) : '';
    default: {
      const v = (user as unknown as AnyObj)[columnId] as MaybeDate;
      return formatCell(v);
    }
  }
};

export const exportUsers = async <T extends User>(
  users: T[],
  table: TanStackTable<T>,
  format: 'csv' | 'excel',
  opts?: ExportOpts
) => {
  try {
    const visibleCols = table
      .getAllLeafColumns()
      .filter((c) => c.getIsVisible())
      .filter((c) => {
        if (NON_EXPORTABLE_IDS.has(c.id)) return false;
        // Check if column is marked as non-exportable in meta
        const meta = c.columnDef.meta as { exportable?: boolean } | undefined;
        if (meta?.exportable === false) return false;
        return true;
      });

    const headers = visibleCols.map((col) => getHeaderText(col));
    const columnIds = visibleCols.map((col) => col.id);

    const rows: string[][] = [headers];

    users.forEach((user, i) => {
      const row = columnIds.map((colId) => getExportValue(colId, user, i, opts));
      rows.push(row);
    });

    const filenameBase = opts?.filenameBase ?? `users_${nowStamp()}`;

    if (format === 'csv') {
      const csv = rows.map((r) => r.map(csvEscape).join(',')).join('\n');
      const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' });
      downloadBlob(blob, `${filenameBase}.csv`);

      showNotification({
        title: 'Success',
        message: 'CSV exported successfully',
        color: 'green',
      });
      return;
    }

    // Excel (xlsx)
    const XLSX = await import('xlsx');
    const ws = XLSX.utils.aoa_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Users');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    downloadBlob(blob, `${filenameBase}.xlsx`);

    showNotification({
      title: 'Success',
      message: 'Excel exported successfully',
      color: 'green',
    });
  } catch (error) {
    showNotification({
      title: 'Error',
      message: `Failed to export ${format.toUpperCase()}`,
      color: 'red',
    });
    throw error;
  }
};
