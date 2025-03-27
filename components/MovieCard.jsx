import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { Heart } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export function MovieCard({ movie, onPress, isFavorite, onToggleFavorite }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
        styles.gradient
      ]}
      onPress={onPress}
    >
      <LinearGradient
        colors={['rgb(95, 255, 242)', '#feb47b']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex:1, padding: 12, borderRadius: 12, flexDirection: 'row'}}
      >
        <Image
          source={{ uri: movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450' }}
          style={styles.poster}
        />
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={2}>
            {movie.Title}
          </Text>
          <Text style={styles.year}>{movie.Year}</Text>
        </View>
        <Pressable
          style={styles.favoriteButton}
          onPress={onToggleFavorite}
          hitSlop={8}
        >
          <Heart
            size={isFavorite ? 30 : 25}
            color={isFavorite ? 'red' : 'red'}
            fill={isFavorite ? 'red' : 'transparent'}
          />
        </Pressable>
      </LinearGradient>
    </Pressable>

  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    boxShadow: "2px 2px 3px 1px rgba(0, 0, 0, 1)"
  },
  gradient: {
    backgroundColor: 'transparent',
    // backgroundImage: 'linear-gradient(140deg,rgb(95, 255, 242), #feb47b)', 
    opacity: 0.8,
  },
  pressed: {
    opacity: 0.7,
  },
  poster: {
    width: 80,
    height: 120,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3436',
    marginBottom: 4,
  },
  year: {
    fontSize: 14,
    color: '#636e72',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
});