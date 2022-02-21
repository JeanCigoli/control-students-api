import { DbAuthenticationByCredentials } from '@/data/usecases';
import { BcryptAdapter, SecretToken } from '@/infra/cryptography';
import { EmployeesRepository } from '@/infra/db/mysql';
import { AuthenticationByCredentialsController } from '@/presentation/controllers';

export const makeAuthenticationByCredential = () => {
  const employeesRepository = new EmployeesRepository();

  const salt = 10;
  const bcryptAdapter = new BcryptAdapter(salt);

  const secretToken = new SecretToken();

  const dbAuthenticationByCredentials = new DbAuthenticationByCredentials(
    employeesRepository,
    employeesRepository,
    bcryptAdapter,
    secretToken,
  );

  return new AuthenticationByCredentialsController(
    dbAuthenticationByCredentials,
  );
};
