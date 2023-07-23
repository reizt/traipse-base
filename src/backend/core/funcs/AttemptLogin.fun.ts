import { newCode } from '#/backend/core/modules/identify';
import type { CoreFun } from '#/backend/core/types';

export const AttemptLogin: CoreFun<'AttemptLogin'> = async (input, ctx) => {
  const code = newCode();
  await ctx.mailer.sendCode(input.email, { code });
  const encryptedCode = await ctx.cipher.encrypt(code);
  const authToken = await ctx.signer.sign({ type: 'verify', email: input.email, encryptedCode });
  return { authToken };
};
