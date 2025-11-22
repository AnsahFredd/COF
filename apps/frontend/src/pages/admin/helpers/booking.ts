import { Column, Table as TanStackTable } from '@tanstack/react-table';
import { showNotification } from '@mantine/notifications';
import type { Booking } from 'src/services/api/bookings';
import { formatDate } from './index';

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

const NON_EXPORTABLE_IDS = new Set(['select', 'actions', 'eventDetails']);

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
    case 'id':
      return 'Booking ID';
    case 'eventType':
      return 'Event Type';
    case 'eventDate':
      return 'Event Date';
    case 'eventLocation':
      return 'Event Location';
    case 'budget':
      return 'Budget';
    case 'status':
      return 'Status';
    case 'createdAt':
      return 'Created At';
    default:
      return col.id;
  }
};

/** Mirror your table's cell formatting by column id */
const getExportValue = (
  columnId: string,
  booking: Booking,
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
      return String(booking.id ?? '');
    case 'eventType':
      return String(booking.eventType ?? '');
    case 'eventDate':
      return booking.eventDate ? formatDate(new Date(booking.eventDate)) : '';
    case 'eventLocation':
      return String(booking.eventLocation ?? '');
    case 'budget':
      return String(booking.budget ?? 'N/A');
    case 'status':
      return String(booking.status ?? '');
    case 'createdAt':
      return booking.createdAt ? formatDate(new Date(booking.createdAt)) : '';
    default: {
      const v = (booking as AnyObj)[columnId];
      return formatCell(v);
    }
  }
};

export const exportBookings = async <T extends Booking>(
  bookings: T[],
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

    bookings.forEach((booking, i) => {
      const row = columnIds.map((colId) => getExportValue(colId, booking, i, opts));
      rows.push(row);
    });

    const filenameBase = opts?.filenameBase ?? `bookings_${nowStamp()}`;

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
    XLSX.utils.book_append_sheet(wb, ws, 'Bookings');
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
