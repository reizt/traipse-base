import type { ApiRequest, ApiResponse } from '#/defs/lib/api';
import '@fastify/cookie';
import type { FastifyReply, FastifyRequest } from 'fastify';

export const fastifyRequestDecoder = (req: FastifyRequest): ApiRequest => {
  return {
    method: req.method as ApiRequest['method'],
    path: req.routerPath,
    body: req.body,
    query: req.query as Record<string, string>,
    params: req.params as Record<string, string>,
    cookies: req.cookies as Record<string, string>,
  };
};

export const fastifyResponseResolver = async (reply: FastifyReply, res: ApiResponse) => {
  for (const key in res.cookies) {
    if (res.cookies[key] != null) {
      void reply.setCookie(key, res.cookies[key] as string, {
        domain: process.env.COOKIE_DOMAIN,
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });
    }
  }
  await (res.body == null ? reply.code(res.status).send() : reply.code(res.status).send(res.body));
};
