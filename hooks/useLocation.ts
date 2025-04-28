import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  loading: boolean;
}

export default function useLocation() {
  const [location, setLocation] = useState<LocationState>({
    latitude: null,
    longitude: null,
    error: null,
    loading: true
  });

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== 'granted') {
          setLocation({
            latitude: null,
            longitude: null,
            error: 'Permission to access location was denied',
            loading: false
          });
          return;
        }

        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced
        });
        
        setLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          error: null,
          loading: false
        });
      } catch (error) {
        setLocation({
          latitude: null,
          longitude: null,
          error: 'Error getting location',
          loading: false
        });
      }
    })();
  }, []);

  return location;
}