import { useMemo, type ReactNode } from 'react';

import { modalContext } from '../hooks/modal-context';
import { useModal } from '../hooks/use-modal';

type TModalProviderProps = {
  children: ReactNode;
};

export const ModalProvider = ({ children }: TModalProviderProps): React.JSX.Element => {
  const modal = useModal();
  const contextValue = useMemo(
    () => modal,
    [modal.isModalOpen, modal.modalType, modal.payload, modal.open, modal.close]
  );

  return <modalContext.Provider value={contextValue}>{children}</modalContext.Provider>;
};
