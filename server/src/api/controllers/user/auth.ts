import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { AuthService } from '@services/user/auth-service';

@injectable()
export class AuthController {
  constructor(
    @inject('AuthService') private readonly authService: AuthService,
  ) {}

  async create(req: Request, res: Response) {
    const uid = await this.authService.create(req.body);
    res.status(201).json({ data: uid });
  }

  async update(req: Request, res: Response) {
    const result = await this.authService.updateUser({ uid: req.params.uid, ...req.body });
    res.json({ data: result });
  }

  async delete(req: Request, res: Response) {
    await this.authService.deleteUser(req.params.uid);
    res.sendStatus(204);
  }
}
