import { Classes, Students } from '@/domain/entities';

export interface ListAllStudents {
  findAll(params: ListAllStudents.Params): ListAllStudents.Result;
}

export namespace ListAllStudents {
  export type Params = {
    busesId: number;
  };

  export type Result = Promise<
    Array<
      Omit<Students, 'deletedAt' | 'studentsId' | 'classesId'> & {
        classes: Pick<Classes, 'name' | 'externalId'> & { period: string };
      }
    >
  >;
}
