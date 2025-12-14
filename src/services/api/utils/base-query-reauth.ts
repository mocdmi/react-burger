import { API_URL } from '@/const';
import { authSliceActions } from '@/services/slices/auth-slice';
import { deleteCookie, getCookie, setCookie } from '@/utils/cookie';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

import { authApi } from '../endpoints/auth-endpoints';
import { getErrorData } from './get-error-data';

import type { TErrorResponse, TTokenRefreshResponse } from '@/services/types';
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

const baseQueryWithoutAuth = fetchBaseQuery({
  baseUrl: API_URL,
});

export const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  const error = getErrorData<TErrorResponse>(result.error);

  if (error?.message === 'jwt expired') {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      api.dispatch(authSliceActions.logout());
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
      return result;
    }

    const refreshResult = await baseQueryWithoutAuth(
      {
        url: '/auth/token',
        method: 'POST',
        body: {
          token: refreshToken,
        },
      },
      api,
      extraOptions
    );

    const data = refreshResult.data as TTokenRefreshResponse;

    if (data?.success) {
      setCookie('accessToken', data.accessToken, { path: '/' });
      localStorage.setItem('refreshToken', data.refreshToken);
      result = await baseQuery(args, api, extraOptions);
    } else {
      await api.dispatch(authApi.endpoints.logout.initiate({ token: refreshToken }));
    }
  }

  return result;
};
