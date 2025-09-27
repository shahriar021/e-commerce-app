export const timeToDate = (timeStr?: string) => {
  if (!timeStr || typeof timeStr !== "string") {
    return new Date(); // Default to current time instead of null
  }

  const [hours, minutes, seconds] = timeStr.split(":").map(Number);
  if (isNaN(hours) || isNaN(minutes)) return new Date(); // Fallback to current time

  const date = new Date();
  date.setHours(hours, minutes, seconds || 0, 0);
  return date;
};
