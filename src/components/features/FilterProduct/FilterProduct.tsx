import React, { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  SearchTypes as types,
  SearchSpecification as specification,
} from '../../../types';
import styles from './FilterProduct.module.scss';

export const FilterProduct: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleTypeFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    if (value) {
      searchParams.set('type', value);
    } else {
      searchParams.delete('type');
    }

    setSearchParams(searchParams);
  };

  const handleSpecificationFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    if (value) {
      searchParams.set('specification', value);
    } else {
      searchParams.delete('specification');
    }

    setSearchParams(searchParams);
  };

  return (
    <div className={`${styles.filter}`}>
      <div className={`${styles.filter__select}`}>
        <span>type</span>
        <select name="type" onChange={handleTypeFilter}>
          <option value="">All Types</option>
          {Object.entries(types).map(([name, value]) => (
            <option key={name} value={value}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div className={`${styles.filter__select}`}>
        <span>specification</span>
        <select name="specification" onChange={handleSpecificationFilter}>
          <option value="">All Specifications</option>
          {Object.entries(specification).map(([name, value]) => (
            <option key={name} value={value}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
