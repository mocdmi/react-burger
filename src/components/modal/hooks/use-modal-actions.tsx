import { useModalContext } from './modal-context';

import type { TModalType, TOpenArgs } from '../types';

type TUseModalActionsResult = {
  openModal: <T extends TModalType>({ modalType, payload }: TOpenArgs<T>) => void;
  closeModal: () => void;
};

export const useModalActions = (): TUseModalActionsResult => {
  const { open, close } = useModalContext();

  return {
    openModal: open,
    closeModal: close,
  };
};
