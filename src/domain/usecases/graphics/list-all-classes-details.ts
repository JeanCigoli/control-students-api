import { Classes } from '@/domain/entities';

export interface ListAllClassesDetails {
  findAll(params: ListAllClassesDetails.Params): ListAllClassesDetails.Result;
}

export namespace ListAllClassesDetails {
  export type Params = {
    busesId: number;
  };

  export type Result = Promise<
    Array<
      Pick<Classes, 'name' | 'externalId'> & {
        period: string;
        students: number | string;
      }
    >
  >;
}
