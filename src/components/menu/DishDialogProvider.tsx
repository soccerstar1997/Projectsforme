import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { Dish } from '../../data/menu';
import { DishDialog } from './DishDialog';

type DishDialogContextValue = {
  openDish: (dish: Dish) => void;
};

const DishDialogContext = createContext<DishDialogContextValue | null>(null);

export function useDishDialog(): DishDialogContextValue {
  const context = useContext(DishDialogContext);
  if (!context) throw new Error('useDishDialog must be used inside DishDialogProvider');
  return context;
}

/**
 * یک مودال مشترک برای همهٔ کارت‌های غذا: بخش «انتخاب‌های ویژه» و «منوی کامل»
 * هر دو از همین گفت‌وگو استفاده می‌کنند تا رفتار یکسان بماند.
 */
export function DishDialogProvider({ children }: { children: ReactNode }) {
  const [dish, setDish] = useState<Dish | null>(null);

  const value = useMemo<DishDialogContextValue>(
    () => ({ openDish: (next: Dish) => setDish(next) }),
    [],
  );

  return (
    <DishDialogContext.Provider value={value}>
      {children}
      <DishDialog dish={dish} onClose={() => setDish(null)} />
    </DishDialogContext.Provider>
  );
}
