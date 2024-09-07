import ProductCollection from '../db/models/Products.js';

export const getAllProducts = async () => {
  const products = await ProductCollection.find();

  return products;
};
