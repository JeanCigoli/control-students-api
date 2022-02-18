import * as yup from 'yup';

export const string = (field: string) =>
  yup
    .string()
    .nullable(true)
    .min(3, `${field} tem que ter no mínimo 3 caracteres`);

export const uuid = (field: string) =>
  yup.string().uuid(`${field} está fora dos padrões`);

export const number = (field: string) =>
  yup
    .string()
    .nullable(true)
    .matches(/[0-9]/, `${field} precisa ser um número`);

export const stringNullable = yup.string().notRequired().nullable(true);

export const email = yup
  .string()
  .trim()
  .matches(
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    'Valor inserido não corresponde a um e-mail',
  )
  .nullable(true)
  .required('O e-mail é obrigatório');

export const password = yup
  .string()
  .trim()
  .matches(
    /^([a-z]|[A-Z])(?=.*[@#$%^&+=]).+$/gi,
    'A senha está fora dos padrões',
  )
  .required('A senha é obrigatória');
