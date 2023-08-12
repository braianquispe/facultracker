import { ErrorRequestHandler } from 'express';
import { HttpError } from '@lib/errors/http/http-error';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handleError: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res
      .status(err.httpStatus)
      .json({ error: err.httpStatus, message: err.message });
  } else {
    res.status(500).json({ error: 500, message: 'Internal Server Error' });
  }
};
