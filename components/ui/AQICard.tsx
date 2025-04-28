import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AirQualityData } from '@/types';
import { getAqiCategory, calculateAqiFromPm25 } from '@/services/weatherService';
import i18n from '@/i18n';

interface AQICardProps {
  data: AirQualityData | null;
  isLoading: boolean;
}

const AQICard: React.FC<AQICardProps> = ({ data, isLoading }) => {
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

  const aqiRating = data.list[0].main.aqi; // 1-5
  const components = data.list[0].components;
  const calculatedAqi = calculateAqiFromPm25(components.pm2_5);
  const aqiInfo = getAqiCategory(aqiRating);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{i18n.t('dashboard.aqi')}</Text>
      </View>
      <View style={[styles.aqiContainer, { backgroundColor: aqiInfo.color }]}> 
        <Text style={styles.aqiValue}>{calculatedAqi}</Text>
        <Text style={styles.aqiLabel}>{i18n.t(`aqi.${aqiInfo.label.toLowerCase()}`)}</Text>
      </View>
      <Text style={styles.advice}>{aqiInfo.advice}</Text>
      <Text style={styles.ratingText}>
        {i18n.t('dashboard.airQualityIndex')}: {aqiRating} ({i18n.t(`aqi.${aqiInfo.label.toLowerCase()}`)})
      </Text>
      <View style={styles.componentContainer}>
        <View style={styles.componentItem}>
          <Text style={styles.componentValue}>{components.pm2_5.toFixed(1)}</Text>
          <Text style={styles.componentLabel}>{i18n.t('dashboard.pm25')}</Text>
        </View>
        <View style={styles.componentItem}>
          <Text style={styles.componentValue}>{components.pm10.toFixed(1)}</Text>
          <Text style={styles.componentLabel}>{i18n.t('dashboard.pm10')}</Text>
        </View>
        <View style={styles.componentItem}>
          <Text style={styles.componentValue}>{components.no2.toFixed(1)}</Text>
          <Text style={styles.componentLabel}>{i18n.t('dashboard.no2')}</Text>
        </View>
        <View style={styles.componentItem}>
          <Text style={styles.componentValue}>{components.o3.toFixed(1)}</Text>
          <Text style={styles.componentLabel}>{i18n.t('dashboard.o3')}</Text>
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
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  aqiContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  aqiValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFF',
    marginRight: 12,
  },
  aqiLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
  },
  advice: {
    marginBottom: 8,
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  ratingText: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
    textAlign: 'center',
  },
  componentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  componentItem: {
    alignItems: 'center',
    flex: 1,
  },
  componentValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  componentLabel: {
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
});

export default AQICard;
