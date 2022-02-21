import { Buses, EmployeesType } from '@/domain/entities';

export interface ListEmployeeRelationshipByIdRepository {
  findRelationById(
    id: string | number,
  ): ListEmployeeRelationshipByIdRepository.Result;
}

export namespace ListEmployeeRelationshipByIdRepository {
  export type Result = Promise<{
    bus: Buses;
    type: EmployeesType;
  }>;
}
