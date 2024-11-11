import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { NavRoute } from '@/routes/__root.tsx';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Convert a pathname to a title that can be displayed in the UI.
 * @param pathname The pathname to convert.
 * @param homeTitle The title to use for the home page.
 * @returns The title.
 */
export function pathnameToTitle(pathname: string, homeTitle = 'Home') {
  if (pathname === '/') return homeTitle;

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

export function getPathnameBase(pathname: NavRoute) {
  return '/' + pathname.split('/')[1];
}

/**
 * Generate a random number between a min and max value.
 * @param min The minimum value.
 * @param max The maximum value.
 */
export function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomChoices<T>(choices: T[], numberOfChoices: number = 1) {
  const chosenValues: T[] = [];
  const values = [...choices];
  for (let i = 0; i < numberOfChoices; i++) {
    const randomIndex = randomNumber(0, values.length - 1);
    chosenValues.push(values[randomIndex]);
    values.splice(randomIndex, 1);
  }
  return chosenValues;
}
