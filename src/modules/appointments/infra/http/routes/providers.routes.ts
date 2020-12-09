/* eslint-disable no-shadow */
/* eslint-disable camelcase */

import { Router } from 'express';
import ensureAthenticared from '@modules/users/infra/http/middlewares/EnsureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();
const providersController = new ProvidersController();

providersRouter.use(ensureAthenticared);

providersRouter.get('/', providersController.index);

export default providersRouter;
