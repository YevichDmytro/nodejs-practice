import {
  getAllProducts,
  getProductsById,
  createProducts,
} from '../services/products.js';
import createHttpError from 'http-errors';

export const getAllProductsController = async (req, res, next) => {
  const data = await getAllProducts();

  res.json({
    status: 200,
    message: 'Successfully found products!',
    data,
  });
};

export const getProductsControllerById = async (req, res, next) => {
  const data = await getProductsById(req.params.productId);

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
  const data = await createProducts(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a product!',
    data,
  });
};
