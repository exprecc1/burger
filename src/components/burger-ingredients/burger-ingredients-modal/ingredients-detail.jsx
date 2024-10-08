import { IngredientType } from '../../../utils/types';
import style from '../burger-ingredients-modal/ingredients-detail.module.css';

export const IngredientDetails = ({ item }) => {
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

IngredientDetails.propTypes = {
  item: IngredientType.isRequired,
};
