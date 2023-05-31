import React from 'react';
import { NavLink } from 'react-router-dom';
import avatar from '../../assets/images/avatar.png';
import settings from '../../assets/images/settings.png';
import styles from './NavigationMenu.module.scss';

export const NavigationMenu: React.FC = () => {
  return (
    <div className={`${styles.side_bar}`}>
      <div className={`${styles.side_bar__avatar}`}>
        <img
          src={avatar}
          alt="avatar"
          className={`${styles.side_bar__avatar_icon}`}
        />
        <span className={`${styles.side_bar__avatar_settings}`}>
          <img
            src={settings}
            width="15px"
            alt="settings"
          />
        </span>
      </div>
      <div className={`${styles.side_bar__list}`}>
        <NavLink to="/orders">Orders</NavLink>
        <NavLink to="/products">Products</NavLink>
      </div>
    </div>
  );
};
