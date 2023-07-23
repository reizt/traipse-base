import type { z } from 'zod';
import type * as s from './schema';

export type User = z.infer<typeof s.User>;
