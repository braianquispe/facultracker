import { NextFunction, Response } from 'express';
import { ForbiddenError } from '@lib/errors/http/forbidden-error';
import { RequestWithAuth } from '@lib/types/request';
import { Role } from '@lib/types/role';
import { UnauthorizedError } from '@lib/errors/http/unauthorized-error';

export const isAuthorized = (allowedRoles: Role[]) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  (req: RequestWithAuth, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new UnauthorizedError());
    }
    const { roles } = req.user;

    if (!roles) {
      return next(new ForbiddenError());
    }

    if (roles.some((role) => allowedRoles.includes(role))) {
      return next();
    }

    return next(new ForbiddenError());
  };
