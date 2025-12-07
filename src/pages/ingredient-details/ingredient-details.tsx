import { IngredientDetails } from '@/components/ingredient-details/ingridient-details';
import { useOutletContext } from 'react-router-dom';

import type { TIngredient } from '@/types';

import styles from './ingredients-details.module.css';

export const IngredientDetailsPage = (): React.JSX.Element => {
  const { ingredient } = useOutletContext<{ ingredient: TIngredient }>();

  return (
    <div className={styles.container}>
      <IngredientDetails payload={ingredient} titleCenter />
    </div>
  );
};
