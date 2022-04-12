import {
  ListAllEmployeesTypesRepository,
  ListEmployeesTypesByIdRepository,
} from '@/data/protocols/db';
import { formateSnakeCaseKeysForCamelCase } from '@badass-team-code/formatted-cases-words';
import { knexConnection } from './helper';

export class EmployeesTypesRepository
  implements ListAllEmployeesTypesRepository, ListEmployeesTypesByIdRepository
{
  async findById(id: string | number): ListEmployeesTypesByIdRepository.Result {
    const employeesTypes = await knexConnection('tb_employees_type')
      .select('*')
      .where((build) =>
        typeof id === 'string'
          ? build.where('external_id', id)
          : build.where('employees_type_id', id),
      )
      .first();

    return formateSnakeCaseKeysForCamelCase(employeesTypes);
  }

  async findAll(): ListAllEmployeesTypesRepository.Result {
    const employeesTypes = await knexConnection('tb_employees_type').select(
      '*',
    );

    return formateSnakeCaseKeysForCamelCase(employeesTypes);
  }
}
