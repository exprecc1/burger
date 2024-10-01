import React from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { IngredientType } from '../../../../utils/types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-ingredient-item.module.css';

export const BurgerIngredientsitem = ({ onClick, item }) => {
  // Перетаскивание текущего item
  const [{ isDragging }, drag] = useDrag({
    type: 'ingredient',
    item: { id: item._id, ...item }, // Передаем весь объект ингредиента
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  //Счетчик
  const { ingredientCounts } = useSelector((state) => state.constructorList);
  const count = ingredientCounts[item._id] || 0;

  return (
    <div
      ref={drag}
      className={style.ingredients}
      onClick={onClick}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {count > 0 ? <Counter count={count} size="default" extraClass="m-1" /> : null}
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
