import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}



export const getInitials = (name?: string | null) => {
  if (!name) return "";
  let ini = name.split(" ");
  if (ini.length === 1) return ini[0][0];
  return ini[0][0] + ini[1][0];
};
