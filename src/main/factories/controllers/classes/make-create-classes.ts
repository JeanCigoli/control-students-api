import { DbCreateClasses } from '@/data/usecases';
import {
  BusesRepository,
  ClassesRepository,
  PeriodsRepository,
} from '@/infra/db/mysql';
import { CreateClassesController } from '@/presentation/controllers';

export const makeCreateClasses = () => {
  const classesRepository = new ClassesRepository();
  const periodsRepository = new PeriodsRepository();
  const busesRepository = new BusesRepository();

  const dbCreateClasses = new DbCreateClasses(
    periodsRepository,
    busesRepository,
    classesRepository,
    classesRepository,
  );

  return new CreateClassesController(dbCreateClasses);
};
