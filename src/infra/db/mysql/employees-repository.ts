import {
  CreateEmployeesRepository,
  ListEmployeesByEmailRepository,
  ListEmployeesByIdRepository,
} from '@/data/protocols/db';
import {
  formateCamelCaseKeysForSnakeCase,
  formateSnakeCaseKeysForCamelCase,
} from '@badass-team-code/formatted-cases-words';
import { knexConnection } from './helper';

export class EmployeesRepository
  implements
    ListEmployeesByEmailRepository,
    ListEmployeesByIdRepository,
    CreateEmployeesRepository
{
  async findByEmail(email: string): ListEmployeesByEmailRepository.Result {
    const employees = await knexConnection('tb_employees')
      .select('*')
      .where('email', email)
      .first();

    return formateSnakeCaseKeysForCamelCase(employees);
  }

  async findById(id: string | number): ListEmployeesByIdRepository.Result {
    const employees = await knexConnection('tb_employees')
      .select('*')
      .where('employees_id', id)
      .orWhere('external_id', id)
      .first();

    return formateSnakeCaseKeysForCamelCase(employees);
  }

  create(
    params: CreateEmployeesRepository.Params,
  ): CreateEmployeesRepository.Result {
    return knexConnection('tb_employees').insert(
      formateCamelCaseKeysForSnakeCase(params),
    );
  }
}
