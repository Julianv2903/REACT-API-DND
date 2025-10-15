import React, { createContext, useState, useEffect } from "react";

export const SharedContext = createContext();

export function SharedProvider({ children }) {
  const [sharedItem, setSharedItem] = useState(null); // objeto compartido (detalle seleccionado)
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem("favorites_v1");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("favorites_v1", JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(item) {
    setFavorites(prev => {
      const exists = prev.find(f => f.index === item.index);
      if (exists) return prev.filter(f => f.index !== item.index);
      return [...prev, { index: item.index, name: item.name }];
    });
  }

  function isFavorite(index) {
    return favorites.some(f => f.index === index);
  }

  return (
    <SharedContext.Provider value={{
      sharedItem,
      setSharedItem,
      favorites,
      toggleFavorite,
      isFavorite
    }}>
      {children}
    </SharedContext.Provider>
  );
}
