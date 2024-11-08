import React from 'react';
import PropTypes from 'prop-types';
import { BurgerIngredientsItem } from './burger-ingredient-item/burger-ingredient-item';
import style from './burger-ingredients-list.module.css';

export const BurgerIngredientsList = ({ title, item, choiceItem }) => {
  return (
    <>
      <div className={style.title__ingredients}>
        <h3>{title}</h3>
      </div>
      <div className={style.ingredients__box}>
        {item.map((item, idx) => (
          <BurgerIngredientsItem key={idx} item={item} onClick={() => choiceItem(item)} />
        ))}
      </div>
    </>
  );
};
