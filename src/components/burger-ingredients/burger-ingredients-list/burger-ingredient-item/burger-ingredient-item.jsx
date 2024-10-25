import React from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { IngredientType } from '../../../../utils/types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-ingredient-item.module.css';

export const BurgerIngredientsItem = ({ onClick, item }) => {
  const dragType = item.type === 'bun' ? 'bun' : 'ingredient';

  const [{ isDragging }, drag] = useDrag({
    type: dragType,
    item: { id: item._id, ...item },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const ingredients = useSelector((state) => state.constructorList.ingredients);

  const count = React.useMemo(() => {
    if (item.type === 'bun') {
      return ingredients.some((ingredient) => ingredient._id === item._id) ? 2 : 0;
    } else {
      return ingredients.filter((ingredient) => ingredient._id === item._id).length;
    }
  }, [ingredients, item._id, item.type]);

  const location = useLocation();

  return (
    <Link to={`/ingredient/${item._id}`} state={{ backgroundLocation: location }}>
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
    </Link>
  );
};

BurgerIngredientsItem.propTypes = {
  item: IngredientType.isRequired,
};
