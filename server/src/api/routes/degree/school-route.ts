import express from 'express';
import { container } from 'tsyringe';
import { isAuthenticated, isAuthorized } from '@middlewares/index';
import { validateBody, validateQuery } from '@middlewares/validate-request';
import {
  createSchoolDto,
  getAllSchoolQueryParams,
  updateSchoolDto,
} from '@models/degree/school';
import { Role } from '@lib/types/role';
import { SchoolController } from '../../controllers';

const router = express.Router();
const schoolController = container.resolve<SchoolController>('SchoolController');

router.get(
  '/',
  validateQuery(getAllSchoolQueryParams),
  schoolController.getAll.bind(schoolController),
);
router.get('/:id', schoolController.get.bind(schoolController));
router.post(
  '/',
  isAuthenticated,
  isAuthorized([Role.ADMIN]),
  validateBody(createSchoolDto),
  schoolController.create.bind(schoolController),
);
router.patch(
  '/:id',
  isAuthenticated,
  isAuthorized([Role.ADMIN]),
  validateBody(updateSchoolDto),
  schoolController.update.bind(schoolController),
);

export { router as schoolRouter };
