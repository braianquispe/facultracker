import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '@lib/errors/http/bad-request-error';

// eslint-disable-next-line operator-linebreak
const validateRequest = (payload: unknown, schema: Joi.ObjectSchema) => {
  const validate = schema.validate(payload, { stripUnknown: true });
  if (validate.error) {
    throw new BadRequestError(validate.error.message);
  }
};

// eslint-disable-next-line arrow-body-style
export const validateBody = (schema: Joi.ObjectSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    validateRequest(req.body, schema);
    next();
  };
};

// eslint-disable-next-line arrow-body-style
export const validateQuery = (schema: Joi.ObjectSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    validateRequest(req.query, schema);
    next();
  };
};
