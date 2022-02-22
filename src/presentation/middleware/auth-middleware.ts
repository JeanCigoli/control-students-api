import { AuthenticationToken } from '@/domain/usecases';
import { makeError } from '@/utils';
import { badRequest, serverError, unauthorized } from '@/utils/response';
import { Middleware } from '../protocols/middleware';

export class AuthMiddleware implements Middleware {
  constructor(private readonly dbAuthentication: AuthenticationToken) {}

  async handle(...[httpRequest, next]: Middleware.Params): Middleware.Result {
    try {
      const { authorization } = httpRequest.headers;

      const token = this.dbAuthentication.decrypt(authorization);
      httpRequest.token = token;

      return next();
    } catch (error: any) {
      switch (error.message) {
        case 'TOKEN_NOT_FOUND':
          return badRequest(makeError('Token', 'O token não foi informado.'));
        case 'TOKEN_NOT_FORMATTED':
          return unauthorized();
        case 'TOKEN_INVALID':
          return unauthorized();
        default:
          return serverError(error);
      }
    }
  }
}
