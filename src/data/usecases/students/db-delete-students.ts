import {
  ListStudentsByIdRepository,
  UpdateStudentsRepository,
} from '@/data/protocols/db';
import { DeleteStudents } from '@/domain/usecases';

export class DbDeleteStudents implements DeleteStudents {
  constructor(
    private readonly listStudentsByIdRepository: ListStudentsByIdRepository,
    private readonly updateStudentsRepository: UpdateStudentsRepository,
  ) {}

  async delete(params: DeleteStudents.Params): DeleteStudents.Result {
    const studentExist = await this.listStudentsByIdRepository.findById(
      params.externalId,
    );

    if (!studentExist) {
      throw new Error('STUDENT_NOT_FOUND');
    }

    await this.updateStudentsRepository.update(
      {
        deletedAt: new Date(),
      },
      studentExist.studentsId,
    );
  }
}
