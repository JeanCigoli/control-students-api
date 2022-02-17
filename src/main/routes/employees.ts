import { Router } from 'express';
import { adaptRoute } from '../adapters';
import { makeListAllEmployeesTypes } from '../factories/controllers';

export default (router: Router) => {
  router.get('/employees/types', adaptRoute(makeListAllEmployeesTypes()));
};
