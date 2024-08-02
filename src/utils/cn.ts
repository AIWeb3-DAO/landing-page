import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const  openLinkInNewTab = (url: string) => {
  window.open(url, '_blank');
}
