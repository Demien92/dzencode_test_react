import React from 'react';
import { NavLink } from 'react-router-dom';
import avatar from '../../assets/images/avatar.png';
import settings from '../../assets/images/settings.png';
import styles from './SideBar.module.scss';

export const SideBar: React.FC = () => {
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
        <NavLink to="/сoming">Приход</NavLink>
        <NavLink to="/groups">Группы</NavLink>
        <NavLink to="/products">Продукты</NavLink>
        <NavLink to="/users">Пользователи</NavLink>
        <NavLink to="/settings">Настройки</NavLink>
      </div>
    </div>
  );
};
