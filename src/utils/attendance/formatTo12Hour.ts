export const formatTo12Hour = (time: string): string => {
  const date = new Date(time);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12; // Convert 0 to 12 for midnight case

  return `${hours.toString().padStart(2, "0")}:${minutes} ${ampm}`;
};
