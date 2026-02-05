import { authSlice } from '@/services/slices/auth-slice';
import { deleteCookie, setCookie } from '@/utils/cookie';

import { api } from '../api';

import type {
  TSendEmailResetPasswordRequest,
  TSendEmailResetPasswordResponse,
  TLoginRequest,
  TLoginResponse,
  TRegisterRequest,
  TRegisterResponse,
  TSendEmailRequest,
  TResetPasswordResponse,
  TUserResponse,
  TUpdateUserRequest,
  TLogoutResponse,
  TLogoutRequest,
} from '../../types';

const persistAuth = (data: {
  success: true;
  accessToken: string;
  refreshToken: string;
}): void => {
  setCookie('accessToken', data.accessToken, { path: '/' });
  localStorage.setItem('refreshToken', data.refreshToken);
};

const setResetFlag = (): void => {
  localStorage.setItem('resetPassword', 'true');
};

const clearResetFlag = (): void => {
  localStorage.removeItem('resetPassword');
};

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<TLoginResponse, TLoginRequest>({
      query: ({ email, password }) => ({
        url: '/auth/login',
        body: { email, password },
        method: 'POST',
      }),
      invalidatesTags: ['Auth', 'User'],
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled.catch(() => ({ data: null }));
        if (data?.success) persistAuth(data);
      },
    }),

    register: build.mutation<TRegisterResponse, TRegisterRequest>({
      query: ({ email, password, name }) => ({
        url: '/auth/register',
        body: { email, password, name },
        method: 'POST',
      }),
      invalidatesTags: ['Auth', 'User'],
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled.catch(() => ({ data: null }));
        if (data?.success) persistAuth(data);
      },
    }),

    logout: build.mutation<TLogoutResponse, TLogoutRequest>({
      query: ({ token }) => ({
        url: '/auth/logout',
        body: { token },
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        const { data } = await queryFulfilled.catch(() => ({ data: null }));

        if (data?.success) {
          deleteCookie('accessToken');
          localStorage.removeItem('refreshToken');
          dispatch(authSlice.actions.logout());
        }
      },
    }),

    sendEmailResetPassword: build.mutation<
      TSendEmailResetPasswordResponse,
      TSendEmailResetPasswordRequest
    >({
      query: ({ email }) => ({
        url: '/password-reset',
        body: { email },
        method: 'POST',
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled.catch(() => ({ data: null }));
        if (data?.success) setResetFlag();
      },
    }),

    resetPassword: build.mutation<TResetPasswordResponse, TSendEmailRequest>({
      query: ({ password, token }) => ({
        url: '/password-reset/reset',
        body: { password, token },
        method: 'POST',
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled.catch(() => ({ data: null }));
        if (data?.success) clearResetFlag();
      },
    }),

    getCurrentUser: build.query<TUserResponse, void>({
      query: () => '/auth/user',
      providesTags: ['User'],
    }),

    updateUser: build.mutation<TUserResponse, TUpdateUserRequest>({
      query: ({ email, password, name }) => ({
        url: '/auth/user',
        body: { email, password, name },
        method: 'PATCH',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useUpdateUserMutation,
  useSendEmailResetPasswordMutation,
  useResetPasswordMutation,
  useGetCurrentUserQuery,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
} = authApi;
