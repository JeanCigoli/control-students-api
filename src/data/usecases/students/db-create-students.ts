import {
  CreateStudentsRepository,
  ListClassesByIdRepository,
  ListStudentsByIdRepository,
} from '@/data/protocols/db';
import { CreateStudents } from '@/domain/usecases';

export class DbCreateStudents implements CreateStudents {
  constructor(
    private readonly listClassesByIdRepository: ListClassesByIdRepository,
    private readonly listStudentsByIdRepository: ListStudentsByIdRepository,
    private readonly createStudentsRepository: CreateStudentsRepository,
  ) {}

  async create(params: CreateStudents.Params): CreateStudents.Result {
    const classExist = await this.listClassesByIdRepository.findById(
      params.classesId,
    );

    if (!classExist) {
      throw new Error('CLASSES_NOT_EXIST');
    }

    const [id] = await this.createStudentsRepository.create({
      ...params,
      classesId: classExist.classesId,
    });

    const student = await this.listStudentsByIdRepository.findById(id);

    return {
      externalId: student.externalId,
      ...params,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
    };
  }
}
