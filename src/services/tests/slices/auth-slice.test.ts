import { describe, expect, it } from 'vitest';

import {
  authSlice,
  authSliceActions,
  authReducer,
} from '@services/slices/auth-slice.ts';

import type { TUser } from '@services/types.ts';

describe('authReducer', () => {
  it('должен вернуть начальное состояние', () => {
    expect(authReducer(undefined, { type: '@@INIT' })).toEqual(
      authSlice.getInitialState()
    );
  });

  describe('setUser', () => {
    it('должен установить пользователя', () => {
      const userData: TUser = {
        user: {
          email: 'test@example.com',
          name: 'Test User',
        },
      };

      const nextState = authReducer({ user: null }, authSliceActions.setUser(userData));

      expect(nextState.user).toEqual({
        email: 'test@example.com',
        name: 'Test User',
      });
    });
  });

  describe('logout', () => {
    it('должен очистить пользователя при logout', () => {
      const loggedInState: TUser = {
        user: {
          email: 'test@example.com',
          name: 'Test User',
        },
      };

      const nextState = authReducer(loggedInState, authSliceActions.logout());

      expect(nextState.user).toBeNull();
    });
  });
});
