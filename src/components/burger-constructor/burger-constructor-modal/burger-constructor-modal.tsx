import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import style from './burger-constructor-modal.module.css';
import done from '../../../image/done.png';
import { OrderState } from '../../../utils/types';

interface Order extends OrderState {
  orderNumber: number;
  error: string;
  status: 'loading' | 'failed' | 'succeeded';
}

export const OrderDetails: FunctionComponent = () => {
  const { orderNumber, status, error } = useSelector((state: { order: Order }) => state.order);
  console.log(orderNumber, status, error);

  if (status === 'loading') {
    return <div className={style.loading}>Загрузка....</div>;
  }

  if (status === 'failed') {
    return <div className={style.error}>Ошибка в оформлении заказа {error}</div>;
  }

  return (
    <div className={style.modal__content__order}>
      <span className={style.orderNum}>{orderNumber}</span>
      <div className={style.id__text}>
        <h3>идентификатор заказа</h3>
      </div>
      <img src={done} alt="done" />
      <p className={style.order__text}>Ваш заказ начали готовить</p>
      <p className={style.order__ready__text}>Дождитесь готовности на орбитальной станции</p>
    </div>
  );
};