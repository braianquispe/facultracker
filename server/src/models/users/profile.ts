import Joi from 'joi';
import { CreateProfileDto, UpdateProfileDto } from 'src/types';

export const createProfileDto = Joi.object<CreateProfileDto>({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
});

export const updateProfileDto = Joi.object<UpdateProfileDto>({
  firstName: Joi.string(),
  lastName: Joi.string(),
});
