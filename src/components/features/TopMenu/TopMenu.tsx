import React, { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import io from 'socket.io-client';
import clock from '../../assets/images/clock.png';
import styles from './TopMenu.module.scss';

moment.locale('ru');

export const TopMenu: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    setInterval(() => setTime(new Date()), 100);
  }, []);

  useEffect(() => {
    const socket = io('https://Demien92.github.io/dzencode_test_react');

    socket.on('sessionCount', (count: number) => {
      setSessionCount(count);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className={`${styles.head_menu}`}>
      <h1>
        Количество активных сессий:
        {sessionCount}
      </h1>

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
