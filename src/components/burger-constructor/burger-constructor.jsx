import React from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderDetails } from './burger-constructor-modal/burger-constructor-modal';
import { Modal } from '../modal/modal';
import { useModal } from '../../hooks/useModal';
import {
  addIngredient,
  updateIngredientsOrder,
} from '../../services/slices/constructor-list/slice';
import { submitOrder } from '../../services/slices/order-details/slice';
import { v4 as uuidv4 } from 'uuid';
import style from './burger-constructor.module.css';
import { DraggableIngredient } from './draggable-ingredient';

export const BurgerConstructor = () => {
  const { isModal, openModal, closeModal } = useModal();
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.constructorList.ingredients);

  const bun = ingredients.filter((obj) => obj.type && obj.type.includes('bun'));
  const nonBunIngredients = ingredients.filter((obj) => obj.type && obj.type !== 'bun');

  const handleDrop = (item) => {
    const newItem = { ...item, uuid: uuidv4() };
    dispatch(addIngredient(newItem));
  };

  React.useEffect(() => {
    console.log('Ingredients changed:', ingredients);
  }, [ingredients]);

  const totalPrice = React.useMemo(() => {
    const nonBunPrice = nonBunIngredients.reduce((total, item) => total + item.price, 0);
    return (bun.length ? bun[0].price * 2 : 0) + nonBunPrice;
  }, [bun, nonBunIngredients]);

  const [{ isOver: isOverBunTop }, dropBunTop] = useDrop({
    accept: 'bun',
    drop: (item) => {
      if (item.type === 'bun' && !item.isInConstructor) {
        // Проверка, что ингредиент не в конструкторе
        handleDrop(item);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const [{ isOver: isOverBunBottom }, dropBunBottom] = useDrop({
    accept: 'bun',
    drop: (item) => {
      if (item.type === 'bun' && !item.isInConstructor) {
        // Проверка, что ингредиент не в конструкторе
        handleDrop(item);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const [{ isOver: isOverIngredients }, dropIngredients] = useDrop({
    accept: 'ingredient',
    drop: (item) => {
      if (item.type !== 'bun' && !item.isInConstructor) {
        // Проверка, что ингредиент не в конструкторе
        handleDrop(item);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const handleOrderSubmit = () => {
    const ingredientIds = ingredients.map((ingredient) => ingredient._id);
    dispatch(submitOrder(ingredientIds));
    openModal();
  };

  const moveIngredient = React.useCallback(
    (dragIndex, hoverIndex) => {
      const updatedIngredients = [...nonBunIngredients];
      const [draggedIngredient] = updatedIngredients.splice(dragIndex, 1);
      updatedIngredients.splice(hoverIndex, 0, draggedIngredient);
      dispatch(updateIngredientsOrder([...bun, ...updatedIngredients]));
    },
    [bun, nonBunIngredients, dispatch],
  );

  return (
    <div className="builder">
      <div className={style.builder__content}>
        <div
          className={isOverBunTop ? style.empty__top__drop : style.builder__box}
          ref={dropBunTop}
        >
          {bun.length > 0 ? (
            bun.map((item) => (
              <ConstructorElement
                key={item.uuid}
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
            nonBunIngredients.map((item, index) => (
              <DraggableIngredient
                key={item.uuid}
                item={item}
                index={index}
                moveIngredient={moveIngredient}
              />
            ))
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
            bun.map((item) => (
              <ConstructorElement
                key={item.uuid}
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
