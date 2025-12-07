import { getCookie } from '@/utils/cookie';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

type LocationState = {
  from?: Location;
};

type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
}: TProtectedRouteProps): React.JSX.Element => {
  const location = useLocation();
  const token = getCookie('accessToken');
  const state = location.state as LocationState;

  if (onlyUnAuth && token) {
    const from = state?.from ?? { pathname: '/' };
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
