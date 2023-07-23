import { newId } from '#/backend/core/modules/identify';
import type { CoreFun } from '#/backend/core/types';
import type { TMod } from '#/defs/entity';

export const VerifyLogin: CoreFun<'VerifyLogin'> = async (input, ctx) => {
  const session = await ctx.signer.verify(input.authToken);
  if (session.type !== 'verify') {
    throw new Error('session not found');
  }

  const code = await ctx.cipher.decrypt(session.encryptedCode);
  if (input.code !== code) {
    throw new Error('invalid code');
  }

  let user: TMod.User | null;
  user = await ctx.db.users.findByEmail({
    where: { email: session.email },
  });
  if (user == null) {
    user = await ctx.db.users.create({
      data: {
        id: newId(),
        email: session.email,
        name: '',
      },
    });
  }
  console.log(user);

  const authToken = await ctx.signer.sign({ type: 'login', userId: user.id });
  return { authToken };
};
