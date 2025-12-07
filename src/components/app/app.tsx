import { router } from '@/router';
import { store } from '@/services/store';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { ModalProvider } from '../modal/components/modal-provider';
import { Modal } from '../modal/modal';

export const App = (): React.JSX.Element => {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <ModalProvider>
          <RouterProvider router={router} />
          <Modal />
        </ModalProvider>
      </DndProvider>
    </Provider>
  );
};

export default App;
