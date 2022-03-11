import { ListAllClassesTypeRepository } from '@/data/protocols/db';
import { ListAllClassesType } from '@/domain/usecases';

export class DbListAllClassesType implements ListAllClassesType {
  constructor(
    private readonly listAllClassesTypeRepository: ListAllClassesTypeRepository,
  ) {}

  async findAll(): ListAllClassesType.Result {
    const classesType = await this.listAllClassesTypeRepository.findAll();

    return classesType.map((value) => ({
      externalId: value.externalId,
      description: value.description,
      name: value.name,
    }));
  }
}
