import { StyleSheet, View, FlatList, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { MovieCard } from '@/components/MovieCard';
import { useFavorites } from '@/context/FavoritesContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function FavoritesScreen() {
  const router = useRouter();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const renderMovie = ({ item }) => (
    <MovieCard
      movie={item}
      onPress={() => router.push(`/movie/${item.imdbID}`)}
      isFavorite={isFavorite(item.imdbID)}
      onToggleFavorite={() => toggleFavorite(item)}
    />
  );

  return (
    <LinearGradient
      colors={['rgb(228, 198, 244)', 'rgb(231, 147, 245)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >

      <View style={styles.container}>
        <Text style={styles.title}>Your Favorites Movies</Text>
        {favorites.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No favorite movies yet !</Text>
          </View>
        ) : (
          <FlatList
            data={favorites}
            renderItem={renderMovie}
            keyExtractor={item => item.imdbID}
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
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'cursive'
  },
  list: {
    paddingBottom: 16,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: "dark",
    fontSize: 42,
    fontFamily: 'cursive',
    textAlign: 'center'
  },
});