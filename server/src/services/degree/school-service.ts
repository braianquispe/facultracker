import { PrismaClient, Prisma } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { School } from '@models/index';
import { CreateSchoolDto, UpdateSchoolDto } from 'src/types';
import { PaginatedResponse, getPaginationOffset } from '@lib/index';

@injectable()
export class SchoolService {
  constructor(@inject('Prisma') private readonly prisma: PrismaClient) {}

  create(school: CreateSchoolDto) {
    return this.prisma.school.create({
      data: school,
    });
  }

  get(schoolId: number): Promise<School> {
    return this.prisma.school.findUniqueOrThrow({ where: { schoolId } });
  }

  async getAll(
    page = 1,
    perPage = 10,
  ): Promise<PaginatedResponse<School>> {
    const skip = getPaginationOffset(page, perPage);
    const where: Prisma.SchoolWhereInput = {
      isActive: true,
    };
    const [rowsNumber, items] = await this.prisma.$transaction([
      this.prisma.school.count({ where }),
      this.prisma.school.findMany({
        take: perPage,
        skip,
        where,
      }),
    ]);

    return {
      items,
      page,
      perPage,
      rowsNumber,
    };
  }

  update(schoolId: number, school: UpdateSchoolDto) {
    return this.prisma.school.update({
      data: school,
      where: { schoolId },
    });
  }

  /**
   * Soft deletes the school with that id
   */
  async delete(schoolId: number) {
    await this.update(schoolId, { isActive: false });
  }
}
