import { Schema, model } from 'mongoose';

import { categoryList } from '../../constants/products.js';

const productsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: categoryList,
      default: 'other',
    },
    description: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true },
);

const ProductsCollection = model('product', productsSchema);
export default ProductsCollection;
