import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}




export function timeAgo(timestampInSeconds) {
  const currentTime = new Date().getTime(); // Current time in milliseconds
  const postTime = timestampInSeconds * 1000; // Convert post time to milliseconds
  const difference = currentTime - postTime;

  // Define time periods in milliseconds
  const seconds = 1000;
  const minutes = seconds * 60;
  const hours = minutes * 60;
  const days = hours * 24;
  const weeks = days * 7;
  const months = days * 30; // Roughly
  const years = days * 365; // Roughly

  if (difference < seconds) {
    return 'just now';
  } else if (difference < minutes) {
    return `${Math.floor(difference / seconds)} seconds ago`;
  } else if (difference < hours) {
    return `${Math.floor(difference / minutes)} minutes ago`;
  } else if (difference < days) {
    return `${Math.floor(difference / hours)} hours ago`;
  } else if (difference < weeks) {
    return `${Math.floor(difference / days)} days ago`;
  } else if (difference < months) {
    return `${Math.floor(difference / weeks)} weeks ago`;
  } else if (difference < years) {
    return `${Math.floor(difference / months)} months ago`;
  } else {
    return `${Math.floor(difference / years)} years ago`;
  }
}