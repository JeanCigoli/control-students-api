import { ValidationError } from 'yup';

export interface PrettyYupError {
  message: string;
  param: string | undefined;
}

export function formatYupError(error: ValidationError): PrettyYupError[] {
  if (!error.inner) {
    return [
      {
        message: 'Ops, ocorreu alguns errors de formatações de dados',
        param: error.message,
      },
    ];
  }

  return error.inner.map((item) => ({
    message: item.message,
    param: item.path,
  }));
}
