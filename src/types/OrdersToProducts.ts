import { Order } from './Order';
import { Product } from './Product';

export interface OrdersToProducts extends Order {
  products: Product[];
}
