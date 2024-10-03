import React from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderDetails } from './burger-constructor-modal/burger-constructor-modal';
import { Modal } from '../modal/modal';
import { useModal } from '../../hooks/useModal';
import { addIngredient, removeIngredient } from '../../services/slices/constructor-list/slice';
import { submitOrder } from '../../services/slices/order-details/slice';
import style from './burger-constructor.module.css';

export const BurgerConstructor = () => {
  const { isModal, openModal, closeModal } = useModal();
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.constructorList.ingredients);

  const bun = ingredients.filter((obj) => obj.type.includes('bun'));
  const nonBunIngredients = ingredients.filter((obj) => obj.type !== 'bun');

  const handleDrop = (item) => dispatch(addIngredient(item));
  const handleRemoveIngredient = (id) => dispatch(removeIngredient({ _id: id }));

  React.useEffect(() => {
    console.log('Ingredients changed:', ingredients);
  }, [ingredients]);

  // Подсчет общей стоимости с учетом двух булок
  const totalPrice = React.useMemo(() => {
    const bunPrice = bun.length ? bun[0].price * 2 : 0;
    const nonBunPrice = nonBunIngredients.reduce((total, item) => total + item.price, 0);
    return bunPrice + nonBunPrice;
  }, [bun, nonBunIngredients]);

  // Приемка ингредиентов для булок
  const [{ isOver: isOverBunTop }, dropBunTop] = useDrop({
    accept: 'ingredient',
    drop: (item) => {
      if (item.type === 'bun') {
        handleDrop(item);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const [{ isOver: isOverBunBottom }, dropBunBottom] = useDrop({
    accept: 'ingredient',
    drop: (item) => {
      if (item.type === 'bun') {
        handleDrop(item);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  // Приемка ингредиентов для начинки
  const [{ isOver: isOverIngredients }, dropIngredients] = useDrop({
    accept: 'ingredient',
    drop: (item) => {
      if (item.type !== 'bun') {
        handleDrop(item);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  //Отправка заказа
  const handleOrderSubmit = () => {
    const ingredientIds = ingredients.map((ingredient) => ingredient._id);
    dispatch(submitOrder(ingredientIds));
    openModal();
  };

  return (
    <div className="builder">
      <div className={style.builder__content}>
        <div
          className={isOverBunTop ? style.empty__top__drop : style.builder__box}
          ref={dropBunTop}
        >
          {bun.length > 0 ? (
            bun.map((item, idx) => (
              <ConstructorElement
                key={idx}
                type="top"
                isLocked={true}
                text={`${item.name} (верх)`}
                price={item.price}
                thumbnail={item.image}
              />
            ))
          ) : (
            <div className={style.empty__top}>
              <div className={style.empty__text}>Добавьте булочку</div>
            </div>
          )}
        </div>
        <div
          className={isOverIngredients ? style.empty__drop : style.builder__ingredients}
          ref={dropIngredients}
        >
          {nonBunIngredients.length > 0 ? (
            nonBunIngredients.map((item, idx) => {
              return (
                <div className={style.builder__box} key={idx}>
                  <DragIcon type="primary" className="pl-0 pr-2 pb-0 pt-0" />
                  <ConstructorElement
                    type="undefined"
                    isLocked={false}
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                    handleClose={() => handleRemoveIngredient(item._id)}
                  />
                </div>
              );
            })
          ) : (
            <div className={style.empty}>
              <div className={style.empty__text}>Добавьте ингредиенты</div>
            </div>
          )}
        </div>
        <div
          className={isOverBunBottom ? style.empty__bottom__drop : style.builder__box}
          ref={dropBunBottom}
        >
          {bun.length > 0 ? (
            bun.map((item, idx) => (
              <ConstructorElement
                key={idx}
                type="bottom"
                isLocked={true}
                text={`${item.name} (низ)`}
                price={item.price}
                thumbnail={item.image}
              />
            ))
          ) : (
            <div className={style.empty__bottom}>
              <div className={style.empty__text}>Добавьте булочку</div>
            </div>
          )}
        </div>
      </div>
      <div className={style.builder__footer}>
        <div className={style.final__price}>
          <p>
            {totalPrice}
            <CurrencyIcon type="primary" />
          </p>
        </div>
        <Button onClick={handleOrderSubmit} htmlType="button" type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
      <Modal isVisible={isModal} onClose={closeModal}>
        <OrderDetails />
      </Modal>
    </div>
  );
};
