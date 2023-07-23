import { z } from 'zod';
import { createdAt, id, updatedAt } from './values';

export const User = z.object({
  id,
  createdAt,
  updatedAt,
  name: z.string(),
  email: z.string().email(),
});
