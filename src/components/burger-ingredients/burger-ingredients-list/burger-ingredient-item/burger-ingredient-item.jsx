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
  // Получаем список ингредиентов из Redux
  const ingredients = useSelector((state) => state.constructorList.ingredients);

  // Вычисляем количество текущего ингредиента
  const count = React.useMemo(() => {
    if (item.type === 'bun') {
      // Если это булка, то количество всегда 2
      return ingredients.some((ingredient) => ingredient._id === item._id) ? 2 : 0;
    } else {
      // Для других ингредиентов считаем количество
      return ingredients.filter((ingredient) => ingredient._id === item._id).length;
    }
  }, [ingredients, item._id, item.type]);

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
