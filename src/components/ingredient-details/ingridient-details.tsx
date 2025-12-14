import { IngredientNutrion } from './components/ingredient-nutrion/ingredient-nutrion';

import type { TIngredient } from '@/types';

import styles from './ingredient-details.module.css';

type TIngredientDetailsProps = {
  payload: TIngredient;
  titleCenter?: boolean;
};

export const IngredientDetails = ({
  payload,
  titleCenter,
}: TIngredientDetailsProps): React.JSX.Element => {
  const { name, image_large, calories, proteins, fat, carbohydrates } = payload;

  return (
    <div className="pt-10 pb-15 pl-10 pr-10">
      <h2
        className={`${titleCenter ? styles.title_center : ''} text text_type_main-large`}
      >
        Детали ингредиента
      </h2>
      <div className={styles.ingredient_details}>
        <img className={`${styles.image} mb-4`} src={image_large} alt={name} />
        <h3 className="text text_type_main-medium mb-8">{name}</h3>
        <div className={styles.nutrion_facts}>
          <IngredientNutrion title="Калории,ккал" value={calories} />
          <IngredientNutrion title="Белки, г" value={proteins} />
          <IngredientNutrion title="Жиры, г" value={fat} />
          <IngredientNutrion title="Углеводы, г" value={carbohydrates} />
        </div>
      </div>
    </div>
  );
};
