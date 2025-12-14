import type { RootState } from '../store';
import type { TUser } from '../types';

export const getUser = (state: RootState): TUser | null => state.authSlice;
