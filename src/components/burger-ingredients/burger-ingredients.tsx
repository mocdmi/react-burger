import { useGetAllIngredientsQuery } from '@/services/api/ingredients-api';
import { getErrorMessage } from '@/services/api/utils/get-error-message';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';

import { useModalActions } from '../modal/hooks/use-modal-actions';
import { GroupsTabs } from './components/groups-tabs/groups-tabs';
import { IngredientsCard } from './components/ingredients-card/ingredients-card';
import { IngredientsGroup } from './components/ingredients-group/ingredients-group';
import { IngredientsGroups } from './components/ingridients-groups/ingridients-groups';
import { useIngredientsCounter } from './hooks/use-ingredients-counter';
import { useIngredientsGroups } from './hooks/use-ingredients-groups';
import { useIngredientsTabs } from './hooks/use-Ingredients-tabs';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = (): React.JSX.Element => {
  const { data, isLoading, error, isError } = useGetAllIngredientsQuery();
  const { groupedIngredients } = useIngredientsGroups(data?.data);
  const { scrolledContainerRef, groupRefs, activeTab, scrollToGroup } =
    useIngredientsTabs(groupedIngredients);
  const { openModal } = useModalActions();
  const { ingredientCounts } = useIngredientsCounter();

  const errorMessage = getErrorMessage(error);

  return (
    <section className={styles.burger_ingredients}>
      <GroupsTabs activeTab={activeTab} onToggle={scrollToGroup} />
      <div
        ref={scrolledContainerRef}
        className={`${styles.scrolled} custom-scroll mb-10`}
      >
        {isLoading && (
          <div className={styles.preloader}>
            <Preloader />
          </div>
        )}
        {isError && <div className={styles.error}>{errorMessage}</div>}
        {
          <IngredientsGroups
            groupedIngredients={groupedIngredients}
            renderGroup={({ ingredientsGroupType, ingredients }) => (
              <IngredientsGroup
                ref={groupRefs[ingredientsGroupType]}
                ingredientsGroupType={ingredientsGroupType}
                ingredients={ingredients}
                renderIngredientCard={(ingredient) => (
                  <IngredientsCard
                    ingredient={ingredient}
                    count={ingredientCounts[ingredient._id]}
                    onClick={() =>
                      openModal({
                        modalType: 'ingredient-details',
                        payload: ingredient,
                      })
                    }
                  />
                )}
              />
            )}
          />
        }
      </div>
    </section>
  );
};
