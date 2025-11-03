import { API_URL } from '@/const';

import type { TGetAllResponce } from './types';
import type { TIngredient } from '@/types';

export const ingredientApi = {
  getAll: async (): Promise<TIngredient[]> => {
    try {
      const res = await fetch(`${API_URL}/ingredients`);

      if (!res.ok) {
        throw new Error(`Failed to fetch ingredients: ${res.status} ${res.statusText}`);
      }

      const { success, data } = (await res.json()) as TGetAllResponce;

      if (!success) {
        throw new Error(`Failed to fetch ingredients`);
      }

      return data;
    } catch (_) {
      throw new Error('Error while fetching ingredients');
    }
  },
};
