import type { ApiResponse } from '#/defs/lib/api';
import type { NextApiResponse } from 'next';
import { setCookie } from 'nookies';

export const resolveApiResponse = (res: NextApiResponse, response: ApiResponse) => {
  for (const key in response.cookies) {
    if (response.cookies[key] != null) {
      void setCookie({ res }, key, response.cookies[key] as string, {
        domain: process.env.COOKIE_DOMAIN,
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });
    }
  }
  if (response.body != null && JSON.stringify(response.body) !== '{}') {
    res.status(response.status).send(response.body);
  } else {
    res.status(response.status).end();
  }
};
