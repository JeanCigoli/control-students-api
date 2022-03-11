import { ListAllClassesTypeRepository } from '@/data/protocols/db';
import { formateSnakeCaseKeysForCamelCase } from '@badass-team-code/formatted-cases-words';
import { knexConnection } from './helper';

export class ClassesTypeRepository implements ListAllClassesTypeRepository {
  async findAll(): ListAllClassesTypeRepository.Result {
    const classesType = await knexConnection('tb_classes_type').select('*');

    return formateSnakeCaseKeysForCamelCase(classesType);
  }
}
