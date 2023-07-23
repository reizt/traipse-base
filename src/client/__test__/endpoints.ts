import { AttemptLogin } from '#/defs/procedures/AttemptLogin';
import { GetCurrentUser } from '#/defs/procedures/GetCurrentUser';
import { LogOut } from '#/defs/procedures/LogOut';
import { VerifyLogin } from '#/defs/procedures/VerifyLogin';
import { callApi } from '../api';

describe('endpoints', () => {
  describe('AttemptLogin', () => {
    it('works', async () => {
      await callApi(AttemptLogin, { email: 'foo@example.com' });
    });
  });
  describe('GetCurrentUser', () => {
    it('works', async () => {
      const currentUser = await callApi(GetCurrentUser, {});
      expect(currentUser).toEqual({});
    });
  });
  describe('LogOut', () => {
    it('works', async () => {
      await callApi(LogOut, {});
    });
  });
  describe('VerifyLogin', () => {
    it('works', async () => {
      await callApi(VerifyLogin, { code: '123456' });
    });
  });
});
