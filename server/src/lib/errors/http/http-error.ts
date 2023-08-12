export class HttpError extends Error {
  public readonly httpStatus: number;

  constructor(message = 'Bad request', httpStatus = 400) {
    super(message);
    this.httpStatus = httpStatus;
  }
}
