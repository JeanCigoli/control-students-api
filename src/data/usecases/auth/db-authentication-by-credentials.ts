import { Encrypt, HashComparer } from '@/data/protocols/cryptography';
import {
  ListEmployeeRelationshipByIdRepository,
  ListEmployeesByEmailRepository,
} from '@/data/protocols/db';
import { AuthenticationByCredentials } from '@/domain/usecases';

export class DbAuthenticationByCredentials
  implements AuthenticationByCredentials
{
  constructor(
    private readonly listEmployeesByEmailRepository: ListEmployeesByEmailRepository,
    private readonly listEmployeeRelationshipByIdRepository: ListEmployeeRelationshipByIdRepository,
    private readonly hashComparer: HashComparer,
    private readonly secretEncrypt: Encrypt,
  ) {}

  async auth(
    params: AuthenticationByCredentials.Params,
  ): AuthenticationByCredentials.Result {
    const employee = await this.listEmployeesByEmailRepository.findByEmail(
      params.email,
    );

    if (!employee) {
      throw new Error('EMPLOYEE_NOT_FOUND');
    }

    const isValid = await this.hashComparer.compare(
      params.password,
      employee.password,
    );

    if (!isValid) {
      throw new Error('EMPLOYEE_NOT_FOUND');
    }

    const additionalData =
      await this.listEmployeeRelationshipByIdRepository.findRelationById(
        employee.employeesId,
      );

    const token = {
      employeeId: employee.employeesId,
      name: employee.name,
      email: employee.email,
      tokenDate: new Date(),
      ...additionalData,
    };

    const accessToken = this.secretEncrypt.encrypt(token);

    return {
      employee: {
        id: employee.externalId,
        name: employee.name,
        email: employee.email,
        type: additionalData.type.description,
        bus: additionalData.bus.name,
      },
      accessToken,
    };
  }
}
