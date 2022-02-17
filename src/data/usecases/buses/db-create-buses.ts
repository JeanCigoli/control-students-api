import {
  CreateBusesRepository,
  ListBusesByCodeRepository,
} from '@/data/protocols/db';
import { CreateBuses } from '@/domain/usecases';

export class DbCreateBuses implements CreateBuses {
  constructor(
    private readonly listBusesByCodeRepository: ListBusesByCodeRepository,
    private readonly createBusesRepository: CreateBusesRepository,
  ) {}

  async create(params: CreateBuses.Params): CreateBuses.Result {
    const busExist = await this.listBusesByCodeRepository.findByCode(
      params.code,
    );

    if (busExist) {
      throw new Error('BUS_EXIST');
    }

    await this.createBusesRepository.create(params);

    return params;
  }
}
