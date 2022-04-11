import {
  UpdateStudentsRepository,
  ListClassesByIdRepository,
  ListStudentsByIdRepository,
} from '@/data/protocols/db';
import { UpdateStudents } from '@/domain/usecases';

export class DbUpdateStudents implements UpdateStudents {
  constructor(
    private readonly listClassesByIdRepository: ListClassesByIdRepository,
    private readonly listStudentsByIdRepository: ListStudentsByIdRepository,
    private readonly updateStudentsRepository: UpdateStudentsRepository,
  ) {}

  async update(params: UpdateStudents.Params): UpdateStudents.Result {
    const classExist = await this.listClassesByIdRepository.findById(
      params.student.classesId,
    );

    if (!classExist) {
      throw new Error('CLASSES_NOT_EXIST');
    }

    const studentExist = await this.listStudentsByIdRepository.findById(
      params.studentsId,
    );

    if (!studentExist) {
      throw new Error('STUDENT_NOT_EXIST');
    }

    const dateUpdate = new Date();

    await this.updateStudentsRepository.update(
      {
        ...params.student,
        classesId: classExist.classesId,
        updatedAt: new Date(),
      },
      studentExist.studentsId,
    );

    return {
      externalId: studentExist.externalId,
      ...params.student,
      createdAt: studentExist.createdAt,
      updatedAt: dateUpdate,
    };
  }
}
