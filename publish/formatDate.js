import dayjs from 'dayjs';

/**
 *
 * @param {string} date
 * @returns {string}
 */
export function formatUntilMinute (date) {
  return nullableDateFormat(date, 'YYYY/MM/DD HH:mm');
}

/**
 *
 * @param {string} date
 * @param {string} format
 * @returns {string}
 */
export function nullableDateFormat (date, format) {
  if (!date) {
    return '';
  }

  return dayjs(date).format(format);
}
