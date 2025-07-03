'use client'
import { createContext, useContext } from 'react';
import type { CategoryPrisma, CulturePrisma, MainPrisma, ProductPrisma } from '@/type'

interface ControlContextProps {
  cultureData?: CulturePrisma | null;
  mainPageData?: MainPrisma | null;
  categoryData?: CategoryPrisma | null;
  productData?: ProductPrisma[] | null;
}

export const ControlContext = createContext<ControlContextProps | undefined>(undefined)

export function useControlContext() {
  const context = useContext(ControlContext)
  if (!context) {
    throw new Error('useControlContext must be used within a ControlProvider')
  }
  return context
}
