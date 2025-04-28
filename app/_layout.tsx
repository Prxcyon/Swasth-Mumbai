import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { AlertProvider } from '../components/alerts/AlertContext';
import { OutbreaksProvider } from '../components/report/OutbreaksContext';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <AlertProvider>
      <OutbreaksProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </OutbreaksProvider>
    </AlertProvider>
  );
}
