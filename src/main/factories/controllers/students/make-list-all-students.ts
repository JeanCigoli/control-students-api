import { DbListAllStudents } from '@/data/usecases';
import { StudentsRepository } from '@/infra/db/mysql';
import { ListAllStudentsController } from '@/presentation/controllers';

export const makeListAllStudents = () => {
  const studentsRepository = new StudentsRepository();

  const dbListAllStudents = new DbListAllStudents(studentsRepository);

  return new ListAllStudentsController(dbListAllStudents);
};
