import ProductCollection from '../db/models/Products.js';

export const getAllProducts = async ({ filter = {}, userId }) => {
  const productQuery = ProductCollection.find({ userId });

  if (filter.category) {
    productQuery.where('category').equals(filter.category);
  }
  if (filter.minPrice) {
    productQuery.where('price').gte(filter.minPrice);
  }
  if (filter.maxPrice) {
    productQuery.where('price').lte(filter.maxPrice);
  }

  const products = await ProductCollection.find({ userId }).merge(productQuery);

  return products;
};

export const getProductsById = async (idData) => {
  const product = await ProductCollection.findOne(idData);
  return product;
};

export const createProducts = async (payload) => {
  const product = await ProductCollection.create(payload);
  return product;
};

export const updateProduct = async (idData, payload) => {
  const product = await ProductCollection.findOneAndUpdate(idData, payload, {
    new: true,
  });

  return product;
};

export const deleteProduct = async (idData) => {
  const deletedProduct = await ProductCollection.findOneAndDelete(idData);

  return deletedProduct;
};
