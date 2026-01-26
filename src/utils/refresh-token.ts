import { API_URL } from '@/const';
import { setCookie } from '@/utils/cookie';

import type { TTokenRefreshResponse } from '@/services/types';

type TRefreshTokenResult = {
  success: boolean;
  accessToken?: string;
  refreshToken?: string;
};

export const refreshToken = async (): Promise<TRefreshTokenResult> => {
  const storedRefreshToken = localStorage.getItem('refreshToken');

  if (!storedRefreshToken) {
    return { success: false };
  }

  try {
    const response = await fetch(`${API_URL}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: storedRefreshToken,
      }),
    });

    if (!response.ok) {
      return { success: false };
    }

    const data = (await response.json()) as TTokenRefreshResponse;

    if (data?.success) {
      setCookie('accessToken', data.accessToken, { path: '/' });
      localStorage.setItem('refreshToken', data.refreshToken);

      return {
        success: true,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };
    }

    return { success: false };
  } catch (error) {
    console.error('Token refresh failed:', error);
    return { success: false };
  }
};
