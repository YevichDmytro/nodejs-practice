import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import {
  getAllProductsController,
  getProductsControllerById,
  createProductsController,
} from '../controllers/products.js';

const router = Router();

router.get('/products', ctrlWrapper(getAllProductsController));

router.get('/products/:productId', ctrlWrapper(getProductsControllerById));

router.post('/products', ctrlWrapper(createProductsController));

export default router;
