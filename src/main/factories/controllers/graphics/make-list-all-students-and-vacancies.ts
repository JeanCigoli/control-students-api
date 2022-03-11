import { DbListAllStudentsAndVacancies } from '@/data/usecases';
import {
  BusesRepository,
  ClassesRepository,
  StudentsRepository,
} from '@/infra/db/mysql';
import { ListAllStudentsAndVacanciesController } from '@/presentation/controllers';

export const makeListAllStudentsAndVacancies = () => {
  const busesRepository = new BusesRepository();
  const classesRepository = new ClassesRepository();
  const studentsRepository = new StudentsRepository();

  const dbListAllStudentsAndVacancies = new DbListAllStudentsAndVacancies(
    busesRepository,
    classesRepository,
    studentsRepository,
  );

  return new ListAllStudentsAndVacanciesController(
    dbListAllStudentsAndVacancies,
  );
};
