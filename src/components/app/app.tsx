import { store } from '@/services/store';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import { ModalProvider } from '../modal/components/modal-provider';
import { Modal } from '../modal/modal';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <ModalProvider>
          <div className={styles.app}>
            <AppHeader />
            <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
              Соберите бургер
            </h1>
            <main className={`${styles.main} pl-5 pr-5`}>
              <BurgerIngredients />
              <BurgerConstructor />
            </main>
          </div>
          <Modal />
        </ModalProvider>
      </DndProvider>
    </Provider>
  );
};

export default App;
