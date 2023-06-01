import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { getFilteredOrders, getOrdersToProducts } from '../../utils';
import { OrderInner } from '../../components/features/OrderInner';
import { TitleBlock } from '../../components/features/TitleBlock/TitleBlock';
import { ListOrders } from '../../components/features/ListOrders';
import plus from '../../components/assets/images/plus.png';
import styles from './Orders.module.scss';

export const Orders: React.FC = () => {
  const orders = useSelector<RootState>(state => state.order) as [];
  const products = useSelector<RootState>(state => state.product) as [];
  const filteredOrders = getFilteredOrders(orders, '');
  const OrdersToProducts = getOrdersToProducts(filteredOrders, products);

  const selectedOrder = useSelector<RootState>(state => state.selectedOrder);
  const ordersToProducts = getOrdersToProducts(orders, products);
  const currentOrder = ordersToProducts.find(order => order.id === selectedOrder);

  return (
    <div className={`${styles.orders}`}>
      <div className={`${styles.orders__title_block}`}>
        <button type="submit" className={`${styles.orders__add_btn}`}>
          <img src={plus} alt="add_button" />
        </button>
        <TitleBlock name="Приходы" count={orders.length} />
      </div>
      <div className={`${styles.orders__container}`}>
        <ListOrders orders={OrdersToProducts} />
        {selectedOrder && <OrderInner order={currentOrder} /> }
      </div>
    </div>
  );
};
