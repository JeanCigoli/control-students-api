import { Classes } from '@/domain/entities';

export interface ListAllClasses {
  findAll(params: ListAllClasses.Params): ListAllClasses.Result;
}

export namespace ListAllClasses {
  export type Params = {
    busesId: number;
  };

  export type Result = Promise<
    Array<
      Pick<Classes, 'name' | 'externalId'> & {
        period: string;
        type: { name: string; description: string };
      }
    >
  >;
}
