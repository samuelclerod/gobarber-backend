/* eslint-disable no-shadow */

import { Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();
const forgotPassowordController = new ForgotPasswordController();
const resetPassowordController = new ResetPasswordController();

passwordRouter.post('/forgot', forgotPassowordController.create);
passwordRouter.post('/reset', resetPassowordController.create);

export default passwordRouter;
