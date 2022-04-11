import { DbDeleteClasses } from '@/data/usecases/';
import { ClassesRepository, StudentsRepository } from '@/infra/db/mysql';
import { DeleteClassesController } from '@/presentation/controllers';

export const makeDeleteClasses = () => {
  const classesRepository = new ClassesRepository();
  const studentsRepository = new StudentsRepository();

  const dbDeleteClasses = new DbDeleteClasses(
    classesRepository,
    classesRepository,
    studentsRepository,
  );

  return new DeleteClassesController(dbDeleteClasses);
};
