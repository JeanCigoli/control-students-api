import { Buses } from '@/domain/entities';

export interface ListAllBusesRepository {
  findAll(): ListAllBusesRepository.Result;
}

export namespace ListAllBusesRepository {
  export type Result = Promise<Buses[]>;
}
