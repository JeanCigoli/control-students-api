import { Router } from 'express';
import { adaptRoute } from '../adapters';
import { makeListAllPeriods } from '../factories/controllers';

export default (router: Router) => {
  router.get('/periods', adaptRoute(makeListAllPeriods()));
};
