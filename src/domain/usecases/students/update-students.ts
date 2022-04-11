import { Students } from '@/domain/entities';

export interface UpdateStudents {
  update(params: UpdateStudents.Params): UpdateStudents.Result;
}

export namespace UpdateStudents {
  export type Params = {
    studentsId: string;
    student: Omit<
      Students,
      'studentsId' | 'createdAt' | 'updatedAt' | 'externalId'
    >;
  };

  export type Result = Promise<Omit<Students, 'studentsId'>>;
}
