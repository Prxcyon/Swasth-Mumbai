import { HealthAlert, WeatherData, AirQualityData } from '../types';
import { getAqiCategory, getWeatherAlert } from './weatherService';

// Mock data for alerts
const MOCK_ALERTS: HealthAlert[] = [];

export const fetchActiveAlerts = async (
  lat: number,
  lon: number,
  radius: number = 10
): Promise<HealthAlert[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Filter alerts based on location and expiry
  return MOCK_ALERTS.filter(alert => {
    const isActive = new Date(alert.expires_at) > new Date();
    if (!isActive) return false;
    
    // Calculate rough distance (simplified)
    const distance = Math.sqrt(
      Math.pow(alert.location.lat - lat, 2) + 
      Math.pow(alert.location.lon - lon, 2)
    ) * 111; // Rough conversion to km
    
    return distance <= (alert.location.radius || radius);
  });
};

export const generateAlertsFromData = (
  weatherData: WeatherData,
  airQualityData: AirQualityData,
  location: { lat: number, lon: number }
): HealthAlert[] => {
  const alerts: HealthAlert[] = [];
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours from now

  // Generate weather alerts
  const weatherAlerts = getWeatherAlert(weatherData);
  
  weatherAlerts.forEach(alert => {
    alerts.push({
      id: `weather-${now.getTime()}-${Math.random().toString(36).substring(2, 9)}`,
      ...alert,
      created_at: now.toISOString(),
      expires_at: expiresAt.toISOString(),
      location,
      active: true
    });
  });

  // Generate AQI alerts
  const aqi = airQualityData.list[0].main.aqi;
  if (aqi >= 3) {
    const aqiInfo = getAqiCategory(aqi);
    const severity: 'low' | 'medium' | 'high' = 
      aqi === 3 ? 'low' : aqi === 4 ? 'medium' : 'high';
    
    alerts.push({
      id: `aqi-${now.getTime()}-${Math.random().toString(36).substring(2, 9)}`,
      type: 'aqi',
      severity,
      title: `${aqiInfo.label} Air Quality Alert`,
      message: aqiInfo.advice,
      created_at: now.toISOString(),
      expires_at: expiresAt.toISOString(),
      location,
      active: true
    });
  }

  return alerts;
};

export const createAlert = async (alert: Omit<HealthAlert, 'id'>): Promise<HealthAlert> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const newAlert: HealthAlert = {
    ...alert,
    id: `alert-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
  };
  
  MOCK_ALERTS.push(newAlert);
  return newAlert;
};

export const updateAlertStatus = async (id: string, active: boolean): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const alert = MOCK_ALERTS.find(a => a.id === id);
  if (alert) {
    alert.active = active;
  }
};