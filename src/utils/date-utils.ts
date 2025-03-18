/**
 * Returns the start and end of a day in UTC time
 * @param date The date to get the day range for (defaults to current date)
 * @returns Object containing startOfDay and endOfDay timestamps
 */
export const getUTCDayRange = (
  date: Date = new Date(),
): { startOfDay: Date; endOfDay: Date } => {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();

  const startOfDay = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));
  const endOfDay = new Date(Date.UTC(year, month, day, 23, 59, 59, 999));

  return { startOfDay, endOfDay };
};
