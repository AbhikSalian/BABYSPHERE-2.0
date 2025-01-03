export function formatDateTime(dateInput: Date | string): string {
  // Ensure the input is a valid Date object
  let date: Date;
  if (dateInput instanceof Date) {
    date = dateInput;
  } else {
    date = new Date(dateInput);
  }

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  // Format the date and time
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Kolkata", // Set the time zone to IST
  });

  return `${formattedDate} at ${formattedTime}`;
}
