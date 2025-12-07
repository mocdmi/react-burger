import { createSlice } from '@reduxjs/toolkit';

import type { TUser } from '../types';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: TUser = {
  user: null,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const {
  actions: authSliceActions,
  reducer: authReducer,
  reducerPath: authReducerPath,
} = authSlice;
