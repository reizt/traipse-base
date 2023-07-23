import { CoreError, type CoreErrorType } from '#/backend/core/error';
import { validationFailedStatusCodes } from '#/defs/extend/error-status';
import type { NextApiResponse } from 'next';

export const handleError = (res: NextApiResponse, err: unknown) => {
  if (!(err instanceof CoreError)) {
    console.log((err as Error).message);
    // console.log((err as Error).stack);
    res.status(500).end();
    return;
  }

  const type = err.type as CoreErrorType;

  console.log(err.type);
  console.log(err.details);

  if (type === 'ValidationFailed') {
    const statusCode = validationFailedStatusCodes[(err as CoreError<'ValidationFailed'>).details.cause];
    res.status(statusCode).send({ error: err });
    return;
  }

  if (type === 'ResourceNotFound') {
    res.status(404).send({ error: err });
    return;
  }

  res.status(500).send({ error: err });
};
