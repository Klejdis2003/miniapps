import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { NavRoute } from '@/routes/__root.tsx';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Convert a pathname to a title that can be displayed in the UI.
 * @param pathname The pathname to convert.
 * @returns The title.
 */
export function pathnameToTitle(pathname: string) {
  if (pathname === '/') return 'Home';

  const name = (pathname as string).replaceAll('/', '');
  return capitalizeAllWords(dashesToSpaces(name));
}

export function dashesToSpaces(text: string) {
  return text.replace(/-/g, ' ');
}

export function capitalizeAllWords(text: string) {
  return text
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
