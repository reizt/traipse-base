export type AppSession = Readonly<
  | {
      type: 'verify';
      email: string;
      encryptedCode: string;
    }
  | {
      type: 'login';
      userId: string;
    }
>;
