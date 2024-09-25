import React from 'react';
import PropTypes from 'prop-types';
import { IngredientType } from '../../../../utils/types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-ingredient-item.module.css';

export const BurgerIngredientsitem = ({ onClick, item }) => {
  return (
    <div className={style.ingredients} onClick={onClick}>
      <Counter count={1} size="default" extraClass="m-1" />
      <img src={item.image} alt={item.name} />
      <p>
        {item.price} <CurrencyIcon />
      </p>
      <div className={style.ingredients__footer}>
        <p>{item.name}</p>
      </div>
    </div>
  );
};

BurgerIngredientsitem.propTypes = {
  onClick: PropTypes.func.isRequired,
  item: IngredientType.isRequired,
};
