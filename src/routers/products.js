import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import {
  getAllProductsController,
  getProductsControllerById,
  createProductsController,
  updateProductController,
  deleteProductController,
} from '../controllers/products.js';

import { validateBody } from '../utils/validateBody.js';

import {
  createProductValidationSchema,
  updateProductValidationSchema,
} from '../validation/products.js';
import { validId } from '../middlewares/validId.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.get('/', authenticate, ctrlWrapper(getAllProductsController));

router.get(
  '/:productId',
  authenticate,
  validId,
  ctrlWrapper(getProductsControllerById),
);

router.post(
  '/',
  authenticate,
  validateBody(createProductValidationSchema),
  ctrlWrapper(createProductsController),
);

router.patch(
  '/:productId',
  authenticate,
  validId,
  validateBody(updateProductValidationSchema),
  ctrlWrapper(updateProductController),
);

router.delete(
  '/:productId',
  authenticate,
  ctrlWrapper(deleteProductController),
);

export default router;
