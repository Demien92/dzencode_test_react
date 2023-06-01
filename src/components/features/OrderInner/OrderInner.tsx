import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions as selectedOrderActions } from '../../../Redux/reducers/selectedOrderReduser';
import { RootState } from '../../../Redux/store';
import { OrdersToProducts } from '../../../types';
import { OrderInnerItem } from '../OrderInnerItem';
import close_icon from '../../assets/images/close-icon.png';
import styles from './OrderInner.module.scss';

type Props = {
  order: OrdersToProducts | undefined;
};

export const OrderInner: React.FC<Props> = ({ order }) => {
  const dispatch = useDispatch();
  const selectedOrder = useSelector<RootState>(state => state.selectedOrder);
  const currentProducts = order?.products;

  useEffect(() => {
    const keyDownClose = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        dispatch(selectedOrderActions.unselect());
      }
    };

    window.addEventListener('keydown', keyDownClose);

    return () => {
      window.removeEventListener('keydown', keyDownClose);
    };
  }, [selectedOrder]);

  return (
    <div className={`${styles.order_inner}`}>
      <div className={`${styles.order_inner__head}`}>
        <div className={`${styles.order_inner__head_title}`}>{order?.title}</div>
        <div className={`${styles.order_inner__head_add}`}>
          <button type="button">
            +
          </button>
          <span>Add product</span>
        </div>
      </div>
      {currentProducts?.map(product => (
        <OrderInnerItem
          key={product.id}
          product={product}
        />
      ))}
      <button
        className={`${styles.order_inner__close}`}
        type="button"
        onClick={() => dispatch(selectedOrderActions.unselect())}
      >
        <img
          src={close_icon}
          alt="close_icon"
        />
      </button>
    </div>
  );
};
