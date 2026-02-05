import { useGetCurrentUserQuery } from '@/services/api/endpoints/auth-endpoints';
import { getCookie } from '@/utils/cookie';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import type { TLocationState } from '@/types';

import styles from './protected-route.module.css';

type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
}: TProtectedRouteProps): React.JSX.Element => {
  const location = useLocation();
  const token = getCookie('accessToken');
  const state = location.state as TLocationState;

  const { isLoading, isError } = useGetCurrentUserQuery(undefined, {
    skip: !token,
  });

  if (isLoading) {
    return (
      <div className={styles.loader}>
        <Preloader />
      </div>
    );
  }

  const isAuthenticated = token && !isError;

  if (onlyUnAuth && isAuthenticated) {
    const from = state?.from ?? { pathname: '/' };
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
