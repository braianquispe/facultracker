import { Router } from 'express';
import { schoolRouter } from './routes/degree/school-route';

export default () => {
  const app = Router();
  app.use('/schools', schoolRouter);

  return app;
};
