import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../../Redux/reducers/productReducer';
import { Product } from '../../../types';
import { Dialog } from '../Dialog';
import monitor from '../../assets/images/monitor.png';
import deleteIcon from '../../assets/images/delete.png';
import styles from './OrderInnerItem.module.scss';

type Props = {
  product: Product;
};

export const OrderInnerItem: React.FC<Props> = ({ product }) => {
  const [dialog, setDialog] = useState(false);
  const dispatch = useDispatch();

  const isRepair = product.isNew === 1;

  return (
    <>
      <div className={`${styles.order_inner}`} key={product.id}>
        <div className="list-item__container">
          <div className="list-item__status__icon"></div>
          <div className="list-item__image">
            <img
              src={monitor}
              width="30px"
              alt="group_image"
            />
          </div>
          <div className="list-item__title">
            <h3 className="list-item__text">
              {product.type}
            </h3>
            <span className="list-item__serialNumber">
              {product.serialNumber}
            </span>
          </div>
        </div>
        <div className="list-item__status">
          {isRepair
            ? 'In service'
            : 'Free'}
        </div>
        <button
          type="button"
          className="delete-button"
          onClick={() => setDialog(true)}
        >
          <img
            src={deleteIcon}
            height="15px"
            alt="delete icon"
          />
        </button>
      </div>
      {dialog && (
        <Dialog onClose={() => setDialog(false)}>
          <div className="modal__content-wrapper">
            <div className="list-item__modal">
              <div className="list-item__status__icon"></div>
              <div className="list-item__image">
                <img
                  src={monitor}
                  width="30px"
                  alt="group_image"
                />
              </div>
              <div className="list-item__title">
                <h3 className="list-item__title-text">
                  {product.type}
                </h3>
                <span className="list-item__serialNumber">
                  {product.serialNumber}
                </span>
              </div>
            </div>
          </div>
          <div className="modal__button-container">
            <button
              className="modal__button modal__button--cancel"
              type="button"
              onClick={() => {
                setDialog(false);
              }}
            >
              cancel
            </button>
            <button
              className="modal__button modal__button--delete"
              type="button"
              onClick={() => {
                setDialog(false);
                dispatch(actions.remove(product.id));
              }}
            >
              <img
                src={deleteIcon}
                height="13px"
                alt="delete icon"
              />
              {' '}
              delete
            </button>
          </div>
        </Dialog>
      )}
    </>
  );
};
