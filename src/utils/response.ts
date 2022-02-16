import errorLogger from './logger';

export const ok = (message: string, payload: object) => {
  return {
    statusCode: 200,
    body: {
      message,
      payload,
      error: [],
    },
  };
};

export const created = (message: string, payload: object) => {
  return {
    statusCode: 201,
    body: {
      message,
      payload,
      error: [],
    },
  };
};

export const serverError = (error: any) => {
  errorLogger(error);
  return {
    statusCode: 500,
    body: {
      message:
        'Ops! No momento estamos indisponíveis, tente novamente mais tarde',
      payload: {},
      error: [{ message: 'Ocorreu um erro em nosso servidores' }],
    },
  };
};

export const conflict = (message: string, error?: any) => {
  return {
    statusCode: 409,
    body: {
      message,
      payload: {},
      error,
    },
  };
};

export const notFound = (message: string, error?: any) => {
  return {
    statusCode: 404,
    body: {
      message,
      payload: {},
      error,
    },
  };
};

export const badRequest = (error?: any) => {
  return {
    statusCode: 400,
    body: {
      message: 'Ops, ocorreram alguns erros de validações',
      payload: {},
      error,
    },
  };
};
