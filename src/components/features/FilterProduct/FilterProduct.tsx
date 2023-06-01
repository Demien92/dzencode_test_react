import React, { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchTypes as types, SearchSpecification as specification } from '../../../types';
import styles from './FilterProduct.module.scss';

export const FilterProduct: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleTypeFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;
    const newSearchParams = new URLSearchParams(searchParams);

    if (value) {
      newSearchParams.set('type', value);
    } else {
      newSearchParams.delete('type');
    }

    setSearchParams(newSearchParams);
  };

  const handleSpecificationFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (value) {
      newSearchParams.set('specification', value);
    } else {
      newSearchParams.delete('specification');
    }

    setSearchParams(newSearchParams);
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
