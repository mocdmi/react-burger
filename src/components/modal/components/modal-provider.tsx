import { modalContext } from '../hooks/modal-context';
import { useModal } from '../hooks/use-modal';

import type { ReactNode } from 'react';

type TModalProviderProps = {
  children: ReactNode;
};

export const ModalProvider = ({ children }: TModalProviderProps): React.JSX.Element => {
  const modal = useModal();
  return <modalContext.Provider value={modal}>{children}</modalContext.Provider>;
};
