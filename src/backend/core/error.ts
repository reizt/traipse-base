export type ErrorValidationFailed = {
  type: 'ErrorValidationFailed';
  cause: 'WrongCode';
};
export type ErrorResourceNotFound = {
  type: 'ErrorResourceNotFound';
  resource: 'User';
};

const coreErrors = {
  ValidationFailed: 'validation error',
  ResourceNotFound: 'resource not found',
  Unexpected: 'something went wrong',
};

export type CoreErrorType = keyof typeof coreErrors;

type Details<T extends CoreErrorType> = T extends 'ValidationFailed' ? ErrorValidationFailed : T extends 'ResourceNotFound' ? ErrorResourceNotFound : string;

type DetailsInput<T extends CoreErrorType> = Omit<Details<T>, 'type'>;

export class CoreError<T extends CoreErrorType> extends Error {
  public details: Details<T>;

  constructor(
    public readonly type: T,
    details: DetailsInput<T>,
  ) {
    super(coreErrors[type]);
    this.details = type === 'Unexpected' ? ({ type, error: details } as unknown as Details<T>) : ({ type, ...details } as unknown as Details<T>);
  }
}
