import {
  CreateClassesRepository,
  ListAllClassesByBusRepository,
  ListClassesByIdRepository,
} from '@/data/protocols/db';
import {
  formateCamelCaseKeysForSnakeCase,
  formateSnakeCaseKeysForCamelCase,
} from '@badass-team-code/formatted-cases-words';
import { knexConnection } from './helper';

export class ClassesRepository
  implements
    ListClassesByIdRepository,
    ListAllClassesByBusRepository,
    CreateClassesRepository
{
  async findAllByBus(busesId: number): ListAllClassesByBusRepository.Result {
    const classes = await knexConnection('tb_classes as classes')
      .innerJoin(
        'tb_periods as period',
        'classes.period_id',
        'period.periods_id',
      )
      .select('classes.external_id', 'classes.name', 'period.name as period')
      .where('classes.buses_id', busesId);

    return formateSnakeCaseKeysForCamelCase(classes);
  }

  async findById(id: string | number): ListClassesByIdRepository.Result {
    const classes = await knexConnection('tb_classes')
      .select('*')
      .where('classes_id', id)
      .orWhere('external_id', id)
      .first();

    return formateSnakeCaseKeysForCamelCase(classes);
  }

  create(
    params: CreateClassesRepository.Params,
  ): CreateClassesRepository.Result {
    return knexConnection('tb_classes').insert(
      formateCamelCaseKeysForSnakeCase(params),
    );
  }
}
