import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { FavoritesProvider as Context } from '@/context/FavoritesContext';
import { GestureHandlerRootView } from "react-native-gesture-handler";


export default function RootLayout() {
  useFrameworkReady();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}> {/* Wrap everything */}
      <Context> {/* Wrap with Context */}
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </Context>
    </GestureHandlerRootView>
  );
}

