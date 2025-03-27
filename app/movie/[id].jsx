import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMovies } from '@/hooks/useMovies';
import { ArrowLeft, Star } from 'lucide-react-native';
import { Pressable } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';


export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { getMovieDetails } = useMovies();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMovieDetails();
  }, [id]);

  const loadMovieDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const details = await getMovieDetails(id);
      setMovie(details);
    } catch (err) {
      setError('Failed to load movie details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2d3436" />
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error || 'Movie not found'}</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['rgb(95, 255, 242)', '#feb47b']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >

      <ScrollView style={styles.container}>
        {/* <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#2d3436" />
        </Pressable > */}

        <View style={styles.card}>
          <Text style={styles.heading}>Movie Details</Text>

          <View style={styles.flex}>
            <Image
              source={{ uri: movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450' }}
              style={styles.poster}
            />

            <View style={styles.content}>
              <Text style={styles.title}>{movie.Title}</Text>
              <View style={styles.metadata}>
                <Text style={styles.year}>{movie.Year}</Text>
                <Text style={styles.dot}>•</Text>
                <Text style={styles.runtime}>{movie.Runtime} Min</Text>
                <Text style={styles.dot}>•</Text>
                <View style={styles.rating}>
                  <Star size={16} color="#f1c40f" fill="#f1c40f" />
                  <Text style={styles.ratingText}>{movie.imdbRating}</Text>
                </View>
              </View>

              <View style={styles.wrap}>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Genre</Text>
                  <Text style={styles.sectionText}>{movie.Genre}</Text>
                </View>

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Director</Text>
                  <Text style={styles.sectionText}>{movie.Director}</Text>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Cast</Text>
                <Text style={styles.sectionText}>{movie.Actors}</Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Plot</Text>
                <Text style={styles.plot}>{movie.Plot} Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat fuga consectetur quae omnis temporibus. Fugiat beatae, odio atque porro id vero quas cumque magnam. Modi perspiciatis possimus optio natus, nihil voluptates reprehenderit, ut quae voluptatibus necessitatibus minus facilis nulla alias.</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    // backgroundImage: 'linear-gradient(140deg,rgb(95, 255, 242), #feb47b)',
    opacity: 0.8,
    padding: 10,
    paddingTop: 48,
  },
  card: {
    marginBottom: 50,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 4,
    left: 16,
    zIndex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
  },
  heading: {
    fontSize: 34,
    fontWeight: 900,
    color: '#2d3436',
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'cursive',
  },
  flex: {
    flex: 1,
    flexDirection: 'cloumn',
    justifyContent: 'space-between',
  },
  poster: {
    // width: 220,
    height: 320,
    borderRadius: 18,
  },
  content: {
    padding: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2d3436',
    marginBottom: 8,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  wrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  year: {
    fontSize: 16,
    color: '#636e72',
  },
  dot: {
    fontSize: 16,
    color: '#636e72',
    marginHorizontal: 8,
  },
  runtime: {
    fontSize: 16,
    color: '#636e72',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    color: '#636e72',
    marginLeft: 4,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#2d3436',
    marginBottom: 4,
    fontFamily: 'cursive',
  },
  sectionText: {
    fontSize: 16,
    color: '#636e72',
    lineHeight: 24,
  },
  plot: {
    fontSize: 16,
    color: '#636e72',
    lineHeight: 24,
  },
  error: {
    color: '#ff4757',
    fontSize: 16,
  },
});