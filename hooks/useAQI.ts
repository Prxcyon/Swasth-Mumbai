import { useState, useEffect } from 'react';
import { AirQualityData } from '@/types';
import { fetchAirQualityData } from '@/services/weatherService';

export default function useAQI(latitude: number | null, longitude: number | null) {
  const [aqiData, setAqiData] = useState<AirQualityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!latitude || !longitude) {
        setAqiData(null);
        setLoading(false);
        setError('Location not available');
        return;
      }
      const data = await fetchAirQualityData(latitude, longitude);
      setAqiData(data);
      setLoading(false);
    } catch (err) {
      setAqiData(null);
      setLoading(false);
      setError('Failed to fetch AQI data');
    }
  };

  useEffect(() => {
    fetchData();
  }, [latitude, longitude]);

  return { aqiData, loading, error, refetch: fetchData };
} 