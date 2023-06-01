import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { OrdersToProducts } from '../../../types';
import deleteIcon from '../../assets/images/delete.png';
import menu_icon from '../../assets/images/menu.png';
import arrow from '../../assets/images/arrow.webp';
import { actions as selectedOrderActions } from '../../../Redux/reducers/selectedOrderReduser';
import { RootState } from '../../../Redux/store';
import styles from './OrderItem.module.scss';

type Props = {
  order: OrdersToProducts;
  onDelete: () => void;
};

export const OrderItem: React.FC<Props> = ({ order, onDelete }) => {
  const { id, title, products } = order;
  const dispatch = useDispatch();

  const handleMenu = () => {
    dispatch(selectedOrderActions.select(id));
  };

  const selectedOrder = useSelector<RootState>(state => state.selectedOrder);
  const isSelectedOrder = selectedOrder === order?.id;

  return (
    <div className={`${styles.item}`}>
      <div className={`${styles.item__name} w-45`}>{ title }</div>
      <div className={`${styles.item__menu} w-5`}>
        <button
          type="button"
          onClick={handleMenu}
        >
          <img
            src={menu_icon}
            alt="menu_icon"
          />
        </button>
      </div>
      <div className={`${styles.item__length} w-20`}>
        <span>{products?.length}</span>
        <p>Продукта</p>
      </div>

      <div className={`${styles.item__data} w-30`}>
        <span>{moment(new Date()).format('DD / MM')}</span>
        <p>{moment(new Date()).format('DD / MMM / YYYY')}</p>
      </div>
      <div className={`${styles.item__price} w-20`}>
        <span>2 500$</span>
        <p>250 000.50UAH</p>
      </div>
      <div className={`${styles.item__delete} w-10`}>
        {!isSelectedOrder ? <button type="button" onClick={onDelete}><img src={deleteIcon} alt="deleteIcon" /></button> : <img src={arrow} alt="arrow" />}
      </div>
    </div>
  );
};
