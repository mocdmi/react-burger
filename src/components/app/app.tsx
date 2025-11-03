import { useIngredients } from '@/components/app/hooks/use-ingredients';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import { ModalProvider } from '../modal/components/modal-provider';
import { Modal } from '../modal/modal';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const { isPending, ingredients, error } = useIngredients();

  return (
    <ModalProvider>
      <div className={styles.app}>
        <AppHeader />
        <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
          Соберите бургер
        </h1>
        <main className={`${styles.main} pl-5 pr-5`}>
          {isPending ? (
            <div className={styles.preloader}>
              <Preloader />
            </div>
          ) : error ? (
            <div className={styles.error}>{error}</div>
          ) : (
            <>
              <BurgerIngredients ingredients={ingredients} />
              <BurgerConstructor ingredients={ingredients} />
            </>
          )}
        </main>
      </div>
      <Modal />
    </ModalProvider>
  );
};

export default App;
