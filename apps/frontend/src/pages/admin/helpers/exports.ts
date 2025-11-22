import { Column, Table as TanStackTable } from '@tanstack/react-table';
import { showNotification } from '@mantine/notifications';
import type { Event } from 'src/services/api/events';
import { formatDate } from './index';
import { formatCurrency } from './index';

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

type AnyObj = Record<string, any>;
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

const getHeaderText = <T extends AnyObj>(col: Column<T, unknown>) => {
  switch (col.id) {
    case 'index':
      return '#';
    case 'fullName':
      return 'Name';
    case 'email':
      return 'Email';
    case 'phone':
      return 'Phone';
    case 'eventType':
      return 'Event Type';
    case 'eventDate':
      return 'Event Date';
    case 'eventLocation':
      return 'Location';
    case 'guestCount':
      return 'Guests';
    case 'budget':
      return 'Budget';
    case 'status':
      return 'Status';
    case 'preferredContactMethod':
      return 'Preferred Contact';
    case 'message':
      return 'Message';
    case 'createdAt':
      return 'Created At';
    default:
      return col.id;
  }
};

/** Mirror your table's cell formatting by column id */
const getExportValue = (
  columnId: string,
  event: Event,
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
    case 'fullName':
      return String(event.fullName ?? '');
    case 'email':
      return String(event.email ?? '');
    case 'phone':
      return String(event.phone ?? '');
    case 'eventType':
      return String(event.eventType?.replaceAll('_', ' ') ?? '');
    case 'eventDate':
      return event.eventDate ? formatDate(new Date(event.eventDate)) : '';
    case 'eventLocation':
      return String(event.eventLocation ?? '');
    case 'guestCount':
      return String(event.guestCount ?? 'N/A');
    case 'budget': {
      if (!event.budget) return 'N/A';
      const budgetNum = parseFloat(event.budget);
      return !isNaN(budgetNum) ? formatCurrency(budgetNum) : 'N/A';
    }
    case 'status':
      return String(event.status ?? '');
    case 'preferredContactMethod':
      return String(event.preferredContactMethod ?? '');
    case 'message':
      return String(event.message ?? '');
    case 'createdAt':
      return event.createdAt ? formatDate(new Date(event.createdAt)) : '';
    default: {
      const v = (event as AnyObj)[columnId];
      return formatCell(v);
    }
  }
};

export const exportEvents = async <T extends Event>(
  events: T[],
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

    events.forEach((event, i) => {
      const row = columnIds.map((colId) => getExportValue(colId, event, i, opts));
      rows.push(row);
    });

    const filenameBase = opts?.filenameBase ?? `customer_events_${nowStamp()}`;

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
    XLSX.utils.book_append_sheet(wb, ws, 'Customer Events');
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
