import { Classes, Periods, Students } from '@/domain/entities';

export interface ListAllStudentsRepository {
  findAll(
    params: ListAllStudentsRepository.Params,
  ): ListAllStudentsRepository.Result;
}

export namespace ListAllStudentsRepository {
  export type Params = {
    busesId: number;
  };

  export type Result = Promise<
    {
      students: Students;
      classes: Classes;
      periods: Periods;
    }[]
  >;
}
