import { useState, useRef, useEffect, useCallback } from 'react';

import type { TIngredient, TIngredientsGroupType } from '@/types';

type TUseIngredientsTabsResult = {
  activeTab: TIngredientsGroupType;
  scrolledContainerRef: React.RefObject<HTMLDivElement | null>;
  groupRefs: Record<TIngredientsGroupType, React.RefObject<HTMLElement | null>>;
  scrollToGroup: (group: TIngredientsGroupType) => void;
};

export const useIngredientsTabs = (
  groupedIngredients?: Record<TIngredientsGroupType, TIngredient[]>
): TUseIngredientsTabsResult => {
  const [activeTab, setActiveTab] = useState<TIngredientsGroupType>('bun');
  const scrolledContainerRef = useRef<HTMLDivElement>(null);

  const groupRefs = {
    bun: useRef<HTMLElement>(null),
    main: useRef<HTMLElement>(null),
    sauce: useRef<HTMLElement>(null),
  };

  const scrollToGroup = useCallback(
    (group: TIngredientsGroupType) => {
      const el = groupRefs[group].current;
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [groupRefs]
  );

  useEffect(() => {
    const scrolledContainer = scrolledContainerRef.current;

    if (!scrolledContainer) return;

    const options: IntersectionObserverInit = {
      root: scrolledContainer,
      rootMargin: '-10px 0px -75% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const type = entry.target.getAttribute('data-type');

        if (type === 'bun' || type === 'main' || type === 'sauce') {
          setActiveTab(type);
        }
      });
    }, options);

    Object.values(groupRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return (): void => observer.disconnect();
  }, [groupedIngredients]);

  return {
    activeTab,
    scrolledContainerRef,
    groupRefs,
    scrollToGroup,
  };
};
