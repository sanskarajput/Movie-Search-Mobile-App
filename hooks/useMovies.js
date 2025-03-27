import { useState, useCallback } from 'react';

const API_KEY = process.env.EXPO_PUBLIC_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

export function useMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [currentSearch, setCurrentSearch] = useState('');

  const searchMovies = useCallback(async (query, newSearch = true) => {
    if (!query.trim()) {
      setMovies([]);
      setError(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      if (newSearch) {
        setPage(1);
        setCurrentSearch(query);
      }

      const currentPage = newSearch ? 1 : page;
      
      const response = await fetch(
        `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${currentPage}`
      );
      
      const data = await response.json();

      if (data.Response === 'True') {
        const newMovies = data.Search;
        setMovies(prev => newSearch ? newMovies : [...prev, ...newMovies]);
        setHasMore(newMovies.length === 10);
        if (!newSearch) setPage(prev => prev + 1);
      } else {
        setError(data.Error || 'No movies found');
        setHasMore(false);
      }
    } catch (err) {
      setError('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  }, [page]);

  const getMovieDetails = async (imdbId) => {
    const response = await fetch(
      `${BASE_URL}?i=${imdbId}&apikey=${API_KEY}`
    );
    const data = await response.json();
    if (data.Response === 'False') {
      throw new Error(data.Error);
    }
    return data;
  };

  const loadMore = useCallback(() => {
    if (!loading && hasMore && currentSearch) {
      searchMovies(currentSearch, false);
    }
  }, [loading, hasMore, currentSearch, searchMovies]);
  
  return {
    movies,
    loading,
    error,
    setError,
    hasMore,
    searchMovies,
    loadMore,
    getMovieDetails,
  };
}
