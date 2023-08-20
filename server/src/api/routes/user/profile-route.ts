import { container } from 'tsyringe';
import express from 'express';
import { ProfileController } from 'src/api/controllers';
import { isAuthenticated } from '@middlewares/check-authenticated';
import { validateBody } from '@middlewares/validate-request';
import { createProfileDto, updateProfileDto } from '@models/users/profile';
import { isAuthorized } from '@middlewares/check-authorized';
import { Role } from '@lib/types/role';

const router = express.Router();
const profileController = container.resolve<ProfileController>('ProfileController');

router.post(
  '/',
  isAuthenticated,
  isAuthorized([Role.ADMIN]),
  validateBody(createProfileDto),
  profileController.create.bind(profileController),
);
router.get('/:profileId', profileController.get.bind(profileController));
router.patch(
  '/:profileId',
  isAuthenticated,
  isAuthorized([Role.ADMIN]),
  validateBody(updateProfileDto),
  profileController.update.bind(profileController),
);
router.delete('/:profileId', profileController.delete.bind(profileController));

export { router as profileRouter };
