/* eslint-disable no-shadow */
/* eslint-disable camelcase */

import { Router } from 'express';
import ensureAthenticared from '@modules/users/infra/http/middlewares/EnsureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

providersRouter.use(ensureAthenticared);

providersRouter.get('/', providersController.index);
providersRouter.get(
    '/:provider_id/month-availability',
    providerMonthAvailabilityController.index,
);
providersRouter.get(
    '/:provider_id/day-availability',
    providerDayAvailabilityController.index,
);

export default providersRouter;
