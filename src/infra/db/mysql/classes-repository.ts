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
      .innerJoin(
        'tb_classes_type as type',
        'type.classes_type_id',
        'classes.classes_type_id',
      )
      .select(
        'classes.classes_id',
        'classes.external_id',
        'classes.name',
        'classes.classes_type_id',
        'period.name as period',
        'type.name as type',
        'type.description',
      )
      .where('classes.buses_id', busesId)
      .whereNull('classes.deleted_at');

    return formateSnakeCaseKeysForCamelCase(classes);
  }

  async findById(id: string | number): ListClassesByIdRepository.Result {
    const classes = await knexConnection('tb_classes')
      .select('*')
      .where('classes_id', id)
      .orWhere('external_id', id)
      .whereNull('deleted_at')
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
