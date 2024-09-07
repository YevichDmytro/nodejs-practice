import { getAllProducts } from '../services/products.js';

export const getAllProductsController = async (req, res, next) => {
  const data = await getAllProducts();

  res.json({
    status: 200,
    message: 'Successfully found products!',
    data,
  });
};
