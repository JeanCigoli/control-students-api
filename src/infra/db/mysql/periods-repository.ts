import { ListAllPeriodsRepository } from '@/data/protocols/db';
import { formateSnakeCaseKeysForCamelCase } from '@badass-team-code/formatted-cases-words';
import { knexConnection } from './helper';

export class PeriodsRepository implements ListAllPeriodsRepository {
  async findAll(): ListAllPeriodsRepository.Result {
    const periods = await knexConnection('tb_periods').select('*');

    return formateSnakeCaseKeysForCamelCase(periods);
  }
}
