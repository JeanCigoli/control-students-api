import { DbListAllClassesDetails } from '@/data/usecases';
import { ClassesRepository, StudentsRepository } from '@/infra/db/mysql';
import { ListAllClassesDetailsController } from '@/presentation/controllers';

export const makeListAllClassesDetails = () => {
  const classesRepository = new ClassesRepository();
  const studentsRepository = new StudentsRepository();

  const dbListAllClassesDetails = new DbListAllClassesDetails(
    classesRepository,
    studentsRepository,
  );

  return new ListAllClassesDetailsController(dbListAllClassesDetails);
};
