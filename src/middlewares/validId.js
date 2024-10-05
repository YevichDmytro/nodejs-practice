import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const validId = (req, res, next) => {
  const { productId } = req.params;
  if (!isValidObjectId(productId)) {
    next(createHttpError(400, 'Product ID is not valid'));
    return;
  }
  next();
};
