type Buses = {
  busesId: number;
  code: string;
  name: string;
  limitVacancies: number;
  externalId: string;
};

type EmployeesType = {
  employeesTypeId: number;
  name: string;
  description: string;
  externalId: string;
};

type Token = {
  employeeId: string;
  name: string;
  email: string;
  tokenDate: Date;
  bus: Buses;
  type: EmployeesType;
};

declare module Express {
  export interface Request {
    token: Token;
  }
}
