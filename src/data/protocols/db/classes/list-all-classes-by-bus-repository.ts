import { Classes } from '@/domain/entities';

export interface ListAllClassesByBusRepository {
  findAllByBus(busesId: number): ListAllClassesByBusRepository.Result;
}

export namespace ListAllClassesByBusRepository {
  export type Result = Promise<
    Pick<Classes, 'externalId' | 'name'> & { period: string }[]
  >;
}
