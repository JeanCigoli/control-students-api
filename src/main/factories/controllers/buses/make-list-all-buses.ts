import { DbListAllBuses } from '@/data/usecases';
import { BusesRepository } from '@/infra/db/mysql';
import { ListAllBusesController } from '@/presentation/controllers';

export const makeListAllBuses = () => {
  const busesRepository = new BusesRepository();

  const dbListAllBuses = new DbListAllBuses(busesRepository);

  return new ListAllBusesController(dbListAllBuses);
};
