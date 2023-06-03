import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { OrderItem } from '../OrederItem';
import { Dialog } from '../Dialog';
import { getCurrentOrder } from '../../../utils';
import { actions as orderActions } from '../../../Redux/reducers/orderReducer';
import { OrdersToProducts } from '../../../types/OrdersToProducts';
import delete_icon from '../../assets/images/delete.webp';
import styles from './ListOrders.module.scss';

type Props = {
  orders: OrdersToProducts[];
};

export const ListOrders: React.FC<Props> = ({ orders }) => {
  const dispatch = useDispatch();
  const [dialog, setDialog] = useState(false);
  const [deleteItem, setDeleteItem] = useState(0);

  const handleDeleteOrder = (orderId: number) => {
    setDialog(true);
    setDeleteItem(orderId);
  };

  const orderToDelete = getCurrentOrder(orders, deleteItem);

  return (
    <>
      <div className={`${styles.ordersList}`}>
        {orders.map(order => (
          <OrderItem
            key={order.id}
            order={order}
            onDelete={() => handleDeleteOrder(order.id)}
          />
        ))}
      </div>
      {dialog && (
        <Dialog onClose={() => setDialog(false)}>
          <div className="dialog">
            <div className="dialog__name_item">{orderToDelete?.title}</div>
          </div>
          <div className="dialog__btn">
            <button
              className="dialog__cancel"
              type="button"
              onClick={() => {
                setDialog(false);
              }}
            >
              отменить
            </button>
            <button
              className="dialog__delete"
              type="button"
              onClick={() => {
                setDialog(false);
                dispatch(orderActions.remove(deleteItem));
              }}
            >
              <img
                src={delete_icon}
                alt="delete_icon"
              />
              {' '}
              удалить
            </button>
          </div>
        </Dialog>
      )}
    </>
  );
};
