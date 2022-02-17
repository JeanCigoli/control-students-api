import { ListAllEmployeesTypesRepository } from '@/data/protocols/db';
import { formateSnakeCaseKeysForCamelCase } from '@badass-team-code/formatted-cases-words';
import { knexConnection } from './helper';

export class EmployeesTypesRepository
  implements ListAllEmployeesTypesRepository
{
  async findAll(): ListAllEmployeesTypesRepository.Result {
    const employeesTypes = await knexConnection('tb_employees_type').select(
      '*',
    );

    return formateSnakeCaseKeysForCamelCase(employeesTypes);
  }
}
