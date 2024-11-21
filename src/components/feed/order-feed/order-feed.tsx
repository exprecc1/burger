import React from 'react';
import style from './order-feed.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { IngredientState } from '../../../services/slices/all-ingredients/slice';

export const FeedOrder: React.FC = () => {
  const today = new Date();
  const ingredients = useSelector(
    (state: { ingredientsAll: IngredientState }) => state.ingredientsAll.items,
  );
  const ingredient = ingredients[0];

  return (
    <>
      <div className={style.feed__container}>
        <div className={style.feed__block}>
          <div className={style.order__data}>
            <div className={style.order__num}>
              <p className="text text_type_digits-default">#1232352</p>
            </div>
            <div className={style.order__date}>
              <FormattedDate
                date={
                  new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                    today.getHours(),
                    today.getMinutes() - 1,
                    0,
                  )
                }
              />
            </div>
          </div>
          <div className={style.order__title}>
            <p>Качественный бургер</p>
          </div>
          <div className={style.order__box}>
            <div className={style.order__ingredient}>
              <div className={style.order__item}>
                <div className={style.image__wrapper}>
                  <img src={ingredient.image} alt="Ingredient 1" />
                </div>
                <div className={style.image__wrapper}>
                  <img src={ingredient.image} alt="Ingredient 2" />
                </div>
                <div className={style.image__wrapper}>
                  <img src={ingredient.image} alt="Ingredient 3" />
                </div>
                <div className={style.image__wrapper}>
                  <img src={ingredient.image} alt="Ingredient 4" />
                </div>
                <div className={style.image__wrapper}>
                  <img src={ingredient.image} alt="Ingredient 4" />
                </div>
              </div>
            </div>
            <div className={style.order__price}>
              <p>10</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
        <div className={style.feed__block}>
          <div className={style.order__data}>
            <div className={style.order__num}>
              <p className="text text_type_digits-default">#1232352</p>
            </div>
            <div className={style.order__date}>
              <FormattedDate
                date={
                  new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                    today.getHours(),
                    today.getMinutes() - 1,
                    0,
                  )
                }
              />
            </div>
          </div>
          <div className={style.order__title}>
            <p>Качественный бургер</p>
          </div>
          <div className={style.order__box}>
            <div className={style.order__ingredient}>
              <div className={style.order__item}>
                <div className={style.image__wrapper}>
                  <img src={ingredient.image} alt="Ingredient 1" />
                </div>
                <div className={style.image__wrapper}>
                  <img src={ingredient.image} alt="Ingredient 2" />
                </div>
                <div className={style.image__wrapper}>
                  <img src={ingredient.image} alt="Ingredient 3" />
                </div>
                <div className={style.image__wrapper}>
                  <img src={ingredient.image} alt="Ingredient 4" />
                </div>
                <div className={style.image__wrapper}>
                  <img src={ingredient.image} alt="Ingredient 4" />
                </div>
              </div>
            </div>
            <div className={style.order__price}>
              <p>10</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
        <div className={style.feed__block}>
          <div className={style.order__data}>
            <div className={style.order__num}>
              <p className="text text_type_digits-default">#1232352</p>
            </div>
            <div className={style.order__date}>
              <FormattedDate
                date={
                  new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                    today.getHours(),
                    today.getMinutes() - 1,
                    0,
                  )
                }
              />
            </div>
          </div>
          <div className={style.order__title}>
            <p>Качественный бургер</p>
          </div>
          <div className={style.order__box}>
            <div className={style.order__ingredient}>
              <div className={style.order__item}>
                <div className={style.image__wrapper}>
                  <img src={ingredient.image} alt="Ingredient 1" />
                </div>
                <div className={style.image__wrapper}>
                  <img src={ingredient.image} alt="Ingredient 2" />
                </div>
                <div className={style.image__wrapper}>
                  <img src={ingredient.image} alt="Ingredient 3" />
                </div>
                <div className={style.image__wrapper}>
                  <img src={ingredient.image} alt="Ingredient 4" />
                </div>
                <div className={style.image__wrapper}>
                  <img src={ingredient.image} alt="Ingredient 4" />
                </div>
              </div>
            </div>
            <div className={style.order__price}>
              <p>10</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
        <div className={style.feed__block}>
          <div className={style.order__data}>
            <div className={style.order__num}>
              <p className="text text_type_digits-default">#1232352</p>
            </div>
            <div className={style.order__date}>
              <FormattedDate
                date={
                  new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                    today.getHours(),
                    today.getMinutes() - 1,
                    0,
                  )
                }
              />
            </div>
          </div>
          <div className={style.order__title}>
            <p>Качественный бургер</p>
          </div>
          <div className={style.order__box}>
            <div className={style.order__ingredient}>
              <div className={style.order__item}>
                <div className={style.image__wrapper}>
                  <img src={ingredient.image} alt="Ingredient 1" />
                </div>
                <div className={style.image__wrapper}>
                  <img src={ingredient.image} alt="Ingredient 2" />
                </div>
                <div className={style.image__wrapper}>
                  <img src={ingredient.image} alt="Ingredient 3" />
                </div>
                <div className={style.image__wrapper}>
                  <img src={ingredient.image} alt="Ingredient 4" />
                </div>
                <div className={style.image__wrapper}>
                  <img src={ingredient.image} alt="Ingredient 4" />
                </div>
              </div>
            </div>
            <div className={style.order__price}>
              <p>10</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
