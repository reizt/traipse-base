import { randomBytes } from 'node:crypto';
import { AesCipher } from './aes';

describe(AesCipher.name, () => {
  it('should encrypt and decrypt', async () => {
    const data = 'sample text';
    const key = randomBytes(32);
    const iv = randomBytes(16);
    const cipher = new AesCipher(key, iv);
    const encrypted = await cipher.encrypt(data);
    const decrypted = await cipher.decrypt(encrypted);
    expect(decrypted).toBe(data);
  });
});
