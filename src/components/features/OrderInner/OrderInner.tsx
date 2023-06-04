import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions as selectedOrderActions } from '../../../Redux/reducers/selectedOrderReduser';
import { RootState } from '../../../Redux/store';
import { OrdersToProducts, Product } from '../../../types';
import { OrderInnerItem } from '../OrderInnerItem';
import close_icon from '../../assets/images/close-icon.png';
import styles from './OrderInner.module.scss';
import { actions as productActions } from '../../../Redux/reducers/productReducer';

type Props = {
  orderProduct: OrdersToProducts | undefined;
};

export const OrderInner: React.FC<Props> = ({ orderProduct }) => {
  const dispatch = useDispatch();
  const currentProducts = orderProduct?.products;
  const selectedOrder = useSelector<RootState, { id: number }>(state => state.selectedOrder);

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

  const types = ['Monitors', 'Mobiles', 'Laptops'];
  const randomType = types[Math.floor(Math.random() * types.length)];
  const specifications = ['Specification 1', 'Specification 2', 'Specification 3'];
  const randomIndex = Math.floor(Math.random() * specifications.length);
  const randomSpecification = specifications[randomIndex];
  const generateRandomDate = () => {
    const start = new Date(2017, 5, 29, 12, 9, 33);
    const end = new Date(); // Текущая дата
    const randomTimestamp = start.getTime() + Math.random() * (end.getTime() - start.getTime());
    const randomDate = new Date(randomTimestamp);

    return randomDate.toISOString().slice(0, 19).replace('T', ' ');
  };

  const handleAdd = () => {
    const newProduct: Product = {
      id: currentProducts?.length ? currentProducts.length + 1 : 1,
      serialNumber: Math.floor(Math.random() * 10000),
      isNew: Math.random() > 0.5 ? 1 : 0,
      photo: 'pathToFile.jpg',
      title: `Product ${currentProducts?.length ? currentProducts.length + 1 : 1}`,
      type: randomType,
      specification: randomSpecification,
      guarantee: {
        start: generateRandomDate(),
        end: generateRandomDate(),
      },
      price: [
        { value: Math.floor(Math.random() * 1000), symbol: 'USD', isDefault: 0 },
        { value: Math.floor(Math.random() * 5000), symbol: 'UAH', isDefault: 1 },
      ],
      order: orderProduct?.id ?? -1,
      date: generateRandomDate(),
    };

    dispatch(productActions.add(newProduct));
  };

  console.log(orderProduct);

  return (
    <div className={`${styles.order_inner}`}>
      <div className={`${styles.order_inner__head}`}>
        <div className={`${styles.order_inner__head_title}`}>{orderProduct?.title}</div>
        <div className={`${styles.order_inner__head_add}`}>
          <button type="button" onClick={handleAdd}>
            +
          </button>
          <span>Добавить продукт</span>
        </div>
      </div>
      {currentProducts?.map(product => (
        <OrderInnerItem key={product.id} product={product} />
      ))}
      <button
        className={`${styles.order_inner__close}`}
        type="button"
        onClick={() => dispatch(selectedOrderActions.unselect())}
      >
        <img src={close_icon} alt="close_icon" />
      </button>
    </div>
  );
};
