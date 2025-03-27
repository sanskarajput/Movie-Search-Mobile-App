import { Tabs } from 'expo-router';
import { Search, Heart } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'rgb(246, 244, 244)',
          borderColor: 'black',
        },
        // tabBarActiveTintColor: 'rgba(0, 0, 0, .8)',
        // tabBarInactiveTintColor: 'rgba(0, 0, 0, 0.4)',
        // tabBarActiveBackgroundColor: 'rgba(165, 143, 143, 0.5)',
        // tabBarInactiveBackgroundColor: 'rgba(165, 143, 143, 0.1)'
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size }) => <Search size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, size }) => <Heart size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}