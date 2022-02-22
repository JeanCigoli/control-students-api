import {
  CreateStudentsRepository,
  ListAllStudentsRepository,
  ListStudentsByIdRepository,
  UpdateStudentsRepository,
} from '@/data/protocols/db';
import {
  formateCamelCaseKeysForSnakeCase,
  formateSnakeCaseKeysForCamelCase,
} from '@badass-team-code/formatted-cases-words';
import { knexConnection } from './helper';

export class StudentsRepository
  implements
    ListAllStudentsRepository,
    ListStudentsByIdRepository,
    CreateStudentsRepository,
    UpdateStudentsRepository
{
  async findAll(): ListAllStudentsRepository.Result {
    const students = await knexConnection('tb_students')
      .select('*')
      .whereNull('deleted_at');

    return formateSnakeCaseKeysForCamelCase(students);
  }

  async findById(id: string | number): ListStudentsByIdRepository.Result {
    const students = await knexConnection('tb_students')
      .select('*')
      .where('students_id', id)
      .orWhere('external_id', id)
      .whereNull('deleted_at')
      .first();

    return formateSnakeCaseKeysForCamelCase(students);
  }

  create(
    params: CreateStudentsRepository.Params,
  ): CreateStudentsRepository.Result {
    return knexConnection('tb_students').insert(
      formateCamelCaseKeysForSnakeCase(params),
    );
  }

  update(
    params: UpdateStudentsRepository.Params,
    id: string | number,
  ): UpdateStudentsRepository.Result {
    return knexConnection('tb_students')
      .update(formateCamelCaseKeysForSnakeCase(params))
      .where('students_id', id)
      .orWhere('external_id', id);
  }
}
