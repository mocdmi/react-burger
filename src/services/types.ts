import type { TIngredient, TOrdersHistory } from '@/types';

export type TUser = {
  user: {
    email: string;
    name: string;
  } | null;
};

export type TGetAllIngredientsResponse = {
  success: boolean;
  data: TIngredient[];
};

export type TCreateOrderRequest = {
  ingredients: string[];
};

type TCreateOrderOkResponse = {
  name: string;
  order: {
    number: number;
  };
  success: true;
};

export type TErrorResponse = {
  message: string;
  success: false;
};

export type TCreateOrderResponse = TCreateOrderOkResponse | TErrorResponse;

export type TLoginRequest = {
  email: string;
  password: string;
};

type TLoginOkResponse = {
  success: true;
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    name: string;
  };
};

export type TLoginResponse = TLoginOkResponse | TErrorResponse;

export type TRegisterRequest = {
  email: string;
  password: string;
  name: string;
};

type TRegisterOkResponse = {
  success: true;
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
};

export type TRegisterResponse = TRegisterOkResponse | TErrorResponse;

type TTokenRefreshOkResponse = {
  success: true;
  accessToken: string;
  refreshToken: string;
};

export type TTokenRefreshResponse = TTokenRefreshOkResponse | TErrorResponse;

export type TUpdateUserRequest = {
  email: string;
  name: string;
  password: string;
};

type TUserOkResponse = {
  success: true;
  user: {
    email: string;
    name: string;
  };
};

export type TUserResponse = TUserOkResponse | TErrorResponse;

export type TSendEmailResetPasswordRequest = {
  email: string;
};

type TSendEmailResetPasswordOkResponse = {
  success: true;
  message: string;
};

export type TSendEmailResetPasswordResponse =
  | TSendEmailResetPasswordOkResponse
  | TErrorResponse;

export type TSendEmailRequest = {
  password: string;
  token: string;
};

type TResetPasswordOkResponse = {
  success: true;
  message: string;
};

export type TResetPasswordResponse = TResetPasswordOkResponse | TErrorResponse;

type TLogoutOkResponse = {
  success: true;
  message: string;
};

export type TLogoutResponse = TLogoutOkResponse | TErrorResponse;

export type TLogoutRequest = {
  token: string;
};

export type TGetOrdersHistoryWsRequest = {
  message: string;
};

export type TGetOrdersHistoryWsResponse = {
  success: true;
  orders: TOrdersHistory[];
  total: number;
  totalToday: number;
};

export const isOrdersHistoryResponse = (
  data: unknown
): data is TGetOrdersHistoryWsResponse => {
  if (typeof data !== 'object' && data !== null) {
    return false;
  }

  const obj = data as Record<string, unknown>;

  return obj.success === true && Array.isArray(obj.orders);
};
