import React, { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import clock from '../../assets/images/clock.png';
import styles from './HeaderMenu.module.scss';

moment.locale('ru');

export const HeaderMenu: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => setTime(new Date()), 100);
  }, []);

  return (
    <div className={`${styles.head_menu}`}>
      <div className={`${styles.head_menu__line}`}>
        <span>{moment().format('dddd')}</span>
      </div>
      <div className={`${styles.head_menu__line}`}>
        <span className={`${styles.head_menu__data}`}>
          {moment().format('DD MMM, YYYY')}
        </span>
        <img
          className={`${styles.head_menu__icon}`}
          src={clock}
          alt="icon"
        />
        <span>
          {moment(time.getTime()).format('LT')}
        </span>
      </div>
    </div>
  );
};
