import axios from 'axios';
import Constants from 'expo-constants';
import { WeatherData, AirQualityData } from '../types';

const API_KEY = Constants.expoConfig?.extra?.openWeatherApiKey || 
               process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY || '';

if (!API_KEY) {
  console.warn('Missing OpenWeather API key. Check your environment variables.');
}

const weatherBaseUrl = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherData = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${weatherBaseUrl}/weather`, {
      params: {
        lat,
        lon,
        units: 'metric',
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const fetchAirQualityData = async (lat: number, lon: number): Promise<AirQualityData> => {
  try {
    const response = await axios.get(`${weatherBaseUrl}/air_pollution`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching air quality data:', error);
    throw error;
  }
};

export const getAqiCategory = (aqi: number): {
  label: string;
  color: string;
  advice: string;
} => {
  switch (aqi) {
    case 1:
      return {
        label: 'Good',
        color: '#00E400',
        advice: 'Air quality is satisfactory, and air pollution poses little or no risk.',
      };
    case 2:
      return {
        label: 'Fair',
        color: '#FFFF00',
        advice: 'Air quality is acceptable. However, there may be a risk for some people.',
      };
    case 3:
      return {
        label: 'Moderate',
        color: '#FF7E00',
        advice: 'Members of sensitive groups may experience health effects.',
      };
    case 4:
      return {
        label: 'Poor',
        color: '#FF0000',
        advice: 'Everyone may begin to experience health effects.',
      };
    case 5:
      return {
        label: 'Very Poor',
        color: '#990066',
        advice: 'Health warnings of emergency conditions. Everyone is likely to be affected.',
      };
    default:
      return {
        label: 'Unknown',
        color: '#808080',
        advice: 'No data available.',
      };
  }
};

export const getWeatherAlert = (weatherData: WeatherData) => {
  const alerts = [];
  
  // Temperature alerts
  if (weatherData.main.temp >= 35) {
    alerts.push({
      type: 'weather',
      severity: 'high',
      title: 'High Temperature Alert',
      message: 'Stay hydrated and avoid prolonged sun exposure.',
    });
  } else if (weatherData.main.temp <= 10) {
    alerts.push({
      type: 'weather',
      severity: 'medium',
      title: 'Low Temperature Alert',
      message: 'Stay warm and cover extremities when outside.',
    });
  }
  
  // Humidity alerts
  if (weatherData.main.humidity >= 80) {
    alerts.push({
      type: 'weather',
      severity: 'medium',
      title: 'High Humidity Alert',
      message: 'High humidity may cause discomfort. Stay in ventilated areas.',
    });
  }
  
  // Wind alerts
  if (weatherData.wind.speed >= 30) {
    alerts.push({
      type: 'weather',
      severity: 'high',
      title: 'Strong Wind Alert',
      message: 'Strong winds may cause hazards. Secure loose items and take precautions.',
    });
  }
  
  return alerts;
};

// US EPA AQI breakpoints for PM2.5
const pm25Breakpoints = [
  { cLow: 0.0, cHigh: 12.0, iLow: 0, iHigh: 50 },
  { cLow: 12.1, cHigh: 35.4, iLow: 51, iHigh: 100 },
  { cLow: 35.5, cHigh: 55.4, iLow: 101, iHigh: 150 },
  { cLow: 55.5, cHigh: 150.4, iLow: 151, iHigh: 200 },
  { cLow: 150.5, cHigh: 250.4, iLow: 201, iHigh: 300 },
  { cLow: 250.5, cHigh: 350.4, iLow: 301, iHigh: 400 },
  { cLow: 350.5, cHigh: 500.4, iLow: 401, iHigh: 500 },
];

export function calculateAqiFromPm25(pm25: number): number {
  for (const bp of pm25Breakpoints) {
    if (pm25 >= bp.cLow && pm25 <= bp.cHigh) {
      // Linear calculation
      return Math.round(
        ((bp.iHigh - bp.iLow) / (bp.cHigh - bp.cLow)) * (pm25 - bp.cLow) + bp.iLow
      );
    }
  }
  // If out of range, return 500 (max AQI)
  return 500;
}