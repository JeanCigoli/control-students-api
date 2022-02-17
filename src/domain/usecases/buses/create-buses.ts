import { Buses } from '@/domain/entities';

export interface CreateBuses {
  create(params: CreateBuses.Params): CreateBuses.Result;
}

export namespace CreateBuses {
  export type Params = Omit<Buses, 'busesId' | 'externalId'>;

  export type Result = Promise<Omit<Buses, 'busesId' | 'externalId'>>;
}
