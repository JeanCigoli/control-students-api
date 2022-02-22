export type Students = {
  studentsId: number;
  classesId: number | string;
  name: string;
  ra: string;
  class: string;
  externalId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};
