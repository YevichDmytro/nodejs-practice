import Joi from 'joi';

import { categoryList } from '../constants/products.js';

export const createProductValidationSchema = Joi.object({
  name: Joi.string().min(3).required(),
  price: Joi.number().required(),
  category: Joi.string()
    .valid(...categoryList)
    .required(),
  description: Joi.string().min(5),
});

export const updateProductValidationSchema = Joi.object({
  name: Joi.string().min(3),
  price: Joi.number(),
  category: Joi.string().valid(...categoryList),
  description: Joi.string().min(5),
});
