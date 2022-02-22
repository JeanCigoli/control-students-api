import { Periods } from '@/domain/entities';

export interface ListPeriodsByIdRepository {
  findById(id: number | string): ListPeriodsByIdRepository.Result;
}

export namespace ListPeriodsByIdRepository {
  export type Result = Promise<Periods>;
}
