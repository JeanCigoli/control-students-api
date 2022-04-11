import { DbUpdateStudents } from '@/data/usecases';
import { ClassesRepository, StudentsRepository } from '@/infra/db/mysql';
import { UpdateStudentsController } from '@/presentation/controllers';

export const makeUpdateStudents = () => {
  const studentsRepository = new StudentsRepository();
  const classesRepository = new ClassesRepository();

  const dbUpdateStudents = new DbUpdateStudents(
    classesRepository,
    studentsRepository,
    studentsRepository,
  );

  return new UpdateStudentsController(dbUpdateStudents);
};
