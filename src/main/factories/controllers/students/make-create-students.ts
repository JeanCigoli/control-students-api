import { DbCreateStudents } from '@/data/usecases';
import { ClassesRepository, StudentsRepository } from '@/infra/db/mysql';
import { CreateStudentsController } from '@/presentation/controllers';

export const makeCreateStudents = () => {
  const studentsRepository = new StudentsRepository();
  const classesRepository = new ClassesRepository();

  const dbCreateStudents = new DbCreateStudents(
    classesRepository,
    studentsRepository,
    studentsRepository,
  );

  return new CreateStudentsController(dbCreateStudents);
};
