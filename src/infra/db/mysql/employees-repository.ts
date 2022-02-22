import {
  CreateEmployeesRepository,
  ListEmployeeRelationshipByIdRepository,
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
    ListEmployeeRelationshipByIdRepository,
    CreateEmployeesRepository
{
  async findRelationById(
    id: string | number,
  ): ListEmployeeRelationshipByIdRepository.Result {
    const employees = await knexConnection('tb_employees as employee')
      .innerJoin(
        'tb_employees_type as type',
        'type.employees_type_id',
        'employee.employees_type_id',
      )
      .innerJoin('tb_buses as bus', 'bus.buses_id', 'employee.buses_id')
      .select('type.*', 'bus.*')
      .whereNull('deleted_at')
      .where('employee.employees_id', id)
      .orWhere('employee.external_id', id)
      .options({ nestTables: true })
      .first();

    return formateSnakeCaseKeysForCamelCase(employees);
  }

  async findByEmail(email: string): ListEmployeesByEmailRepository.Result {
    const employees = await knexConnection('tb_employees')
      .select('*')
      .where('email', email)
      .whereNull('deleted_at')
      .first();

    return formateSnakeCaseKeysForCamelCase(employees);
  }

  async findById(id: string | number): ListEmployeesByIdRepository.Result {
    const employees = await knexConnection('tb_employees')
      .select('*')
      .where('employees_id', id)
      .orWhere('external_id', id)
      .whereNull('deleted_at')
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
