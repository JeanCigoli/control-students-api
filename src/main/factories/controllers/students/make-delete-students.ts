import { DbDeleteStudents } from '@/data/usecases';
import { StudentsRepository } from '@/infra/db/mysql';
import { DeleteStudentsController } from '@/presentation/controllers';

export const makeDeleteStudents = () => {
  const studentsRepository = new StudentsRepository();

  const dbDeleteStudents = new DbDeleteStudents(
    studentsRepository,
    studentsRepository,
  );

  return new DeleteStudentsController(dbDeleteStudents);
};
