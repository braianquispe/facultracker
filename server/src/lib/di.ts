import { PrismaClient } from '@prisma/client';
import { container } from 'tsyringe';
import { SchoolService, AuthService, ProfileService } from '@services/index';
import { AuthController } from 'src/api/controllers/user/auth';
import { ProfileController, SchoolController } from '../api/controllers';

container.register<PrismaClient>('Prisma', {
  useValue: new PrismaClient(),
});
container.registerSingleton('SchoolController', SchoolController);
container.registerSingleton('SchoolService', SchoolService);

container.registerSingleton('AuthController', AuthController);
container.registerSingleton('AuthService', AuthService);

container.registerSingleton('ProfileController', ProfileController);
container.registerSingleton('ProfileService', ProfileService);
