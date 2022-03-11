import {
  ListAllClassesTypeRepository,
  ListClassesTypeByIdRepository,
} from '@/data/protocols/db';
import { formateSnakeCaseKeysForCamelCase } from '@badass-team-code/formatted-cases-words';
import { knexConnection } from './helper';

export class ClassesTypeRepository
  implements ListAllClassesTypeRepository, ListClassesTypeByIdRepository
{
  async findById(id: string | number): ListClassesTypeByIdRepository.Result {
    const classesType = await knexConnection('tb_classes_type')
      .select('*')
      .where('classes_type_id', id)
      .orWhere('external_id', id)
      .first();

    return formateSnakeCaseKeysForCamelCase(classesType);
  }

  async findAll(): ListAllClassesTypeRepository.Result {
    const classesType = await knexConnection('tb_classes_type').select('*');

    return formateSnakeCaseKeysForCamelCase(classesType);
  }
}
