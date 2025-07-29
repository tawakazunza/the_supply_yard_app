// app/_layout.tsx
// Make sure this is the FIRST import to avoid styling issues.
import "../global.css";
import { useFonts } from 'expo-font';
import { useEffect } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "Inter-Bold": require('../assets/fonts/Inter-Bold.ttf'),
    "Inter-Medium": require('../assets/fonts/Inter-Medium.ttf'),
    "Inter-Regular": require('../assets/fonts/Inter-Regular.ttf'),
    "Inter-SemiBold": require('../assets/fonts/Inter-SemiBold.ttf'),
    "Inter-Light": require('../assets/fonts/Inter-Light.ttf'),
  });

  useEffect(() => {
    if(error) throw error;
    if(fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false}} />
      <StatusBar style="auto" />
    </>
  );
}