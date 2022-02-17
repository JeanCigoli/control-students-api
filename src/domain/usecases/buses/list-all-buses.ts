import { Buses } from '@/domain/entities';

export interface ListAllBuses {
  findAll(): ListAllBuses.Result;
}

export namespace ListAllBuses {
  export type Result = Promise<Omit<Buses, 'busesId'>[]>;
}
