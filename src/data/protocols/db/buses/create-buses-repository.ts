import { Buses } from '@/domain/entities';

export interface CreateBusesRepository {
  create(params: CreateBusesRepository.Params): CreateBusesRepository.Result;
}

export namespace CreateBusesRepository {
  export type Params = Omit<Buses, 'busesId' | 'externalId'>;

  export type Result = Promise<number[]>;
}
