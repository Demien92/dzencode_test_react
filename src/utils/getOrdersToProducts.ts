import { Order, Product, OrdersToProducts } from '../types';

export const getOrdersToProducts = (
  orders: Order[],
  products: Product[],
): OrdersToProducts[] => {
  return orders.map((order) => ({
    ...order,
    products: products.filter(product => product.order === order.id),
  }));
};
