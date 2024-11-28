import React, { useEffect, useState } from 'react';
import style from './order-structure.module.css';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../../services/store';
import { getOrders } from '../../../services/slices/order-feed/slice';
import { Ingredient } from '../../../utils/types';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { request } from '../../../utils/request';

export const OrderStructureModal: React.FC = () => {
  const { number } = useParams<{ number: string }>();
  const orders = useSelector(getOrders);
  const { items } = useSelector((state) => state.ingredientsAll);
  const [order, setOrder] = useState<any>(null);

  // Создание ingredientsMap с использованием forEach
  const ingredientsMap: { [key: string]: Ingredient } = {};
  items.forEach((elem) => {
    ingredientsMap[elem._id] = elem;
  });

  useEffect(() => {
    // Поиск заказа по номеру
    const foundOrder = orders.find((order) => order.number === parseInt(number, 10));
    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      // Загрузка заказа с сервера, если он не найден в состоянии
      request(`/orders/${number}`)
        .then((data) => setOrder(data.orders[0]))
        .catch((error) => console.error(error));
    }
  }, [number, orders]);

  if (!order) {
    return <div>Заказ не найден</div>;
  }

  return (
    <div className={style.modal__content__order_structure}>
      <div className={style.title__order_structure}>
        <p className={style.order__number}>#{order.number}</p>
        <p className={style.order__name}>{order.name}</p>
        <p
          className={`${style.order__status} ${
            order.status === 'done' ? style.order__status_done : style.order__status_pending
          }`}
        >
          {order.status === 'done' ? 'Выполнен' : 'В процессе'}
        </p>
      </div>
      <div className={style.order__details}>
        <p className={style.order__structure__title}>Состав:</p>
        <div className={style.ingredients__list}>
          {order.ingredients.map((ingredientId: string, index: number) => {
            const ingredient = ingredientsMap[String(ingredientId)];
            if (!ingredient) return null;
            return (
              <div key={index} className={style.ingredient__item}>
                <div className={style.ingredient__image_wrapper}>
                  <img src={ingredient.image} alt={ingredient.name} />
                </div>
                <p className={style.ingredient}>{ingredient.name}</p>
                <div className={style.ingredient__price}>
                  <p className={style.price}>{ingredient.price}</p>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            );
          })}
        </div>
        <div className={style.order__info}>
          <p className={style.date}>
            <FormattedDate date={new Date(order.createdAt)} />
          </p>
          <div className={style.order__total}>
            <p className="text text_type_digits-default">
              {order.ingredients.reduce((total: number, ingredientId: string) => {
                const ingredient = ingredientsMap[String(ingredientId)];
                return total + (ingredient?.price || 0);
              }, 0)}
            </p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
};
