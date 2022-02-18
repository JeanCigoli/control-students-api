import { CreateEmployees } from '@/domain/usecases';
import { Hash } from '@/data/protocols/cryptography';
import {
  CreateEmployeesRepository,
  ListBusesByIdRepository,
  ListEmployeesByEmailRepository,
  ListEmployeesByIdRepository,
  ListEmployeesTypesByIdRepository,
} from '@/data/protocols/db';

export class DbCreateEmployees implements CreateEmployees {
  constructor(
    private readonly listBusesByIdRepository: ListBusesByIdRepository,
    private readonly listEmployeesTypesByIdRepository: ListEmployeesTypesByIdRepository,
    private readonly listEmployeesByEmailRepository: ListEmployeesByEmailRepository,
    private readonly listEmployeesByIdRepository: ListEmployeesByIdRepository,
    private readonly createEmployeesRepository: CreateEmployeesRepository,
    private readonly bcrypt: Hash,
  ) {}

  async create(params: CreateEmployees.Params): CreateEmployees.Result {
    const busesExist = await this.listBusesByIdRepository.findById(
      params.busesId,
    );

    if (!busesExist) {
      throw new Error('BUSES_NOT_FOUND');
    }

    const employeesTypeExist =
      await this.listEmployeesTypesByIdRepository.findById(
        params.employeesTypeId,
      );

    if (!employeesTypeExist) {
      throw new Error('EMPLOYEES_TYPES_NOT_FOUND');
    }

    const emailExist = await this.listEmployeesByEmailRepository.findByEmail(
      params.email,
    );

    if (emailExist) {
      throw new Error('EMAIL_IS_USE');
    }

    const passwordHash = await this.bcrypt.hash(params.password);

    const [id] = await this.createEmployeesRepository.create({
      email: params.email,
      name: params.name,
      busesId: busesExist.busesId,
      employeesTypeId: employeesTypeExist.employeesTypeId,
      password: passwordHash,
    });

    const employee = await this.listEmployeesByIdRepository.findById(id);

    const { externalId, createdAt, updatedAt } = employee;
    const { password, ...props } = params;

    return {
      externalId,
      ...props,
      createdAt,
      updatedAt,
    };
  }
}
