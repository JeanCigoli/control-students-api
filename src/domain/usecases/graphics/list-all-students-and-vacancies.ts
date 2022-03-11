export interface ListAllStudentsAndVacancies {
  findAll(
    params: ListAllStudentsAndVacancies.Params,
  ): ListAllStudentsAndVacancies.Result;
}

export namespace ListAllStudentsAndVacancies {
  export type Params = {
    busesId: number;
  };

  export type Result = Promise<{
    students: number;
    vacancies: number;
  }>;
}
