import { parseOutput } from '#/backend/api/parse-output';
import { parseRequest } from '#/backend/api/parse-request';
import type { App, ProcedureDefs } from '#/backend/core/types.extend';
import cookie from '@fastify/cookie';
import cors from '@fastify/cors';
import fastify from 'fastify';
import { fastifyHandleError } from './handle-error';
import { fastifyRequestDecoder, fastifyResponseResolver } from './lib';
import { toFastifyPath } from './to-fastify-path';

export const createFastifyServer = async <D extends ProcedureDefs>(procedures: D, app: App<D>) => {
  const sv = await fastify({
    requestTimeout: 5000,
    connectionTimeout: 5000,
  });

  sv.all('/healthcheck', async (request, res) => {
    await res.status(200).send('OK');
  });

  sv.addHook('onResponse', (request, reply, done) => {
    const { method, url } = request.raw;
    const { statusCode } = reply;
    const responseTime = reply.getResponseTime();

    if (request.method === 'OPTIONS' || request.url === '/healthcheck') {
      done();
      return;
    }
    const logMessage = `${method!} ${statusCode} ${responseTime.toFixed(0).padStart(4, ' ')}ms ${url!}`;
    console.log(logMessage);

    done();
  });

  await sv.register(cors, {
    origin: process.env.CORS_ALLOW_ORIGIN,
    methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  await sv.register(cookie);

  for (const operationId in procedures) {
    const def = procedures[operationId]!;
    type Method = 'get' | 'post' | 'put' | 'patch' | 'delete';
    const method = def.method.toLowerCase() as Method;
    const path = toFastifyPath(def.path);
    sv[method].bind(sv)(path, async (request_, res) => {
      try {
        const request = fastifyRequestDecoder(request_);
        const input = parseRequest(request, def);
        const output = await app[operationId as keyof typeof app](input);
        const response = parseOutput(output, def);
        await fastifyResponseResolver(res, response);
      } catch (err) {
        await fastifyHandleError(res, err);
      }
    });
  }

  return sv;
};
