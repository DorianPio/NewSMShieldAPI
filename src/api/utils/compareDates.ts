/**
 * Compares two dates and returns true if the difference between them is at least 24 hours, false otherwise.
 * @param {Date} date1 - The first date to compare.
 * @param {Date} date2 - The second date to compare.
 * @returns {boolean} True if the difference between the two dates is at least 24 hours, false otherwise.
 */

export const compareDates = (date1: Date, date2: Date) => {
  const differenceInMs = date1.getTime() - date2.getTime();
  const differenceInHours = differenceInMs / (1000 * 60 * 60);
  console.log(differenceInHours);
  if (differenceInHours >= 24) {
    return true;
  }
  return false;
};
