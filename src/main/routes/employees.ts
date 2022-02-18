import { Router } from 'express';
import { adaptRoute } from '../adapters';
import {
  makeCreateEmployees,
  makeListAllEmployeesTypes,
} from '../factories/controllers';

export default (router: Router) => {
  router.post('/employees', adaptRoute(makeCreateEmployees()));

  router.get('/employees/types', adaptRoute(makeListAllEmployeesTypes()));
};
