import { Periods } from '@/domain/entities';

export interface ListAllPeriodsRepository {
  findAll(): ListAllPeriodsRepository.Result;
}

export namespace ListAllPeriodsRepository {
  export type Result = Promise<Periods[]>;
}
