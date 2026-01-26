import { useLocation } from 'react-router-dom';

type TUseModalRouteResult = {
  isModal: boolean;
  shouldShowOnlyOutlet: boolean;
};

export const useModalRoute = (): TUseModalRouteResult => {
  const location = useLocation();
  const isModal = new URLSearchParams(location.search).get('modal') === 'true';
  const shouldShowOnlyOutlet = !isModal;

  return {
    isModal,
    shouldShowOnlyOutlet,
  };
};
