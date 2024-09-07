import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import {
  getAllProductsController,
  getProductsControllerById,
  createProductsController,
  updateProductController,
  deleteProductController,
} from '../controllers/products.js';

const router = Router();

router.get('/products', ctrlWrapper(getAllProductsController));

router.get('/products/:productId', ctrlWrapper(getProductsControllerById));

router.post('/products', ctrlWrapper(createProductsController));

router.patch('/products/:productId', ctrlWrapper(updateProductController));

router.delete('/products/:productId', ctrlWrapper(deleteProductController));

export default router;
