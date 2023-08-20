import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { CreateProfileDto, UpdateProfileDto } from 'src/types';

@injectable()
export class ProfileService {
  constructor(@inject('Prisma') private readonly prisma: PrismaClient) {}

  createProfile(profile: CreateProfileDto) {
    return this.prisma.profile.create({
      data: {
        userId: profile.uid,
        firstName: profile.firstName,
        lastName: profile.lastName,
      },
    });
  }

  getProfile(profileId: number) {
    return this.prisma.profile.findUniqueOrThrow({
      where: {
        profileId,
      },
    });
  }

  updateProfile(profile: UpdateProfileDto) {
    return this.prisma.profile.update({
      data: {
        firstName: profile.firstName,
        lastName: profile.lastName,
      },
      where: {
        profileId: profile.profileId,
      },
    });
  }

  delete(profileId: number) {
    return this.prisma.profile.update({
      data: {
        isActive: false,
      },
      where: {
        profileId,
      },
    });
  }
}
