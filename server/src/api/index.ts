import { Router } from 'express';
import { schoolRouter, authRouter } from './routes/index';

export default () => {
  const app = Router();
  app.use('/schools', schoolRouter);
  app.use('/auth', authRouter);

  return app;
};
