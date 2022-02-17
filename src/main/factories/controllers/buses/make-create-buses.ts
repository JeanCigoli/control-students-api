import { DbCreateBuses } from '@/data/usecases';
import { BusesRepository } from '@/infra/db/mysql';
import { CreateBusesController } from '@/presentation/controllers';

export const makeCreateBuses = () => {
  const busesRepository = new BusesRepository();

  const dbCreateBuses = new DbCreateBuses(busesRepository, busesRepository);

  return new CreateBusesController(dbCreateBuses);
};
