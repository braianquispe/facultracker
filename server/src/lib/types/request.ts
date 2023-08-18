import { Request } from 'express';
import { User } from 'src/types';

export type RequestWithAuth = Request & {
  user?: User;
};
