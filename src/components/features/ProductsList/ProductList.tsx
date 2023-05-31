import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { actions as productActions } from '../../../Redux/reducers/productReducer';
import { RootState } from '../../../Redux/store';
import { getFilteredProducts } from '../../../utils';
import { getCurrentProduct } from '../../../utils/getCurrentProduct';
import { Dialog } from '../Dialog';
import { ProductItem } from '../ProductItem';
import monitor from '../../assets/images/monitor.png';
import delete_icon from '../../assets/images/delete.webp';
import styles from './ProductList.module.scss';

export const ProductList: React.FC = () => {
  const [dialog, setDialog] = useState(false);
  const [idToDelete, setIdToDelete] = useState(0);
  const dispatch = useDispatch();

  const handleDeleteProduct = (productId: number) => {
    setDialog(true);
    setIdToDelete(productId);
  };

  const products = useSelector<RootState>(state => state.product) as [];
  const [searchParams] = useSearchParams();

  const type = searchParams.get('type') || '';
  const specification = searchParams.get('specification') || '';
  const query = searchParams.get('query') || '';

  const filteredProducts = getFilteredProducts(
    products,
    query,
    type,
    specification,
  );

  const itemToDelete = getCurrentProduct(filteredProducts, idToDelete);

  return (
    <>
      <div className={`${styles.product_list}`}>
        {filteredProducts.map(product => (
          <ProductItem
            key={product.id}
            producty={product}
            onDelete={() => handleDeleteProduct(product.id)}
          />
        ))}
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
                <span className="dialog__title">{itemToDelete?.title}</span>
                <span className="dialog__serial">{itemToDelete?.serialNumber}</span>
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
                dispatch(productActions.remove(idToDelete));
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
