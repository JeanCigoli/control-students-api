import { ListAllBusesRepository } from '@/data/protocols/db';
import { ListAllBuses } from '@/domain/usecases';

export class DbListAllBuses implements ListAllBuses {
  constructor(
    private readonly listAllBusesRepository: ListAllBusesRepository,
  ) {}

  async findAll(): ListAllBuses.Result {
    const buses = await this.listAllBusesRepository.findAll();

    return buses.map((value) => ({
      externalId: value.externalId,
      name: value.name,
      code: value.code,
      limitVacancies: value.limitVacancies,
    }));
  }
}
