import { ClassesType } from '@/domain/entities';

export interface ListAllClassesTypeRepository {
  findAll(): ListAllClassesTypeRepository.Result;
}

export namespace ListAllClassesTypeRepository {
  export type Result = Promise<ClassesType[]>;
}
