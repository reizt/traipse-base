/// <reference types="node" />

declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        readonly NODE_ENV: 'development' | 'test' | 'production';
        readonly DYNAMODB_TABLE_NAME: string;
        readonly JWT_PRIVATE_KEY: string;
        readonly JWT_PUBLIC_KEY: string;
        readonly CIPHER_KEY_BASE64: string;
        readonly CIPHER_IV_BASE64: string;
        readonly SENDGRID_API_KEY: string;
        readonly MAILER_FROM: string;
      }
    }
  }
}
