import { useCallback, useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { SearchBar } from '@/components/SearchBar';
import { MovieCard } from '@/components/MovieCard';
import { useMovies } from '@/hooks/useMovies';
import { useFavorites } from '@/context/FavoritesContext';
import { LinearGradient } from 'expo-linear-gradient';
import { debounce } from 'lodash';


export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const { movies, loading, error, setError, hasMore, searchMovies, loadMore } = useMovies();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [defaultMovies, setdefaultMovies] = useState(null);

  const { getMovieDetails } = useMovies();

  useEffect(() => {
    loadMovieDetails();
  }, []);

  const loadMovieDetails = async () => {
    try {
      const ids = ['tt9389998', 'tt20836266', 'tt8672310', 'tt29612962', 'tt29580631', 'tt0175882', 'tt6920084', 'tt11912196'];

      const details = await Promise.all(ids.map(async (id) => {
        return await getMovieDetails(id);
      }));

      setdefaultMovies(details);
    } catch (err) {
      setError('Failed to load movie details');
    }
  };


  const debouncedSearch = useCallback(debounce((text) => {
    searchMovies(text);
  }, 500), [searchMovies]);

  const handleSearch = (text) => {
    setQuery(text);
    debouncedSearch(text);
  };

  const renderMovie = ({ item }) => (
    <MovieCard
      movie={item}
      onPress={() => router.push(`/movie/${item.imdbID}`)}
      isFavorite={isFavorite(item.imdbID)}
      onToggleFavorite={() => toggleFavorite(item)}
    />
  );

  const renderFooter = () => {
    if (!loading || !movies.length) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color="#2d3436" />
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['rgb(228, 198, 244)', 'rgb(242, 117, 247)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >

      <View style={styles.container}>
        <Text style={styles.title}>Search Movies by their Title</Text>
        <SearchBar
          value={query}
          onChangeText={handleSearch}
        />
        {error ? (
          <Text style={styles.error}>{error}</Text>
        ) : (
          <FlatList
            data={movies.length ? movies : defaultMovies}
            renderItem={renderMovie}
            keyExtractor={item => item.imdbID}
            onEndReached={hasMore ? loadMore : undefined}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
            contentContainerStyle={styles.list}
          />
        )}
      </View>
    </LinearGradient>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 48,
    backgroundColor: 'transparent',
    // backgroundImage: 'linear-gradient(140deg,rgb(228, 198, 244),rgb(231, 147, 245))',
    opacity: 0.8,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#2d3436',
    textAlign: 'center',
    fontFamily: 'cursive'
  },
  footer: {
    paddingVertical: 16,
  },
  error: {
    textAlign: 'center',
    color: '#ff4757',
    marginTop: 16,
  },
});