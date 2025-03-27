import { StyleSheet, TextInput, View } from 'react-native';
import { Search } from 'lucide-react-native';

export function SearchBar({ value, onChangeText, placeholder }) {
  return (
    <View style={styles.container}>
      <Search size={20} color="#636e72" style={styles.icon} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || 'Search movies...'}
        placeholderTextColor="#b2bec3"
        returnKeyType="search"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f6fa',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 16,
    height: 48,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#2d3436',
    borderColor:'blue',
    paddingLeft: 10,
  },
});
