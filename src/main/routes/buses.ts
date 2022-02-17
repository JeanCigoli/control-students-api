import { Router } from 'express';
import { adaptRoute } from '../adapters';
import { makeCreateBuses, makeListAllBuses } from '../factories/controllers';

export default (router: Router) => {
  router.get('/buses', adaptRoute(makeListAllBuses()));

  router.post('/buses', adaptRoute(makeCreateBuses()));
};
