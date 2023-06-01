import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../../Redux/reducers/productReducer';
import { Product } from '../../../types';
import { Dialog } from '../Dialog';
import monitor from '../../assets/images/monitor.png';
import deleteIcon from '../../assets/images/delete.png';
import styles from './OrderInnerItem.module.scss';
import delete_icon from '../../assets/images/delete.webp';

type Props = {
  product: Product;
};

export const OrderInnerItem: React.FC<Props> = ({ product }) => {
  const [dialog, setDialog] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <div className={`${styles.order_inner__list_item}`} key={product.id}>
        <div className={`${styles.order_inner__item_info}`}>
          <div className={`${styles.order_inner__status}`}></div>
          <div className={`${styles.order_inner__icon}`}>
            <img
              src={monitor}
              alt="icon"
            />
          </div>
          <div className={`${styles.order_inner__title}`}>
            <span className={`${styles.order_inner__type}`}>{product.type}</span>
            <span className={`${styles.order_inner__serial}`}>{product.serialNumber}</span>
          </div>
          <div>
            {product.isNew === 1 ? 'free' : 'In service'}
          </div>
        </div>
        <button
          type="button"
          className={`${styles.order_inner__delete_item}`}
          onClick={() => setDialog(true)}
        >
          <img
            src={deleteIcon}
            alt="delete icon"
          />
        </button>
      </div>
      {dialog && (
        <Dialog onClose={() => setDialog(false)}>
          <div className="dialog">
            <div className="dialog__item">
              <div className="dialog__status"></div>
              <div className="dialog__icon">
                <img
                  src={monitor}
                  alt="monitor"
                />
              </div>
              <div className="dialog__info">
                <span className="dialog__title">{product.title}</span>
                <span className="dialog__serial">{product.serialNumber}</span>
              </div>
            </div>
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
                dispatch(actions.remove(product.id));
              }}
            >
              <img
                src={delete_icon}
                alt="delete_icon"
              />
              удалить
            </button>
          </div>
        </Dialog>
      )}
    </>
  );
};
