import type { IDatabase, Users } from '#/backend/context/database';
import type { DynamodbContext } from './types';
import { createUser, findUserByEmail, findUserById, removeUser, updateUser } from './users.repo';

export const createDynamoDbPlugin = (ctx: DynamodbContext): IDatabase => {
  const users: Users._Repository = {
    findById: async (args) => await findUserById(ctx, args),
    findByEmail: async (args) => await findUserByEmail(ctx, args),
    create: async (args) => await createUser(ctx, args),
    update: async (args) => await updateUser(ctx, args),
    remove: async (args) => await removeUser(ctx, args),
  };

  return {
    users,
  };
};
