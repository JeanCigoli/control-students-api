import { ListAllEmployeesTypesRepository } from '@/data/protocols/db';
import { ListAllEmployeesTypes } from '@/domain/usecases';

export class DbListAllEmployeesTypes implements ListAllEmployeesTypes {
  constructor(
    private readonly listAllEmployeesTypesRepository: ListAllEmployeesTypesRepository,
  ) {}

  async findAll(): ListAllEmployeesTypes.Result {
    const employeesTypes = await this.listAllEmployeesTypesRepository.findAll();

    return employeesTypes.map((value) => ({
      externalId: value.externalId,
      name: value.name,
      description: value.description,
    }));
  }
}
