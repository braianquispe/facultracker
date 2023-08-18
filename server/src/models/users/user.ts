import Joi from 'joi';
import { CreateUserDto, UpdateUserDto } from 'src/types';

export const createUserDto = Joi.object<CreateUserDto>({
  displayName: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
});

export const updateUserDto = Joi.object<UpdateUserDto>({
  displayName: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string().min(6),
  roles: Joi.string(),
});
