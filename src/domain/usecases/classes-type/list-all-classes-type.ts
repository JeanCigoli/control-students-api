import { ClassesType } from '@/domain/entities';

export interface ListAllClassesType {
  findAll(): ListAllClassesType.Result;
}

export namespace ListAllClassesType {
  export type Result = Promise<Omit<ClassesType, 'classesTypeId'>[]>;
}
