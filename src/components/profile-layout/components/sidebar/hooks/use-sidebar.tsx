import { useLogoutMutation } from '@/services/api/endpoints/auth-endpoints';
import { useMemo } from 'react';
import { useNavigate, matchPath, useLocation } from 'react-router-dom';

import type { TDescription } from '../types';

type TUseSidebar = {
  isLoading: boolean;
  currentDescription?: string;
  handleLogout: () => void;
};

export const useSidebar = (descriptions: TDescription[]): TUseSidebar => {
  const navigate = useNavigate();
  const location = useLocation();
  const [logout, { isLoading }] = useLogoutMutation();

  const currentDescription = useMemo(() => {
    const matched = descriptions.find((description) =>
      matchPath({ path: description.path, end: false }, location.pathname)
    );
    return matched?.description;
  }, [location.pathname, descriptions]);

  const handleLogout = (): void => {
    const refreshToken = localStorage.getItem('refreshToken');

    if (refreshToken) {
      void logout({ token: refreshToken });
      void navigate('/login', { replace: true });
    }
  };

  return {
    isLoading,
    currentDescription,
    handleLogout,
  };
};
