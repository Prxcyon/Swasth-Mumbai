import React from 'react';
import { Tabs } from 'expo-router';
import { Chrome as Home, MapPin, CirclePlus as PlusCircle, Heart, Settings } from 'lucide-react-native';
import i18n from '@/i18n';
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import LanguageSelector from '@/components/ui/LanguageSelector';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { LanguageProvider } from '@/i18n';
import AppHeader from '@/components/ui/AppHeader';

// Prevent splash screen from auto hiding
SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  useFrameworkReady();
  
  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Regular': require('@expo-google-fonts/poppins/Poppins_400Regular.ttf'),
    'Poppins-Medium': require('@expo-google-fonts/poppins/Poppins_500Medium.ttf'),
    'Poppins-SemiBold': require('@expo-google-fonts/poppins/Poppins_600SemiBold.ttf'),
    'Poppins-Bold': require('@expo-google-fonts/poppins/Poppins_700Bold.ttf')
  });

  React.useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#80A1D4" />
      </View>
    );
  }

  return (
    <LanguageProvider>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarStyle: {
            backgroundColor: '#F7F4EA',
            borderTopColor: '#DED9E2',
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
          },
          tabBarActiveTintColor: '#80A1D4',
          tabBarInactiveTintColor: '#999',
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Poppins-Medium',
          },
          header: () => {
            let title = '';
            switch (route.name) {
              case 'index':
                title = i18n.t('common.appName');
                break;
              case 'map':
                title = i18n.t('map.title');
                break;
              case 'report':
                title = i18n.t('report.title');
                break;
              case 'health':
                title = i18n.t('health.title');
                break;
              case 'settings':
                title = i18n.t('settings.title');
                break;
              default:
                title = '';
            }
            return <AppHeader title={title} />;
          },
        })}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: i18n.t('common.home'),
            tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="map"
          options={{
            title: i18n.t('common.map'),
            tabBarIcon: ({ color, size }) => <MapPin size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="report"
          options={{
            title: i18n.t('common.report'),
            tabBarIcon: ({ color, size }) => <PlusCircle size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="health"
          options={{
            title: i18n.t('common.health'),
            tabBarIcon: ({ color, size }) => <Heart size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: i18n.t('common.settings'),
            tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
          }}
        />
      </Tabs>
    </LanguageProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F4EA',
  },
  headerLeft: {
    marginLeft: 16,
  },
  languageSelector: {
    // Additional styling for language selector
  },
});