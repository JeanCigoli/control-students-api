import { Router } from 'express';
import { adaptRoute, adaptMiddleware } from '../adapters';
import { makeListAllClassesType } from '../factories/controllers';
import { makeAuthMiddleware } from '../factories/middlewares';

export default (router: Router) => {
  router.get(
    '/classes-types',
    adaptMiddleware(makeAuthMiddleware()),
    adaptRoute(makeListAllClassesType()),
  );
};
