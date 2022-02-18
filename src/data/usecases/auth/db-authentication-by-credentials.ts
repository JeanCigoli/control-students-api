import { Encrypt, HashComparer } from '@/data/protocols/cryptography';
import { ListEmployeesByEmailRepository } from '@/data/protocols/db';
import { AuthenticationByCredentials } from '@/domain/usecases';

export class DbAuthenticationByCredentials
  implements AuthenticationByCredentials
{
  constructor(
    private readonly listEmployeesByEmailRepository: ListEmployeesByEmailRepository,
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

    const accessToken = this.secretEncrypt.encrypt(employee);

    return {
      accessToken,
    } as any;
  }
}
