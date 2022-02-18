import { Buses } from '@/domain/entities';

export interface ListBusesByIdRepository {
  findById(id: number | string): ListBusesByIdRepository.Result;
}

export namespace ListBusesByIdRepository {
  export type Result = Promise<Buses>;
}
