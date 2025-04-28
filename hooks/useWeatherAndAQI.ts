import { useState, useEffect } from 'react';
import { WeatherData } from '@/types';
import { fetchWeatherData } from '@/services/weatherService';

interface WeatherState {
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

export default function useWeather(latitude: number | null, longitude: number | null) {
  const [state, setState] = useState<WeatherState>({
    weatherData: null,
    loading: true,
    error: null,
    lastUpdated: null
  });

  const fetchData = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      if (!latitude || !longitude) {
        setState({
          weatherData: null,
          loading: false,
          error: 'Location not available',
          lastUpdated: null
        });
        return;
      }

      const weather = await fetchWeatherData(latitude, longitude);
      setState({
        weatherData: weather,
        loading: false,
        error: null,
        lastUpdated: new Date()
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to fetch weather data'
      }));
    }
  };

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      fetchData();
    } else {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Location not available'
      }));
    }
  }, [latitude, longitude]);

  return {
    ...state,
    refetch: fetchData
  };
}