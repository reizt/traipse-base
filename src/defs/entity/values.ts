import { z } from 'zod';

export const id = z.string().regex(/^[\w-]{8}$/);
export const createdAt = z.date();
export const updatedAt = z.date();
