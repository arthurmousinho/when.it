import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;

  const units = ['KB', 'MB', 'GB', 'TB'];
  let unitIndex = 0;
  let value = bytes / 1024;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex++;
  }

  return `${value.toFixed(2)} ${units[unitIndex]}`;

}

export function formatDate(date: string) {
  const dateTime = new Date(date);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  let formattedDate = dateTime.toLocaleString("pt-BR", options).replace(",", "");

  formattedDate = formattedDate.replace(/\b(\w+)\./g, "$1");

  formattedDate = formattedDate.replace(/\b(\w+)\b/g, (match) =>
    match.charAt(0).toUpperCase() + match.slice(1)
  );

  return formattedDate;
  
}

export function getInitials(name: string): string {
  const initials = name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('')

  return initials
}