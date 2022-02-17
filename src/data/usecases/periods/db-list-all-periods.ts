import { ListAllPeriodsRepository } from '@/data/protocols/db';
import { ListAllPeriods } from '@/domain/usecases';

export class DbListAllPeriods implements ListAllPeriods {
  constructor(
    private readonly listAllPeriodsRepository: ListAllPeriodsRepository,
  ) {}

  async findAll(): ListAllPeriods.Result {
    const periods = await this.listAllPeriodsRepository.findAll();

    return periods.map((value) => ({
      externalId: value.externalId,
      name: value.name,
    }));
  }
}
