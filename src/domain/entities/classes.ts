export type Classes = {
  classesId: number;
  periodId: number;
  busesId: number | string;
  name: string;
  classesTypeId: number;
  externalId: string;
  createdAt: string | Date;
  deletedAt?: string | Date;
};
