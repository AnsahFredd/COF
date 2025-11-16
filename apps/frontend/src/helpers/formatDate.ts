// File: helpers/dateUtils.js

/**
 * @typedef {Object} FormatOptions
 * @property {"short"|"long"|"dateOnly"|"timeOnly"} [format="short"]
 * @property {boolean} [includeTime=false]
 * @property {boolean} [use24Hour=false]
 * @property {string} [timezone] - Example: "Africa/Accra"
 */

/**
 * Formats a date into a readable string.
 *
 * @param {string|number|Date} date - The raw input date.
 * @param {FormatOptions} [options={}] - Formatting configurations.
 * @returns {string}
 */

export const formatDate = (date: string, options = {}) => {
  const opts = {
    format: 'short',
    includeTime: false,
    use24Hour: false,
    timezone: undefined,
    ...options,
  };

  const { format, includeTime, use24Hour, timezone } = opts;

  const d = new Date(date);
  if (isNaN(d.getTime())) {
    throw new Error('Invalid date provided to formatDate()');
  }

  // Apply timezone if provided
  const dt = timezone ? new Date(d.toLocaleString('en-US', { timeZone: timezone })) : d;

  const day = dt.getDate().toString().padStart(2, '0');
  const monthIndex = dt.getMonth();
  const year = dt.getFullYear();

  const monthsShort = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const monthsLong = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  let hours = dt.getHours();
  const minutes = dt.getMinutes().toString().padStart(2, '0');

  let period = '';
  if (!use24Hour) {
    period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // 0 → 12
  }

  const hoursFormatted = hours.toString().padStart(2, '0');

  const timeString = use24Hour ? `${hoursFormatted}:${minutes}` : `${hours}:${minutes} ${period}`;

  switch (format) {
    case 'long':
      return includeTime
        ? `${day} ${monthsLong[monthIndex]} ${year}, ${timeString}`
        : `${day} ${monthsLong[monthIndex]} ${year}`;

    case 'dateOnly':
      return `${year}-${(monthIndex + 1).toString().padStart(2, '0')}-${day}`;

    case 'timeOnly':
      return timeString;

    case 'short':
    default:
      return includeTime
        ? `${day} ${monthsShort[monthIndex]} ${year}, ${timeString}`
        : `${day} ${monthsShort[monthIndex]} ${year}`;
  }
};
