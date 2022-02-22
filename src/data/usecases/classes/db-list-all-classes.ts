import { ListAllClassesByBusRepository } from '@/data/protocols/db';
import { ListAllClasses } from '@/domain/usecases';

export class DbListAllClasses implements ListAllClasses {
  constructor(
    private readonly listAllClassesByBusRepository: ListAllClassesByBusRepository,
  ) {}

  async findAll(params: ListAllClasses.Params): ListAllClasses.Result {
    const classes = await this.listAllClassesByBusRepository.findAllByBus(
      params.busesId,
    );

    return classes;
  }
}
