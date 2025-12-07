import { BurgerConstructor } from '@/components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@/components/burger-ingredients/burger-ingredients';

import styles from './home.module.css';

export const HomePage = (): React.JSX.Element => {
  return (
    <section className={styles.home}>
      <h1 className="text text_type_main-large mt-10 mb-5 pl-5">Соберите бургер</h1>
      <div className={`${styles.content} pl-5 pr-5`}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </section>
  );
};
