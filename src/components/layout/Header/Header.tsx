import React, { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HeaderMenu } from '../../features/HeaderMenu';
import logo from '../../assets/images/logo.png';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const [search, setSearch] = useSearchParams();

  const handleQueryFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value) {
      search.set('query', value);
    } else {
      search.delete('query');
    }

    setSearch(search);
  };

  return (
    <header className={`${styles.header}`}>
      <div className={`${styles.header__container}`}>
        <div className={`${styles.header__logo} pulse`}>
          <img src={logo} alt="logo" />
          inventory
        </div>
        <div>
          <input
            className={`${styles.header__search}`}
            type="text"
            placeholder="Поиск"
            onChange={handleQueryFilter}
          />
        </div>
        <HeaderMenu />
      </div>
    </header>
  );
};
