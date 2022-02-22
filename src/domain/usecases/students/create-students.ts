import { Students } from '@/domain/entities';

export interface CreateStudents {
  create(params: CreateStudents.Params): CreateStudents.Result;
}

export namespace CreateStudents {
  export type Params = Omit<
    Students,
    'studentsId' | 'createdAt' | 'updatedAt' | 'externalId'
  >;

  export type Result = Promise<Omit<Students, 'studentsId'>>;
}
