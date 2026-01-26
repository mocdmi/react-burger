import { BurgerConstructor } from '@/components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@/components/burger-ingredients/burger-ingredients';
import { useDirectNavigation } from '@/hooks/use-direct-navigation';
import { Outlet, useParams } from 'react-router-dom';

import styles from './home.module.css';

export const HomePage = (): React.JSX.Element => {
  const { id } = useParams();
  const { isDirectNavigation, isModal } = useDirectNavigation(!!id);

  if (isDirectNavigation) {
    return <Outlet />;
  }

  return (
    <>
      <section className={styles.home}>
        <h1 className="text text_type_main-large mt-10 mb-5 pl-5">Соберите бургер</h1>
        <div className={`${styles.content} pl-5 pr-5`}>
          <BurgerIngredients />
          <BurgerConstructor />
        </div>
      </section>
      {isModal && <Outlet />}
    </>
  );
};
