import { DbListAllClasses } from '@/data/usecases';
import { ClassesRepository } from '@/infra/db/mysql';
import { ListAllClassesController } from '@/presentation/controllers';

export const makeListAllClasses = () => {
  const classesRepository = new ClassesRepository();

  const dbListAllClasses = new DbListAllClasses(classesRepository);

  return new ListAllClassesController(dbListAllClasses);
};
