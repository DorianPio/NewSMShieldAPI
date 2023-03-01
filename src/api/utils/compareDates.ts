export const compareDates = (date1: Date, date2: Date) => {
  const differenceInMs = date1.getTime() - date2.getTime();
  const differenceInHours = differenceInMs / (1000 * 60 * 60);
  console.log(differenceInHours);
  if (differenceInHours >= 24) {
    return true;
  }
  return false;
};
