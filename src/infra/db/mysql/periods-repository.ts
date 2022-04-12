import {
  ListAllPeriodsRepository,
  ListPeriodsByIdRepository,
} from '@/data/protocols/db';
import { formateSnakeCaseKeysForCamelCase } from '@badass-team-code/formatted-cases-words';
import { knexConnection } from './helper';

export class PeriodsRepository
  implements ListAllPeriodsRepository, ListPeriodsByIdRepository
{
  async findById(id: string | number): ListPeriodsByIdRepository.Result {
    const periods = await knexConnection('tb_periods')
      .select('*')
      .where((build) =>
        typeof id === 'string'
          ? build.where('external_id', id)
          : build.where('periods_id', id),
      )
      .first();

    return formateSnakeCaseKeysForCamelCase(periods);
  }

  async findAll(): ListAllPeriodsRepository.Result {
    const periods = await knexConnection('tb_periods').select('*');

    return formateSnakeCaseKeysForCamelCase(periods);
  }
}
