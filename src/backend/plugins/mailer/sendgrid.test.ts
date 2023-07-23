import { SendgridMailer } from './sendgrid';

describe(SendgridMailer.name, () => {
  const mailer = new SendgridMailer(process.env.SENDGRID_API_KEY);
  it('should send email', async () => {
    await mailer.sendCode('sub1.reizt.dev@gmail.com', { code: 'XXXYYY' });
    expect(true).toBe(true);
  });
});
