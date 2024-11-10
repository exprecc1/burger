import React, { FunctionComponent } from 'react';
import { BurgerIngredientsItem } from './burger-ingredient-item/burger-ingredient-item';
import { Ingredient } from '../../../utils/types';
import style from './burger-ingredients-list.module.css';

interface BurgerIngredientsListProps {
  title: string;
  item: Ingredient[];
  choiceItem: (item: Ingredient) => void;
}

export const BurgerIngredientsList: FunctionComponent<BurgerIngredientsListProps> = ({
  title,
  item,
}) => {
  return (
    <>
      <div className={style.title__ingredients}>
        <h3>{title}</h3>
      </div>
      <div className={style.ingredients__box}>
        {item.map((item, idx) => (
          <BurgerIngredientsItem key={idx} item={item} />
        ))}
      </div>
    </>
  );
};
