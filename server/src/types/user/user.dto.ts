import { Role } from '@lib/types/role';

export type CreateUserDto = {
  displayName: string;
  email: string;
  password: string;
  roles: string[];
};

export type UpdateUserDto = Partial<CreateUserDto> & {
  uid: string;
};

export type User = {
  uid: string;
  email?: string;
  roles?: Role[];
};
