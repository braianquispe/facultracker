import { PrismaClient } from '@prisma/client';
import { container } from 'tsyringe';
import { SchoolService } from '@services/index';
import { SchoolController } from '../api/controllers';

container.register<PrismaClient>('Prisma', {
  useValue: new PrismaClient(),
});
container.registerSingleton('SchoolController', SchoolController);
container.registerSingleton('SchoolService', SchoolService);
