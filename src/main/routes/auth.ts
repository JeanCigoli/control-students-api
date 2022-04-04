import { Router } from 'express';
import { adaptRoute } from '../adapters';
import { makeAuthenticationByCredential } from '../factories/controllers';

export default (router: Router) => {
  router.post('/tokens', adaptRoute(makeAuthenticationByCredential()));
};
