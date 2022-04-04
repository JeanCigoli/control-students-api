export type Students = {
  studentsId: number;
  classesId: number | string;
  name: string;
  ra: string;
  class: string;
  school: string;
  dayOfWeek: string;
  externalId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};
