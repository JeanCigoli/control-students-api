export interface CountStudentsByClassesRepository {
  count(
    params: CountStudentsByClassesRepository.Params,
  ): CountStudentsByClassesRepository.Result;
}

export namespace CountStudentsByClassesRepository {
  export type Params = {
    classesId: number[];
  };

  export type Result = Promise<{ count: string | number } | undefined>;
}
