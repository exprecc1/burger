import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Ingredient } from '../../../utils/types';
import style from '../burger-ingredients-modal/ingredients-detail.module.css';

interface IngredientChanges extends Ingredient {
  items: Ingredient[];
  loading: boolean;
  error: Error | null;
}

export const IngredientDetails = () => {
  const { items, loading, error } = useSelector(
    (state: { ingredientsAll: IngredientChanges }) => state.ingredientsAll,
  );
  const { id } = useParams<{ id: string }>();
  const item = React.useMemo(() => {
    return items.find((ingredient) => ingredient._id === id);
  }, [items, id]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  }

  if (!item) {
    return <div>Ингредиент не найден</div>;
  }

  return (
    <div className={style.modal__content__ingredients}>
      <div className={style.title__ingredients}>
        <h2>Детали ингредиента</h2>
      </div>
      <img className={style.image__ingredients} src={item.image} alt={item.name} />
      <h3 className={style.name__ingredients}>{item.name}</h3>
      <div className={style.structure__ingrediens}>
        <div className={style.structure__ingrediens__box}>
          <p>Каллории,ккал</p>
          <p className={style.quantity}>{item.calories} ккал</p>
        </div>
        <div className={style.structure__ingrediens__box}>
          <p>Белки, г</p>
          <p className={style.quantity}>{item.proteins}</p>
        </div>
        <div className={style.structure__ingrediens__box}>
          <p>Жиры, г</p>
          <p className={style.quantity}>{item.fat}</p>
        </div>
        <div className={style.structure__ingrediens__box}>
          <p>Углеводы, г</p>
          <p className={style.quantity}>{item.carbohydrates}</p>
        </div>
      </div>
    </div>
  );
};