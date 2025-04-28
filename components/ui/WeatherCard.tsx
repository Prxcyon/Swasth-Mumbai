import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { WeatherData } from '@/types';
import i18n from '@/i18n';

interface WeatherCardProps {
  data: WeatherData | null;
  isLoading: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>{i18n.t('common.loading')}</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{i18n.t('common.error')}</Text>
      </View>
    );
  }

  const weatherIcon = data.weather && data.weather[0] && data.weather[0].icon ? data.weather[0].icon : null;
  const weatherIconUrl = weatherIcon ? `https://openweathermap.org/img/wn/${weatherIcon}@2x.png` : null;
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{i18n.t('dashboard.weather')}</Text>
        <Text style={styles.location}>{data.name}</Text>
      </View>
      
      <View style={styles.mainContent}>
        <View style={styles.temperatureContainer}>
          <Text style={styles.temperature}>{Math.round(data.main.temp)}°C</Text>
          <Text style={styles.feelsLike}>
            {i18n.t('dashboard.feelsLike')}: {Math.round(data.main.feels_like)}°C
          </Text>
          <Text style={styles.weatherDescription}>
            {data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1)}
          </Text>
        </View>
        
        <View style={styles.weatherIconContainer}>
          {weatherIconUrl ? (
            <Image
              source={{ uri: weatherIconUrl }}
              style={styles.weatherIcon}
            />
          ) : (
            <View style={[styles.weatherIcon, { backgroundColor: '#DED9E2', borderRadius: 40 }]} />
          )}
        </View>
      </View>
      
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.detailValue}>{data.main.humidity}%</Text>
          <Text style={styles.detailLabel}>{i18n.t('dashboard.humidity')}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailValue}>{data.wind.speed} km/h</Text>
          <Text style={styles.detailLabel}>{i18n.t('dashboard.wind')}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailValue}>{data.main.pressure} hPa</Text>
          <Text style={styles.detailLabel}>{i18n.t('dashboard.pressure')}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F4EA',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  mainContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  temperatureContainer: {
    flex: 1,
  },
  temperature: {
    fontSize: 40,
    fontWeight: '700',
    color: '#333',
  },
  feelsLike: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  weatherDescription: {
    fontSize: 16,
    fontWeight: '500',
    color: '#444',
    marginTop: 8,
  },
  weatherIconContainer: {
    marginLeft: 16,
  },
  weatherIcon: {
    width: 80,
    height: 80,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(222, 217, 226, 0.3)',
    borderRadius: 12,
    padding: 12,
  },
  detailItem: {
    alignItems: 'center',
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  loadingText: {
    textAlign: 'center',
    padding: 20,
    color: '#666',
  },
  errorText: {
    textAlign: 'center',
    padding: 20,
    color: 'red',
  },
  pressure: {
    marginTop: 4,
    fontSize: 14,
    color: '#666',
  },
});

export default WeatherCard;