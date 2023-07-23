export type ICipher = {
  encrypt: (data: string) => Promise<string>;
  decrypt: (data: string) => Promise<string>;
};
