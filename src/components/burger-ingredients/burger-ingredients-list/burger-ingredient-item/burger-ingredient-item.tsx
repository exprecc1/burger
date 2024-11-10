import React, { FunctionComponent } from 'react';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, Location } from 'react-router-dom';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../../../../utils/types';
import style from './burger-ingredient-item.module.css';

interface BurgerIngredientsItemProps {
  item: Ingredient;
}

interface IConstructorList {
  constructorList: {
    ingredients: Ingredient[];
  };
}

export const BurgerIngredientsItem: FunctionComponent<BurgerIngredientsItemProps> = ({ item }) => {
  const dragType = item.type === 'bun' ? 'bun' : 'ingredient';
  const navigate = useNavigate();
  const location: Location<string> = useLocation();

  const [{ isDragging }, drag] = useDrag({
    type: dragType,
    item: { id: item._id, ...item },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const ingredients = useSelector((state: IConstructorList) => state.constructorList.ingredients);

  const count = React.useMemo(() => {
    if (item.type === 'bun') {
      return ingredients.some((ingredient) => ingredient._id === item._id) ? 2 : 0;
    } else {
      return ingredients.filter((ingredient) => ingredient._id === item._id).length;
    }
  }, [ingredients, item._id, item.type]);

  const handleClick = () => {
    navigate(`/ingredient/${item._id}`, { state: { backgroundLocation: location } });
  };

  return (
    <div
      ref={drag}
      className={style.ingredients}
      onClick={handleClick}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {count > 0 ? <Counter count={count} size="default" extraClass="m-1" /> : null}
      <img src={item.image} alt={item.name} />
      <p>
        {item.price} <CurrencyIcon type="primary" />
      </p>
      <div className={style.ingredients__footer}>
        <p>{item.name}</p>
      </div>
    </div>
  );
};
