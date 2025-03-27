import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@movie_favorites';
const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = useCallback(async (movie) => {
    try {
      setFavorites((prevFavorites) => {
        const isFavorite = prevFavorites.some(fav => fav.imdbID === movie.imdbID);
        const newFavorites = isFavorite
          ? prevFavorites.filter(fav => fav.imdbID !== movie.imdbID)
          : [...prevFavorites, movie];

        AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites)); // Save to storage
        return newFavorites;
      });
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  }, []);

  const isFavorite = useCallback((movieId) => {
    return favorites.some(fav => fav.imdbID === movieId);
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, loading, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
