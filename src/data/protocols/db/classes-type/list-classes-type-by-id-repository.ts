import { ClassesType } from '@/domain/entities';

export interface ListClassesTypeByIdRepository {
  findById(id: string | number): ListClassesTypeByIdRepository.Result;
}

export namespace ListClassesTypeByIdRepository {
  export type Result = Promise<ClassesType>;
}
