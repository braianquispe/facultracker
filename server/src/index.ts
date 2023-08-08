import 'reflect-metadata';
import express from 'express';
import * as config from './config';
import prisma from './lib/db';
import './lib/di';
import routes from './api';

function bootstrap() {
  const { PORT } = config.server;
  const app = express();
  app.use(express.json());

  app.use('/api/v1/', routes);

  prisma.$connect().then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  }).catch((err) => {
    console.log(`Fail to create connection Error:${err}`);
  });
}

bootstrap();
