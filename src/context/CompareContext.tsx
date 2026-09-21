import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types';
import { useToast } from './ToastContext';

interface CompareContextType {
  comparedProducts: Product[];
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  isInCompare: (productId: string) => boolean;
  clearCompare: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { showToast } = useToast();

  const [comparedProducts, setComparedProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('bdmart_compare');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('bdmart_compare', JSON.stringify(comparedProducts));
  }, [comparedProducts]);

  const isInCompare = (productId: string) => {
    return comparedProducts.some((p) => p.id === productId);
  };

  const addToCompare = (product: Product) => {
    if (isInCompare(product.id)) {
      showToast('Product is already in compare list', 'info');
      return;
    }

    if (comparedProducts.length >= 4) {
      showToast('You can compare maximum 4 products at a time', 'warning');
      return;
    }

    setComparedProducts((prev) => [...prev, product]);
    showToast(`Added to compare (${comparedProducts.length + 1}/4)`, 'success');
  };

  const removeFromCompare = (productId: string) => {
    setComparedProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Removed from compare list', 'info');
  };

  const clearCompare = () => {
    setComparedProducts([]);
  };

  return (
    <CompareContext.Provider
      value={{
        comparedProducts,
        addToCompare,
        removeFromCompare,
        isInCompare,
        clearCompare
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};
