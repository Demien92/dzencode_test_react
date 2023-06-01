import React, { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import CounterComponent from '../CounterComponent/CounterComponent';
import clock from '../../assets/images/clock.png';
import styles from './TopMenu.module.scss';

moment.locale('ru');

export const TopMenu: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => setTime(new Date()), 100);
  }, []);

  return (
    <div className={`${styles.head_menu}`}>
      <CounterComponent />
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
