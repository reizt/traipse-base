import type { ICipher } from '#/backend/context/cipher';
import { createCipheriv, createDecipheriv } from 'node:crypto';

export class AesCipher implements ICipher {
  private static readonly ALGORITHM = 'aes-256-cbc';

  constructor(
    private readonly key: Buffer,
    private readonly iv: Buffer,
  ) {}

  async encrypt(data: string): Promise<string> {
    const cipher = createCipheriv(AesCipher.ALGORITHM, this.key, this.iv);
    const buf = Buffer.concat([cipher.update(data), cipher.final()]);
    return buf.toString('base64');
  }

  async decrypt(data: string): Promise<string> {
    const decipher = createDecipheriv(AesCipher.ALGORITHM, this.key, this.iv);
    const buf = Buffer.concat([decipher.update(data, 'base64'), decipher.final()]);
    return buf.toString();
  }
}
