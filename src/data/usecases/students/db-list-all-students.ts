import { ListAllStudentsRepository } from '@/data/protocols/db';
import { ListAllStudents } from '@/domain/usecases';

export class DbListAllStudents implements ListAllStudents {
  constructor(
    private readonly listAllStudentsRepository: ListAllStudentsRepository,
  ) {}

  async findAll(): ListAllStudents.Result {
    const students = await this.listAllStudentsRepository.findAll();

    return students.map((value) => ({
      externalId: value.students.externalId,
      name: value.students.name,
      ra: value.students.ra,
      class: value.students.class,
      createdAt: value.students.createdAt,
      updatedAt: value.students.updatedAt,
      classes: {
        externalId: value.classes.externalId,
        name: value.classes.name,
        period: value.periods.name,
      },
    }));
  }
}
