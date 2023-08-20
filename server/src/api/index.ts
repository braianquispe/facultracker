import { Router } from 'express';
import { schoolRouter, authRouter, profileRouter } from './routes/index';

export default () => {
  const app = Router();
  app.use('/schools', schoolRouter);
  app.use('/auth', authRouter);
  app.use('/profiles', profileRouter);

  return app;
};
