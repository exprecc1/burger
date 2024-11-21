import React from 'react';
import style from './order-all.module.css';
export const AllOrder: React.FC = () => {
  return (
    <div className={style.allOrder__container}>
      <div className={style.allOrder__box__status}>
        <div className={style.allOrder__box__ready}>
          <p className={style.title}>Готовы</p>
          <div className={`${style.allOrder__box__inReady__bar} ${style.column_2}`}>
            <p>32123</p>
            <p>32123</p>
            <p>32123</p>
            <p>32123</p>
            <p>32123</p>
            <p>32123</p>
            <p>32123</p>
            <p>32123</p>
            <p>32123</p>
            <p>32123</p>
          </div>
        </div>
        <div className={style.allOrder__box__inProgress}>
          <p className={style.title}>В работе</p>
          <div className={`${style.allOrder__box__inProgress__bar} ${style.column_1}`}>
            <p>32123</p>
          </div>
        </div>
      </div>
      <div className={style.allOrder__box__allTime__count}>
        <div className={style.allOrder__box__allTime__count__title}>
          <p>Выполнено за все время:</p>
        </div>
        <div className={style.allOrder__box__allTime__count__time}>
          <p>28 752</p>
        </div>
      </div>
      <div className={style.allOrder__box__toDay__count}>
        <div className={style.allOrder__box__toDay__count__title}>
          <p>Выполнено за сегодня:</p>
        </div>
        <div className={style.allOrder__box__toDay__count__time}>
          <p className="text text_type_digits-large">138</p>
        </div>
      </div>
    </div>
  );
};
