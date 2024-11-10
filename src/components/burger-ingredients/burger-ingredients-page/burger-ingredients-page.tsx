import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllIngredients } from '../../../services/slices/all-ingredients/slice';
import { IngredientDetails } from '../burger-ingredients-modal/ingredients-detail';
import { Ingredient } from '../../../utils/types';

interface IngredientChanges extends Ingredient {
  items: Ingredient[];
  loading: boolean;
  error: string;
}

export const IngredientDetailsPage: FunctionComponent = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { items, loading, error } = useSelector(
    (state: { ingredientsAll: IngredientChanges }) => state.ingredientsAll,
  );

  //Получение данных с api
  React.useEffect(() => {
    //@ts-ignore
    dispatch(fetchAllIngredients());
  }, [dispatch]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
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
