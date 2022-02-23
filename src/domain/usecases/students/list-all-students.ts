import { Classes, Students } from '@/domain/entities';

export interface ListAllStudents {
  findAll(): ListAllStudents.Result;
}

export namespace ListAllStudents {
  export type Result = Promise<
    Array<
      Omit<Students, 'deletedAt' | 'studentsId' | 'classesId'> & {
        classes: Pick<Classes, 'name' | 'externalId'> & { period: string };
      }
    >
  >;
}
