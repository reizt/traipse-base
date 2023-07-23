import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { createApp } from './core/create-app';
import { AesCipher } from './plugins/cipher/aes';
import { createDynamoDbPlugin } from './plugins/dynamodb';
import { SendgridMailer } from './plugins/mailer/sendgrid';
import { JwtSigner } from './plugins/signer/jwt';

export const injectDeps = () => {
  const db = createDynamoDbPlugin({
    dynamodb: new DynamoDBClient({}),
    tableName: process.env.DYNAMODB_TABLE_NAME,
  });
  const signer = new JwtSigner(process.env.JWT_PRIVATE_KEY, process.env.JWT_PUBLIC_KEY);
  const cipher = new AesCipher(Buffer.from(process.env.CIPHER_KEY_BASE64, 'base64'), Buffer.from(process.env.CIPHER_IV_BASE64, 'base64'));
  const mailer = new SendgridMailer(process.env.SENDGRID_API_KEY);

  return createApp({ db, signer, cipher, mailer });
};
