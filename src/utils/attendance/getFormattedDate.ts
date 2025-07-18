export function getFormattedDate(): string {
  const now = new Date();

  // Month names in short format
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Day names
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const month = monthNames[now.getMonth()];
  const day = now.getDate().toString().padStart(2, "0"); // Ensures two-digit format
  const year = now.getFullYear();
  const weekday = dayNames[now.getDay()];

  return `${month} ${day}, ${year} - ${weekday}`;
}
