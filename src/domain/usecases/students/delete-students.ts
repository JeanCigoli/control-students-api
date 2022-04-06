export interface DeleteStudents {
  delete(params: DeleteStudents.Params): DeleteStudents.Result;
}

export namespace DeleteStudents {
  export type Params = {
    externalId: string;
  };

  export type Result = Promise<void>;
}
