import { Stack } from "expo-router";
import { CityProvider } from "./context/CityContext";

export default function RootLayout() {
  return (
    <CityProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </CityProvider>
  );
}
