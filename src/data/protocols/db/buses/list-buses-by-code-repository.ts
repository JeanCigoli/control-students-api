import { Buses } from '@/domain/entities';

export interface ListBusesByCodeRepository {
  findByCode(code: string): ListBusesByCodeRepository.Result;
}

export namespace ListBusesByCodeRepository {
  export type Result = Promise<Buses | null>;
}
