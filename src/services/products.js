import ProductCollection from '../db/models/Products.js';

export const getAllProducts = async () => {
  const products = await ProductCollection.find();

  return products;
};

export const getProductsById = async (productId) => {
  const product = await ProductCollection.findById(productId);
  return product;
};

export const createProducts = async (payload) => {
  const product = await ProductCollection.create(payload);
  return product;
};

export const updateProduct = async (productId, payload) => {
  const product = await ProductCollection.findOneAndUpdate(
    { _id: productId },
    payload,
    {
      new: true,
    },
  );
  return product;
};
