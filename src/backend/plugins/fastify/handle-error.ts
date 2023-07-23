import { CoreError, type CoreErrorType } from '#/backend/core/error';
import { validationFailedStatusCodes } from '#/defs/extend/error-status';
import type { FastifyReply } from 'fastify';
import { ZodError } from 'zod';

export const fastifyHandleError = async (res: FastifyReply, err: unknown) => {
  if (err instanceof ZodError) {
    await res.status(422).send({ error: err.issues });
    return;
  }

  if (!(err instanceof CoreError)) {
    console.log((err as Error).message);
    console.log((err as Error).stack);
    await res.status(500).send();
    return;
  }

  const type = err.type as CoreErrorType;

  console.log(err.type);
  console.log(err.details);

  if (type === 'ValidationFailed') {
    const statusCode = validationFailedStatusCodes[(err as CoreError<'ValidationFailed'>).details.cause];
    await res.status(statusCode).send({ error: err });
    return;
  }

  if (type === 'ResourceNotFound') {
    await res.status(404).send({ error: err });
    return;
  }

  await res.status(500).send({ error: err });
};
