import { DbListAllPeriods } from '@/data/usecases';
import { PeriodsRepository } from '@/infra/db/mysql';
import { ListAllPeriodsController } from '@/presentation/controllers';

export const makeListAllPeriods = () => {
  const periodsRepository = new PeriodsRepository();

  const dbListAllPeriods = new DbListAllPeriods(periodsRepository);

  return new ListAllPeriodsController(dbListAllPeriods);
};
