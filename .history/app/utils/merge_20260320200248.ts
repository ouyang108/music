import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 合并 Tailwind 类名，解决冲突并支持条件逻辑
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
