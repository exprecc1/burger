import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../../../services/store';
import { fetchAllIngredients } from '../../../services/slices/all-ingredients/slice';
import { IngredientDetails } from '../burger-ingredients-modal/ingredients-detail';

export const IngredientDetailsPage: FunctionComponent = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { items, status, error } = useSelector((state) => state.ingredientsAll);

  if (status === 'loading') {
    return <div>Загрузка...</div>;
  }

  if (status === 'failed') {
    return <div>Ошибка: {error}</div>;
  }

  const ingredient = items.find((item) => item._id === id);

  if (!ingredient) {
    return <div>Ингредиент не найден</div>;
  }

  return (
    <div>
      <IngredientDetails />
    </div>
  );
};
