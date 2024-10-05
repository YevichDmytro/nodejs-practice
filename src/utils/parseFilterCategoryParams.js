import { categoryList } from '../constants/products.js';

const parseCategory = (category) => {
  if (!category) return;
  if (categoryList.includes(category.toLowerCase())) {
    return category;
  }
  return;
};

const parsePrice = (price) => {
  const parsedInt = parseInt(price);
  if (!Number.isNaN(parsedInt)) {
    return parsedInt;
  }
  return;
};

export const parseFilterCategoryParams = ({ category, minPrice, maxPrice }) => {
  const parsedCategory = parseCategory(category);
  const parsedMinPrice = parsePrice(minPrice);
  const parsedMaxPrice = parsePrice(maxPrice);

  return {
    category: parsedCategory,
    minPrice: parsedMinPrice,
    maxPrice: parsedMaxPrice,
  };
};
