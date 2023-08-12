import Joi from 'joi';
import { CreateSchoolDto, UpdateSchoolDto } from 'src/types';

const createSchoolDto = Joi.object<CreateSchoolDto>({
  code: Joi.string().required(),
  name: Joi.string().required(),
});

const updateSchoolDto = Joi.object<UpdateSchoolDto>({
  code: Joi.string(),
  name: Joi.string(),
  isActive: Joi.boolean(),
});

const getAllSchoolQueryParams = Joi.object({
  page: Joi.number().integer().min(1),
  rows: Joi.number().integer().min(1),
});

export {
  createSchoolDto,
  updateSchoolDto,
  getAllSchoolQueryParams,
};
