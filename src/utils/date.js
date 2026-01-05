import dayjs from 'dayjs';

export const formatDate = (value) => dayjs(value).format('YYYY-MM-DD');

export const isWithinRange = (date, start, end) => {
  const d = dayjs(date);
  const s = start ? dayjs(start) : null;
  const e = end ? dayjs(end) : null;
  if (s && d.isBefore(s, 'day')) return false;
  if (e && d.isAfter(e, 'day')) return false;
  return true;
};