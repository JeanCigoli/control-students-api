import { DbListAllClassesType } from '@/data/usecases';
import { ClassesTypeRepository } from '@/infra/db/mysql';
import { ListAllClassesTypeController } from '@/presentation/controllers';

export const makeListAllClassesType = () => {
  const classesTypeRepository = new ClassesTypeRepository();

  const dbListAllClassesType = new DbListAllClassesType(classesTypeRepository);

  return new ListAllClassesTypeController(dbListAllClassesType);
};
