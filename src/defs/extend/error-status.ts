import type { ErrorValidationFailed } from '#/backend/core/error';

type StatusCode = 400 | 401 | 403 | 404 | 422 | 500;

export const validationFailedStatusCodes: Record<ErrorValidationFailed['cause'], StatusCode> = {
  WrongCode: 400,
};
