// export function getLiveTime(): string {
//   const now = new Date();
//   let hours = now.getHours();
//   const minutes = now.getMinutes();
//   const seconds = now.getSeconds();
//   const ampm = hours >= 12 ? "PM" : "AM";

//   hours = hours % 12 || 12; // Convert 0 to 12
//   const formattedMinutes = minutes.toString().padStart(2, "0");
//   const formattedSeconds = seconds.toString().padStart(2, "0");

//   return `${hours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
// }

export function getLiveTime(): string {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12; // Convert 0 to 12
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${hours}:${formattedMinutes} ${ampm}`;
}
