import { Router } from 'express';
import { adaptRoute, adaptMiddleware } from '../adapters';
import {
  makeCreateClasses,
  makeDeleteClasses,
  makeListAllClasses,
} from '../factories/controllers';
import { makeAuthMiddleware } from '../factories/middlewares';

export default (router: Router) => {
  router.get(
    '/classes',
    adaptMiddleware(makeAuthMiddleware()),
    adaptRoute(makeListAllClasses()),
  );

  router.post(
    '/classes',
    adaptMiddleware(makeAuthMiddleware()),
    adaptRoute(makeCreateClasses()),
  );

  router.delete(
    '/classes/:classes_id',
    adaptMiddleware(makeAuthMiddleware()),
    adaptRoute(makeDeleteClasses()),
  );
};
