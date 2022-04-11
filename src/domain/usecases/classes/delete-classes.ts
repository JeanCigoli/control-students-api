export interface DeleteClasses {
  delete(params: DeleteClasses.Params): DeleteClasses.Result;
}

export namespace DeleteClasses {
  export type Params = {
    classesId: string;
  };

  export type Result = Promise<void>;
}
