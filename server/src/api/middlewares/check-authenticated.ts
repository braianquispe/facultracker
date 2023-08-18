import { Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';
import { UnauthorizedError } from '@lib/errors/http/unauthorized-error';
import { RequestWithAuth } from '@lib/types/request';

export const isAuthenticated = async (
  req: RequestWithAuth,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(new UnauthorizedError());
  }

  if (!authorization.startsWith('Bearer')) {
    return next(new UnauthorizedError());
  }

  const split = authorization?.split('Bearer ');
  if (split.length !== 2) {
    return next(new UnauthorizedError());
  }

  const token = split[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    return next();
  } catch (err) {
    return next(new UnauthorizedError(err?.toString()));
  }
};
