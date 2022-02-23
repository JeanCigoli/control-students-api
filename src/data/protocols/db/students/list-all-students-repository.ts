import { Classes, Periods, Students } from '@/domain/entities';

export interface ListAllStudentsRepository {
  findAll(): ListAllStudentsRepository.Result;
}

export namespace ListAllStudentsRepository {
  export type Result = Promise<
    {
      students: Students;
      classes: Classes;
      periods: Periods;
    }[]
  >;
}
