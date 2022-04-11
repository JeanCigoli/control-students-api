import { Students } from '@/domain/entities';

export interface UpdateStudentsByClassesRepository {
  updateByClasse(
    params: UpdateStudentsByClassesRepository.Params,
    classesId: number,
  ): UpdateStudentsByClassesRepository.Result;
}

export namespace UpdateStudentsByClassesRepository {
  export type Params = Partial<Students>;

  export type Result = Promise<number>;
}
