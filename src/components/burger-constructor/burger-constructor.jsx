import React from 'react';
import PropTypes from 'prop-types';
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientType } from '../../utils/types';
import style from './burger-constructor.module.css';
export const BurgerConstructor = ({ onOpen, item }) => {
  const bun = item.filter((obj) => obj.type.includes('bun'));
  return (
    <div className="builder">
      <div className={style.builder__content}>
        <div className={style.builder__box}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={bun.length > 0 ? bun[0].image : null}
          />
        </div>
        <div className={style.builder__ingredients}>
          {item.map((item) => {
            return (
              <div className={style.builder__box} key={item._id}>
                <DragIcon type="primary" className="pl-0 pr-2 pb-0 pt-0" />
                <ConstructorElement
                  type="undefined"
                  isLocked={false}
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </div>
            );
          })}
        </div>
        <div className={style.builder__box}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={bun.length > 0 ? bun[0].image : null}
          />
        </div>
      </div>
      <div className={style.builder__footer}>
        <div className={style.final__price}>
          <p>
            610
            <CurrencyIcon type="primary" />
          </p>
        </div>
        <Button onClick={() => onOpen()} htmlType="button" type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

BurgerConstructor.propTypes = {
  onOpen: PropTypes.func.isRequired,
  item: PropTypes.arrayOf(IngredientType.isRequired).isRequired,
};
