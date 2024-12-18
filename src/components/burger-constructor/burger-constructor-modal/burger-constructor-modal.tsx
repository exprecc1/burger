import React, { FunctionComponent } from 'react';
import { useSelector } from '../../../services/store';
import style from './burger-constructor-modal.module.css';
import done from '../../../image/done.png';

export const OrderDetails: FunctionComponent = () => {
  const { orderNumber, status, error } = useSelector((state) => state.order);

  if (status === 'loading') {
    return <div className={style.loading}>Загрузка....</div>;
  }

  if (status === 'failed') {
    return <div className={style.error}>Ошибка в оформлении заказа {error}</div>;
  }

  return (
    <div className={style.modal__content__order}>
      <span className={style.orderNum} data-cy="modal-order">
        {orderNumber}
      </span>
      <div className={style.id__text}>
        <h3>идентификатор заказа</h3>
      </div>
      <img src={done} alt="done" />
      <p className={style.order__text}>Ваш заказ начали готовить</p>
      <p className={style.order__ready__text}>Дождитесь готовности на орбитальной станции</p>
    </div>
  );
};
