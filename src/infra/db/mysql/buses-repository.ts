import {
  CreateBusesRepository,
  ListAllBusesRepository,
  ListBusesByCodeRepository,
  ListBusesByIdRepository,
} from '@/data/protocols/db';
import {
  formateCamelCaseKeysForSnakeCase,
  formateSnakeCaseKeysForCamelCase,
} from '@badass-team-code/formatted-cases-words';
import { knexConnection } from './helper';

export class BusesRepository
  implements
    ListBusesByCodeRepository,
    ListAllBusesRepository,
    ListBusesByIdRepository,
    CreateBusesRepository
{
  async findById(id: string | number): ListBusesByIdRepository.Result {
    const bus = await knexConnection('tb_buses')
      .select('*')
      .where('buses_id', id)
      .orWhere('external_id', id)
      .first();

    return formateSnakeCaseKeysForCamelCase(bus);
  }

  async findByCode(code: string): ListBusesByCodeRepository.Result {
    const bus = await knexConnection('tb_buses')
      .select('*')
      .where('code', code)
      .first();

    return formateSnakeCaseKeysForCamelCase(bus);
  }

  async findAll(): ListAllBusesRepository.Result {
    const buses = await knexConnection('tb_buses').select('*');

    return formateSnakeCaseKeysForCamelCase(buses);
  }

  create(params: CreateBusesRepository.Params): CreateBusesRepository.Result {
    return knexConnection('tb_buses').insert(
      formateCamelCaseKeysForSnakeCase(params),
    );
  }
}
