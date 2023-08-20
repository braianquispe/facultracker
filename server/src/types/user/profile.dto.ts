export type CreateProfileDto = {
  uid: string;
  firstName: string;
  lastName: string;
};

export type UpdateProfileDto = { profileId: number } & Partial<
Omit<CreateProfileDto, 'uid'>
>;
