import { Classes } from '@/domain/entities';

export interface ListAllClassesByBusRepository {
  findAllByBus(busesId: number): ListAllClassesByBusRepository.Result;
}

export namespace ListAllClassesByBusRepository {
  export type Result = Promise<
    Array<
      Omit<Classes, 'busesId' | 'periodId'> & {
        period: string;
      }
    >
  >;
}
