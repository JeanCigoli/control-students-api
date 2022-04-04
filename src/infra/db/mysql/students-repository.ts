import {
  CountStudentsByClassesRepository,
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
    UpdateStudentsRepository,
    CountStudentsByClassesRepository
{
  async count(
    params: CountStudentsByClassesRepository.Params,
  ): CountStudentsByClassesRepository.Result {
    const count = await knexConnection('tb_students')
      .count('*', { as: 'count' })
      .whereIn('classes_id', params.classesId)
      .first();

    return count;
  }

  async findAll(
    params: ListAllStudentsRepository.Params,
  ): ListAllStudentsRepository.Result {
    const students = await knexConnection('tb_students as students')
      .innerJoin(
        'tb_classes as classes',
        'students.classes_id',
        'classes.classes_id',
      )
      .innerJoin(
        'tb_periods as periods',
        'periods.periods_id',
        'classes.period_id',
      )
      .select('students.*', 'classes.*', 'periods.*')
      .options({ nestTables: true })
      .where('classes.buses_id', '=', params.busesId)
      .whereNull('students.deleted_at')
      .orderBy('students.name', 'asc');

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
