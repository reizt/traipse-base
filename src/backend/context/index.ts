import type { ICipher } from './cipher';
import type { IDatabase } from './database';
import type { IMailer } from './mailer';
import type { ISigner } from './signer';

export type Context = {
  db: IDatabase;
  signer: ISigner;
  cipher: ICipher;
  mailer: IMailer;
};
