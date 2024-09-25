import React from 'react';
import style from './burger-constructor-modal.module.css';
import orderNum from '../../../image/orderNumber.png';
import done from '../../../image/done.png';

export const OrderDetails = () => {
  return (
    <div className={style.modal__content__order}>
      <img src={orderNum} alt="order number" />
      <div className={style.id__text}>
        <h3>идентификатор заказа</h3>
      </div>
      <img src={done} alt="done" />
      <p className={style.order__text}>Ваш заказ начали готовить</p>
      <p className={style.order__ready__text}>Дождитесь готовности на орбитальной станции</p>
    </div>
  );
};
