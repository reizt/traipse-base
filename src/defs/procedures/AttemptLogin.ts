import { z } from 'zod';
import { User } from '../entity/schema';
import type { Procedure } from '../lib/procedure';

export const AttemptLogin = {
  method: 'post',
  path: '/attempt-login',
  request: {
    body: z.object({
      email: User.shape.email,
    }),
  },
  response: {
    successCode: 204,
    cookies: z.object({ authToken: z.string() }),
  },
} satisfies Procedure;
