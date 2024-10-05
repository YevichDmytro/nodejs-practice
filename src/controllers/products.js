import createHttpError from 'http-errors';

import {
  getAllProducts,
  getProductsById,
  createProducts,
  updateProduct,
  deleteProduct,
} from '../services/products.js';

import { parseFilterCategoryParams } from '../utils/parseFilterCategoryParams.js';

export const getAllProductsController = async (req, res, next) => {
  const filter = parseFilterCategoryParams(req.query);
  const { _id: userId } = req.user;

  const data = await getAllProducts({ filter, userId });

  res.json({
    status: 200,
    message: 'Successfully found products!',
    data,
  });
};

export const getProductsControllerById = async (req, res, next) => {
  const { _id: userId } = req.user;
  const data = await getProductsById({ _id: req.params.productId, userId });

  if (!data) {
    throw createHttpError(404, 'Product not found');
  }
  res.json({
    status: 200,
    message: 'Successfully found product with id {productId}!',
    data,
  });
};

export const createProductsController = async (req, res) => {
  const { _id: userId } = req.user;
  const data = await createProducts({ ...req.body, userId });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a product!',
    data,
  });
};

export const updateProductController = async (req, res) => {
  const { _id: userId } = req.user;
  const { productId } = req.params;
  const data = await updateProduct({ _id: productId, userId }, req.body);

  if (!data) throw createHttpError(404, 'Product not found');

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a product!',
    data,
  });
};

export const deleteProductController = async (req, res) => {
  const { _id: userId } = req.user;
  const { productId } = req.params;

  const data = await deleteProduct({ _id: productId, userId });

  if (!data) throw createHttpError(404, 'Product not found');

  res.status(204).send();
};
