import { Router } from 'express';

import { validateBody } from '../utils/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import {
  userLoginValidationSchema,
  userRegistrationValidationSchema,
} from '../validation/user.js';
import {
  loginUserController,
  logOutController,
  refreshTokenController,
  registerUserController,
} from '../controllers/users.js';

const userRouter = Router();

userRouter.post(
  '/register',
  validateBody(userRegistrationValidationSchema),
  ctrlWrapper(registerUserController),
);
userRouter.post(
  '/login',
  validateBody(userLoginValidationSchema),
  ctrlWrapper(loginUserController),
);
userRouter.post('/logout', ctrlWrapper(logOutController));

userRouter.post('/refresh', ctrlWrapper(refreshTokenController));

export default userRouter;
