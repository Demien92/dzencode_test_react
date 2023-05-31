import React from 'react';
import { useSelector } from 'react-redux';
import { FilterProduct } from '../../components/features/FilterProduct';
import { ProductList } from '../../components/features/ProductsList';
import { TitleBlock } from '../../components/features/TitleBlock';
import { RootState } from '../../Redux/store';
import { Product } from '../../types';
import styles from './Products.module.scss';

export const Products: React.FC = () => {
  const products = useSelector<RootState>(state => state.product) as Product[];

  return (
    <>
      <div className={`${styles.product}`}>
        <TitleBlock name="Products" count={products.length} />
        <FilterProduct />
      </div>
      <ProductList />
    </>
  );
};
