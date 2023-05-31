import React from 'react';
import styles from './TitleBlock.module.scss';

type Props = {
  name: string;
  count: number;
};

export const TitleBlock: React.FC<Props> = ({ name, count }) => {
  return (
    <div className={`${styles.title}`}>
      <span className={`${styles.title__name}`}>{ name }</span>
      <span className={`${styles.title__line}`}>/</span>
      <span className={`${styles.title__count}`}>{ count }</span>
    </div>
  );
};
