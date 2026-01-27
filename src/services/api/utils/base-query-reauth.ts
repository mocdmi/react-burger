import { API_URL } from '@/const';
import { authSliceActions } from '@/services/slices/auth-slice';
import { deleteCookie, getCookie } from '@/utils/cookie';
import { refreshToken } from '@/utils/refresh-token';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

import { authApi } from '../endpoints/auth-endpoints';
import { getErrorData } from './get-error-data';

import type { TErrorResponse } from '@/services/types';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers) => {
    const token = getCookie('accessToken');

    if (token) {
      headers.set('authorization', token);
    }

    return headers;
  },
});

export const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  const error = getErrorData<TErrorResponse>(result.error);

  if (error?.message === 'jwt expired') {
    const storedRefreshToken = localStorage.getItem('refreshToken');

    if (!storedRefreshToken) {
      api.dispatch(authSliceActions.logout());
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
      return result;
    }

    const refreshResult = await refreshToken();

    if (refreshResult.success) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      await api.dispatch(
        authApi.endpoints.logout.initiate({ token: storedRefreshToken })
      );
    }
  }

  return result;
};
