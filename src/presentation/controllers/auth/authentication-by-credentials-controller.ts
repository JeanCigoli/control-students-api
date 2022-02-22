import { AuthenticationByCredentials } from '@/domain/usecases';
import { Controller } from '@/presentation/protocols';
import { makeError } from '@/utils';
import { badRequest, ok, serverError } from '@/utils/response';

export class AuthenticationByCredentialsController implements Controller {
  constructor(private readonly authentication: AuthenticationByCredentials) {}

  async handle(httpRequest: Controller.Request): Controller.Response {
    try {
      const params = httpRequest.body;

      const result = await this.authentication.auth(params);

      return ok('Autenticação realizada com sucesso!', result);
    } catch (error: any) {
      switch (error.message) {
        case 'EMPLOYEE_NOT_FOUND':
          return badRequest(
            makeError(
              'credential',
              'O usuário e senha digitados estão inválidos',
            ),
          );
        default:
          return serverError(error);
      }
    }
  }
}
