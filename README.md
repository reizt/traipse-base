# 🎯 Callable REST

Only you have to do is to define the endpoints and write your business logics!

## When you want to add an endpoint

1. Create a file: `src/defs/procedures/CreateTask.ts`

```ts
import { z } from 'zod';
import type { Procedure } from '../lib/procedure';

export const CreateTask = {
  method: 'post',
  path: '/tasks',
  request: {
    cookies: z.object({ authToken: z.string() }),
    body: z.object({
      title: z.string(),
      description: z.string().optional(),
    }),
  },
  response: {
    successCode: 201,
    body: z.object({
      id: z.string(),
      title: z.string(),
      description: z.string().optional(),
      completed: z.boolean(),
    }),
  },
} satisfies Procedure;
```

2. Append a line in `src/defs/extend/procedures.ts`

```ts
export { CreateTask } from '../procedures/CreateTask';
```

3. Create a file: `src/backend/core/funcs/CreateTask.fun.ts`

```ts
import type { CoreFun } from '#/backend/core/types';

export const CreateTask: CoreFun<'CreateTask'> = async (input, ctx) => {
  // Create new task
  return {
    id: '123',
    title: input.title,
    description: input.description,
    completed: false,
  };
};
```

4. Append a line in `src/backend/core/create-app.ts`

```ts
// ...
import { CreateTask } from './funcs/CreateTask.fun';
// ...

export const createApp = (ctx: Context): App<typeof defs> => {
  return {
    // ...
    CreateTask: inject<'CreateTask'>(CreateTask, ctx),
  };
};
```
