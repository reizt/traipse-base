import type { Context } from '#/backend/context';
import type * as defs from '#/defs/extend/procedures';
import { AttemptLogin } from './funcs/AttemptLogin.fun';
import { GetCurrentUser } from './funcs/GetCurrentUser.fun';
import { LogOut } from './funcs/LogOut.fun';
import { VerifyLogin } from './funcs/VerifyLogin.fun';
import type { App, InferIn, InferOut } from './types.extend';

type ProcedureId = keyof typeof defs;

type WithContext<O extends ProcedureId> = (input: InferIn<(typeof defs)[O]>, ctx: Context) => Promise<InferOut<(typeof defs)[O]>>;
type WithoutContext<O extends ProcedureId> = (input: InferIn<(typeof defs)[O]>) => Promise<InferOut<(typeof defs)[O]>>;

type Inject = <O extends ProcedureId>(handler: WithContext<O>, ctx: Context) => WithoutContext<O>;
const inject: Inject = (handler, ctx) => {
  return async (input) => await handler(input, ctx);
};

export const createApp = (ctx: Context): App<typeof defs> => {
  return {
    AttemptLogin: inject<'AttemptLogin'>(AttemptLogin, ctx),
    GetCurrentUser: inject<'GetCurrentUser'>(GetCurrentUser, ctx),
    VerifyLogin: inject<'VerifyLogin'>(VerifyLogin, ctx),
    LogOut: inject<'LogOut'>(LogOut, ctx),
  };
};
