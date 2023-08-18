import express from 'express';
import { container } from 'tsyringe';
import { AuthController } from 'src/api/controllers/user/auth';
import { validateBody } from '@middlewares/validate-request';
import { createUserDto, updateUserDto } from '@models/users/user';
import { isAuthenticated } from '@middlewares/check-authenticated';
import { isAuthorized } from '@middlewares/check-authorized';
import { Role } from '@lib/types/role';

const router = express.Router();
const authController = container.resolve<AuthController>('AuthController');

router.post(
  '/',
  // isAuthenticated,
  // isAuthorized([Role.ADMIN]),
  validateBody(createUserDto),
  authController.create.bind(authController),
);
router.patch(
  '/:uid',
  isAuthenticated,
  isAuthorized([Role.ADMIN]),
  validateBody(updateUserDto),
  authController.update.bind(authController),
);
router.delete(
  '/:uid',
  isAuthorized([Role.ADMIN]),
  validateBody(updateUserDto),
  authController.delete.bind(authController),
);

export { router as authRouter };
