import { getCookie } from './cookie';

export const isAuth = (): boolean => {
  const token = getCookie('accessToken');
  return !!token;
};
