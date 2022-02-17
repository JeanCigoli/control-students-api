import { Periods } from '@/domain/entities';

export interface ListAllPeriods {
  findAll(): ListAllPeriods.Result;
}

export namespace ListAllPeriods {
  export type Result = Promise<Omit<Periods, 'periodsId'>[]>;
}
