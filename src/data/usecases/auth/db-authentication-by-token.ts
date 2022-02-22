import { AuthenticationToken } from '@/domain/usecases';
import { Decrypt } from '@/data/protocols/cryptography';

export class DbAuthenticationByToken implements AuthenticationToken {
  constructor(private readonly decryptToken: Decrypt) {}

  decrypt(accessToken: AuthenticationToken.Params): AuthenticationToken.Result {
    const authHeader = accessToken;

    if (!authHeader) {
      throw new Error('TOKEN_NOT_FOUND');
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
      throw new Error('TOKEN_NOT_FORMATTED');
    }

    const [bearer, token] = parts;

    if (!/^Bearer$/i.test(bearer)) {
      throw new Error('TOKEN_NOT_FORMATTED');
    }

    const decoded = this.decryptToken.decrypt(token);

    return decoded;
  }
}
