export interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
  name: string;
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
}

export interface AirQualityData {
  list: {
    main: {
      aqi: number; // 1-5 scale
    };
    components: {
      co: number;
      no: number;
      no2: number;
      o3: number;
      so2: number;
      pm2_5: number;
      pm10: number;
      nh3: number;
    };
    dt: number;
  }[];
}

export interface HealthAlert {
  id: string;
  type: 'weather' | 'aqi' | 'disease' | 'festival';
  severity: 'low' | 'medium' | 'high';
  message: string;
  title: string;
  created_at: string;
  expires_at: string;
  location: {
    lat: number;
    lon: number;
    radius?: number;
  };
  active: boolean;
}

export interface DiseaseReport {
  id: string;
  disease_type: string;
  symptoms: string[];
  location: {
    lat: number;
    lon: number;
  };
  reported_at: string;
  reported_by: string;
  confirmations: number;
  denials: number;
  total_votes: number;
  legitimacy_percentage: number;
  status: 'pending' | 'confirmed' | 'rejected';
}

export interface UserSettings {
  language: 'en' | 'hi' | 'mr';
  notifications_enabled: boolean;
  location_tracking_enabled: boolean;
  temperature_alert_threshold: {
    high: number;
    low: number;
  };
  humidity_alert_threshold: number;
  wind_alert_threshold: number;
}