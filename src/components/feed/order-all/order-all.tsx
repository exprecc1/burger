import React from 'react';
import style from './order-all.module.css';
import { useSelector } from '../../../services/store';
import { getOrders, getStatus } from '../../../services/slices/order-feed/slice';

export const AllOrder: React.FC = () => {
  const orders = useSelector(getOrders);
  const { total, totalToday } = useSelector((state) => state.OrderFeed);

  // Разделение заказов на "Готовы" и "В работе"
  const readyOrders = orders
    .filter((order) => order.status === 'done')
    .map((order) => order.number)
    .slice(0, 10);
  const inProgressOrders = orders
    .filter((order) => order.status === 'pending')
    .map((order) => order.number)
    .slice(0, 10);

  return (
    <div className={style.allOrder__container}>
      <div className={style.allOrder__box__status}>
        <div className={style.allOrder__box__ready}>
          <p className={style.title}>Готовы</p>
          <div className={`${style.allOrder__box__inReady__bar} ${style.column_2}`}>
            {readyOrders.map((orderNumber) => (
              <p key={orderNumber}>{orderNumber}</p>
            ))}
          </div>
        </div>
        <div className={style.allOrder__box__inProgress}>
          <p className={style.title}>В работе</p>
          <div className={`${style.allOrder__box__inProgress__bar} ${style.column_1}`}>
            {inProgressOrders.map((orderNumber) => (
              <p key={orderNumber}>{orderNumber}</p>
            ))}
          </div>
        </div>
      </div>
      <div className={style.allOrder__box__allTime__count}>
        <div className={style.allOrder__box__allTime__count__title}>
          <p>Выполнено за все время:</p>
        </div>
        <div className={style.allOrder__box__allTime__count__time}>
          <p>{total}</p>
        </div>
      </div>
      <div className={style.allOrder__box__toDay__count}>
        <div className={style.allOrder__box__toDay__count__title}>
          <p>Выполнено за сегодня: {totalToday}</p>
        </div>
        <div className={style.allOrder__box__toDay__count__time}>
          <p className="text text_type_digits-large">{totalToday}</p>
        </div>
      </div>
    </div>
  );
};
