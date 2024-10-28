import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import style from '../burger-ingredients-modal/ingredients-detail.module.css';

export const IngredientDetails = () => {
  const { items, loading, error } = useSelector((state) => state.ingredientsAll);
  const { id } = useParams();
  const item = items.find((ingredient) => ingredient._id === id);
  console.log(items);
  console.log(id);
  console.log(item);

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
