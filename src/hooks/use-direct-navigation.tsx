import { useLocation } from 'react-router-dom';

import type { Location } from 'react-router-dom';

type TLocationState = {
  backgroundLocation?: Location;
};

type TUseDirectNavigationResult = {
  isDirectNavigation: boolean;
  isModal: boolean;
};

export const useDirectNavigation = (hasParams: boolean): TUseDirectNavigationResult => {
  const location = useLocation();
  const state = location.state as TLocationState | undefined;
  const isModal = Boolean(state?.backgroundLocation);

  const isDirectNavigation = hasParams && !isModal;

  return {
    isDirectNavigation,
    isModal,
  };
};
