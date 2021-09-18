import { nanoid } from 'nanoid';

/**
 *
 * @returns Generates unique slug
 */
export function generateSlug(): string {
  return nanoid(10);
}
