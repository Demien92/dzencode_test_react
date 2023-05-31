import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { RootState } from '../../../Redux/store';
import { Product } from '../../../types';
import { getCurrentOrder } from '../../../utils';
import monitor from '../../assets/images/monitor.png';
import delete_icon from '../../assets/images/delete.png';
import styles from './ProductItem.module.scss';

type Props = {
  producty: Product;
  onDelete: () => void;
};

export const ProductItem: React.FC<Props> = ({ producty, onDelete }) => {
  const {
    id,
    title,
    serialNumber,
    isNew,
    guarantee,
    price,
    date,
    specification,
    type,
  } = producty;
  const orders = useSelector<RootState>(state => state.order) as [];

  const isRepair = false;
  const isBrendNew = isNew === 1;

  const currentOrder = getCurrentOrder(orders, id);

  return (
    <div className={`${styles.product_item}`}>
      <div className="w-5">
        <span className={`${isRepair ? `${styles.product_item__repair}` : `${styles.product_item__repair_no}`} w-10`} />
      </div>
      <div className={`${styles.product_item__icon} w-5`}>
        <img src={monitor} alt="icon" />
      </div>
      <div className={`${styles.product_item__info} w-8`}>
        <span className={`${styles.product_item__title}`}>{title}</span>
        <span className={`${styles.product_item__serial}`}>{serialNumber}</span>
      </div>
      <div className="w-6">{isRepair ? 'repair' : 'Free'}</div>
      <div className="w-6">{type}</div>
      <div className={`${styles.product_item__time} w-20`}>
        <div className={`${styles.product_item__time_info}`}>
          <span>from</span>
          {moment(guarantee.start).format('DD/MMM/YYYY')}
        </div>
        <div className={`${styles.product_item__time_info}`}>
          <span>to</span>
          {moment(guarantee.end).format('DD/MMM/YYYY')}
        </div>
      </div>
      <div className="w-5">{isBrendNew ? 'New' : 'Used'}</div>
      <div className={`${styles.product_item__price} w-10`}>
        {
          price.map(({ value, symbol }) => (
            <div key={symbol}>
              {value}
              {symbol}
            </div>
          ))
        }
      </div>
      <div className={`${styles.product_item__title} w-10`}>
        {currentOrder?.title}
      </div>
      <div className="w-10">{ specification }</div>
      <div className={`${styles.product_item__data} w-10`}>
        <span>{moment(date).format('DD / MM')}</span>
        <p>{moment(date).format('DD / MMM / YYYY')}</p>
      </div>
      <div className={`${styles.product_item__delete} w-5`}>
        <button
          type="button"
          onClick={onDelete}
        >
          <img
            src={delete_icon}
            alt="delete_icon"
          />
        </button>
      </div>
    </div>
  );
};
