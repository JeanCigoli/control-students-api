import { NextFunction, Request, Response } from 'express';
import { YupSchema } from '@/presentation/protocols';
import { formatYupError } from '@/utils/formatters';
import { badRequest } from '@/utils/response';
import { formateSnakeCaseKeysForCamelCase } from '@badass-team-code/formatted-cases-words';

export function adaptValidator(schema: YupSchema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest = {
      ...formateSnakeCaseKeysForCamelCase(req.body),
      ...formateSnakeCaseKeysForCamelCase(req.params),
      ...formateSnakeCaseKeysForCamelCase(req.query),
    };

    try {
      await schema.validate(httpRequest, { abortEarly: false });

      return next();
    } catch (error: any) {
      const bad = badRequest(formatYupError(error));
      return res.status(bad.statusCode).json(bad.body);
    }
  };
}
