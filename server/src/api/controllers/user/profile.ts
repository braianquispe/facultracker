import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { ProfileService } from '@services/index';

@injectable()
export class ProfileController {
  constructor(
    @inject('ProfileService') private readonly profileService: ProfileService,
  ) {}

  async create(req: Request, res: Response) {
    const profile = await this.profileService.createProfile(req.body);
    res.status(201).json({ data: profile });
  }

  async get(req: Request, res: Response) {
    const profile = await this.profileService.getProfile(Number(req.params.profileId));
    res.json({ data: profile });
  }

  async update(req: Request, res: Response) {
    const { profileId } = req.params;
    const { firstName, lastName } = req.body;
    const result = await this.profileService.updateProfile({
      profileId: Number(profileId),
      firstName,
      lastName,
    });
    res.json({ data: result });
  }

  async delete(req: Request, res: Response) {
    const { profileId } = req.params;
    await this.profileService.delete(Number(profileId));
    res.sendStatus(204);
  }
}
