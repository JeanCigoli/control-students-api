import { DbCreateClasses } from '@/data/usecases';
import {
  BusesRepository,
  ClassesRepository,
  ClassesTypeRepository,
  PeriodsRepository,
} from '@/infra/db/mysql';
import { CreateClassesController } from '@/presentation/controllers';

export const makeCreateClasses = () => {
  const classesRepository = new ClassesRepository();
  const periodsRepository = new PeriodsRepository();
  const busesRepository = new BusesRepository();
  const classesTypeRepository = new ClassesTypeRepository();

  const dbCreateClasses = new DbCreateClasses(
    periodsRepository,
    busesRepository,
    classesRepository,
    classesTypeRepository,
    classesRepository,
  );

  return new CreateClassesController(dbCreateClasses);
};
