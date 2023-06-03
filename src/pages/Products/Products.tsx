import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FilterProduct } from '../../components/features/FilterProduct';
import { ProductList } from '../../components/features/ProductsList';
import { TitleBlock } from '../../components/features/TitleBlock';
import { RootState } from '../../Redux/store';
import { Product } from '../../types';
import styles from './Products.module.scss';
import plus from '../../components/assets/images/plus.png';
import { actions as productActions } from '../../Redux/reducers/productReducer';

export const Products: React.FC = () => {
  const products = useSelector<RootState, Product[]>(state => state.product);
  const dispatch = useDispatch();

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

  const handleAddProducts = () => {
    const newProduct: Product = {
      id: products.length + 1,
      serialNumber: Math.floor(Math.random() * 10000),
      isNew: Math.random() > 0.5 ? 1 : 0,
      photo: 'pathToFile.jpg',
      title: 'Product 1',
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
      order: products.length + 1,
      date: generateRandomDate(),
    };

    dispatch(productActions.add(newProduct));
  };

  return (
    <>
      <div className={`${styles.product}`}>
        <div className={`${styles.product__title_block}`}>
          <button className={`${styles.product__add_btn}`} type="submit" onClick={handleAddProducts}>
            <img src={plus} alt="add_button" />
          </button>
          <TitleBlock name="Products" count={products.length} />
        </div>
        <FilterProduct />
      </div>
      <ProductList />
    </>
  );
};
