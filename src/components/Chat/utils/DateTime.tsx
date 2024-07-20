export function extractDate(dateTime: string) {
  const dateObject = new Date(dateTime);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  return dateObject.toLocaleDateString([], options);
}
export function extractTime(dateTime: string) {
  const dateObject = new Date(dateTime);
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };
  return dateObject.toLocaleTimeString([], options);
}
