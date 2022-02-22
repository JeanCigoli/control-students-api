import { DbAuthenticationByToken } from '@/data/usecases';
import { SecretToken } from '@/infra/cryptography';
import { AuthMiddleware } from '@/presentation/middleware';

export const makeAuthMiddleware = () => {
  const secretToken = new SecretToken();

  const dbAuthenticationByToken = new DbAuthenticationByToken(secretToken);

  return new AuthMiddleware(dbAuthenticationByToken);
};
