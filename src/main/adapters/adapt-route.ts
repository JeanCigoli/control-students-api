import { Request, Response } from 'express';
import { Controller } from '@/presentation/protocols';
import {
  formateCamelCaseKeysForSnakeCase,
  formateSnakeCaseKeysForCamelCase,
} from '@badass-team-code/formatted-cases-words';

export function adaptRoute(controller: Controller) {
  return async (req: Request, res: Response) => {
    req.body = formateSnakeCaseKeysForCamelCase(req.body);
    req.params = formateSnakeCaseKeysForCamelCase(req.params);
    req.query = formateSnakeCaseKeysForCamelCase(req.query);

    const httpResponse = await controller.handle(req);

    if (httpResponse.headers) {
      res.set(httpResponse.headers);
    }

    return res
      .status(httpResponse.statusCode)
      .json(formateCamelCaseKeysForSnakeCase(httpResponse.body));
  };
}
