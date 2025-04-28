import { useState, useEffect } from 'react';
import { HealthAlert } from '@/types';
import { fetchActiveAlerts, generateAlertsFromData } from '@/services/alertService';
import { WeatherData, AirQualityData } from '@/types';

export default function useAlerts(
  latitude: number,
  longitude: number,
  weatherData: WeatherData | null,
  airQualityData: AirQualityData | null
) {
  const [alerts, setAlerts] = useState<HealthAlert[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch persisted alerts from database
      const persistedAlerts = await fetchActiveAlerts(latitude, longitude);
      
      // Generate new alerts from current weather and AQI data
      let generatedAlerts: HealthAlert[] = [];
      if (weatherData && airQualityData) {
        generatedAlerts = generateAlertsFromData(weatherData, airQualityData, {
          lat: latitude,
          lon: longitude
        });
      }
      
      // Combine and deduplicate alerts (simple approach - in a real app, 
      // you'd want a more sophisticated deduplication strategy)
      const allAlerts = [...persistedAlerts];
      
      // Add generated alerts if they don't already exist (by type)
      generatedAlerts.forEach(newAlert => {
        if (!allAlerts.some(alert => alert.type === newAlert.type && alert.title === newAlert.title)) {
          allAlerts.push(newAlert);
        }
      });
      
      setAlerts(allAlerts);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch alerts');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (latitude && longitude) {
      fetchAlerts();
    }
  }, [latitude, longitude, weatherData, airQualityData]);

  return {
    alerts,
    loading,
    error,
    refetch: fetchAlerts
  };
}