import React from 'react';
import style from './order-feed.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../../services/store';
import { getOrders } from '../../../services/slices/order-feed/slice';
import { Ingredient } from '../../../utils/types';

export const FeedOrder: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orders = useSelector(getOrders);
  const { items } = useSelector((state) => state.ingredientsAll);

  // Создание ingredientsMap с использованием forEach
  const ingredientsMap: { [key: string]: Ingredient } = {};
  items.forEach((elem) => {
    ingredientsMap[elem._id] = elem;
  });

  // Выбор первых 10 заказов
  const firstTenOrders = orders.slice(0, 10);

  const handleClick = (number: number) => {
    navigate(`/feed/${number}`, { state: { backgroundLocation: location } });
  };

  return (
    <div className={style.feed__container}>
      {firstTenOrders.map((order) => (
        <div
          key={order._id}
          className={style.feed__block}
          onClick={() => handleClick(order.number)}
        >
          <div className={style.order__data}>
            <div className={style.order__num}>
              <p className="text text_type_digits-default">#{order.number}</p>
            </div>
            <div className={style.order__date}>
              <FormattedDate date={new Date(order.createdAt)} />
            </div>
          </div>
          <div className={style.order__title}>
            <p>{order.name}</p>
          </div>
          <div className={style.order__box}>
            <div className={style.order__ingredient}>
              <div className={style.order__item}>
                {order.ingredients.slice(0, 5).map((ingredientId, index) => {
                  const ingredient = ingredientsMap[String(ingredientId)];
                  if (!ingredient) return null;
                  return (
                    <div key={index} className={style.image__wrapper}>
                      <img src={ingredient.image} alt={`Ingredient ${index + 1}`} />
                    </div>
                  );
                })}
                {order.ingredients.length > 5 && (
                  <div className={style.image__wrapper}>
                    <p className="text text_type_main-default">+{order.ingredients.length - 5}</p>
                  </div>
                )}
              </div>
            </div>
            <div className={style.order__price}>
              <p className="text text_type_digits-default">
                {order.ingredients.reduce((total, ingredientId) => {
                  const ingredient = ingredientsMap[String(ingredientId)];
                  return total + (ingredient?.price || 0);
                }, 0)}
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
