import { combineReducers } from 'redux';
import allIngredientsReducer from '../slices/all-ingredients/slice';
import сonstructorListReducer from '../slices/constructor-list/slice';
import currentIngredientReducer from '../slices/current-ingredient/slice';
import orderReducer from '../slices/order-details/slice';
import userReducer from '../slices/user/user';

const rootReducer = combineReducers({
  user: userReducer,
  ingredientsAll: allIngredientsReducer,
  constructorList: сonstructorListReducer,
  currentIngredient: currentIngredientReducer,
  order: orderReducer,
});

export default rootReducer;
