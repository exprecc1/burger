import React from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon, Tab, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientType } from '../../utils/types';
import style from './burger-ingredients.module.css';

export const BurgerIngredients = ({ ingredients, choiceItem }) => {
  const [current, setCurrent] = React.useState('one');
  const bun = ingredients.filter((obj) => obj.type.includes('bun'));
  const sauce = ingredients.filter((obj) => obj.type.includes('sauce'));
  const stuff = ingredients.filter((obj) => obj.type.includes('main'));
  return (
    <div className={style.burger_components}>
      <div style={{ display: 'flex' }}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          One
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Two
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Three
        </Tab>
      </div>
      <div className={style.burger__ingredients}>
        <div className={style.title__ingredients}>
          <h3>Булки</h3>
        </div>
        <div className={style.ingredients__box}>
          {bun.map((item, idx) => {
            return (
              <div className={style.ingredients} key={idx} onClick={() => choiceItem(item)}>
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
          })}
        </div>
        <div className={style.title__ingredients}>
          <h3>Соусы</h3>
        </div>
        <div className={style.ingredients__box}>
          {sauce.map((item, idx) => {
            return (
              <div className={style.ingredients} key={idx} onClick={() => choiceItem(item)}>
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
          })}
        </div>
        <div className={style.title__ingredients}>
          <h3>Начинки</h3>
        </div>
        <div className={style.ingredients__box}>
          {stuff.map((item, idx) => {
            return (
              <div className={style.ingredients} key={idx} onClick={() => choiceItem(item)}>
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
          })}
        </div>
      </div>
    </div>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(IngredientType.isRequired),
  choiceItem: PropTypes.func.isRequired,
};
