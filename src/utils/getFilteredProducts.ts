/* eslint-disable max-len */
import {
  Product,
  SearchTypes,
} from '../types';

export const getFilteredProducts = (
  products: Product[],
  productType: string,
  query: string,
): Product[] => {
  let filterProducts = products;

  const normalizedQuery = query.trim().toLowerCase();

  switch (productType) {
    case SearchTypes.Monitor:
      filterProducts = products.filter(product => product.type === 'Monitors');
      break;

    case SearchTypes.Laptop:
      filterProducts = products.filter(product => product.type === 'Laptops');
      break;

    case SearchTypes.Mobile:
      filterProducts = products.filter(product => product.type === 'Mobiles');
      break;

    default:
      break;
  }

  filterProducts = filterProducts.filter(product => product.title.toLowerCase().includes(normalizedQuery));

  return filterProducts;
};
