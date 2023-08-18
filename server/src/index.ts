import 'reflect-metadata';
import * as admin from 'firebase-admin';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { handleError } from '@middlewares/error-handler';
import * as config from './config';
import prisma from './lib/db';
import './lib/di';
import routes from './api';

function bootstrap() {
  const { PORT } = config.server;
  const app = express();
  app.use(express.json());
  app.use(cors({ origin: true }));

  app.use('/api/v1', routes());
  app.use(handleError);
  const { CLIENT_EMAIL, PRIVATE_KEY, PROJECT_ID } = config.firebase;
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: CLIENT_EMAIL,
      privateKey: PRIVATE_KEY,
      projectId: PROJECT_ID,
    }),
  });

  prisma
    .$connect()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server listening on http://localhost:${PORT}`);
      });
    })
    .catch((err) => {
      console.log(`Fail to create connection Error:${err}`);
    });
}

bootstrap();
