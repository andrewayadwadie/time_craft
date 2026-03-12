import { createContext, useState, useEffect, useCallback } from 'react';

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('tc-favorites');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('tc-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (product) => {
    setFavorites(prev => {
      if (prev.some(f => f.productId === product.id)) return prev;
      return [...prev, {
        productId: product.id,
        name: product.name,
        nameAr: product.nameAr,
        price: product.price,
        image: product.images[0],
        addedAt: new Date().toISOString()
      }];
    });
  };

  const removeFavorite = (productId) => {
    setFavorites(prev => prev.filter(f => f.productId !== productId));
  };

  const isFavorite = useCallback((productId) => {
    return favorites.some(f => f.productId === productId);
  }, [favorites]);

  const favoriteCount = favorites.length;

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, favoriteCount }}>
      {children}
    </FavoritesContext.Provider>
  );
}
