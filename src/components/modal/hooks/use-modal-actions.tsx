import { useModalContext } from './modal-context';

import type { TModalType, TOpenArgs } from '../types';

type TModalActionsState = {
  openModal: <T extends TModalType>({ modalType, payload }: TOpenArgs<T>) => void;
  closeModal: () => void;
};

export const useModalActions = (): TModalActionsState => {
  const { open, close } = useModalContext();

  return {
    openModal: open,
    closeModal: close,
  };
};
