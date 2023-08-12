import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { SchoolService } from '@services/degree/school-service';

@injectable()
export class SchoolController {
  constructor(
    @inject('SchoolService') private readonly schoolService: SchoolService,
  ) {}

  async create(req: Request, res: Response) {
    const school = await this.schoolService.create(req.body);
    return res.status(201).json({ data: school });
  }

  async get(req: Request<{ id: string }>, res: Response) {
    const schoolId = Number(req.params.id);
    const school = await this.schoolService.get(schoolId);
    res.json({ data: school });
  }

  async getAll(req: Request, res: Response) {
    const page = req.query.page ? Number(req.query.page) : undefined;
    const rows = req.query.rows ? Number(req.query.rows) : undefined;
    const schools = await this.schoolService.getAll(page, rows);
    res.json({ data: schools });
  }

  async update(req: Request, res: Response) {
    const result = await this.schoolService.update(
      Number(req.params.id),
      req.body,
    );
    res.json({ data: result });
  }

  async delete(req: Request<{ id: string }>, res: Response) {
    await this.schoolService.delete(Number(req.params.id));
    res.sendStatus(204);
  }
}
