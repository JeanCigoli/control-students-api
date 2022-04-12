import { Classes, ClassesType, Periods, Students } from '@/domain/entities';

export interface ListAllStudentsRepository {
  findAll(
    params: ListAllStudentsRepository.Params,
  ): ListAllStudentsRepository.Result;
}

export namespace ListAllStudentsRepository {
  export type Params = {
    busesId: number;
    classesId?: string;
  };

  export type Result = Promise<
    {
      students: Students;
      classes: Classes;
      periods: Periods;
      type: ClassesType;
    }[]
  >;
}
