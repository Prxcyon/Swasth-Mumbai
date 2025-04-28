import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity, Alert, Platform, Modal } from 'react-native';
import WeatherCard from '@/components/ui/WeatherCard';
import AlertCard from '@/components/ui/AlertCard';
import useLocation from '@/hooks/useLocation';
import useWeatherAndAQI from '@/hooks/useWeatherAndAQI';
import useAlerts from '@/hooks/useAlerts';
import i18n from '@/i18n';
import { ArrowRight, MapPin } from 'lucide-react-native';
import useAQI from '@/hooks/useAQI';
import AQICard from '@/components/ui/AQICard';
import { useOutbreaks } from '@/components/report/OutbreaksContext';
import { useAlert } from '@/components/alerts/AlertContext';
import * as Notifications from 'expo-notifications';
import { HealthAlert } from '@/types';

const LiveDashboard: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [customAlerts, setCustomAlerts] = useState<HealthAlert[]>([]);
  const location = useLocation();
  const { outbreaks } = useOutbreaks();
  const { showAlert } = useAlert();
  const outbreakAlertShown = useRef(false);
  const aqiAlertShown = useRef(false);
  const [selectedAlert, setSelectedAlert] = useState<HealthAlert | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  
  const { 
    weatherData, 
    loading: weatherLoading, 
    lastUpdated,
    refetch: refetchWeather
  } = useWeatherAndAQI(location.latitude, location.longitude);
  
  const { 
    alerts,
    loading: alertsLoading,
    refetch: refetchAlerts
  } = useAlerts(
    location.latitude || 0, 
    location.longitude || 0,
    weatherData,
    null
  );

  const { aqiData, loading: aqiLoading, error: aqiError, refetch: refetchAQI } = useAQI(location.latitude, location.longitude);

  // Haversine formula to calculate distance between two lat/lon points in meters
  function getDistanceFromLatLonInMeters(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371000; // Radius of the earth in meters
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      0.5 - Math.cos(dLat) / 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        (1 - Math.cos(dLon)) / 2;
    return R * 2 * Math.asin(Math.sqrt(a));
  }

  useEffect(() => {
    if (
      location.latitude &&
      location.longitude &&
      outbreaks.length > 0 &&
      !outbreakAlertShown.current
    ) {
      const userLocation = { lat: location.latitude, lon: location.longitude };
      const radiusMeters = 1000; // 1 km
      const isInOutbreakArea = outbreaks.some(outbreak => {
        const distance = getDistanceFromLatLonInMeters(
          userLocation.lat,
          userLocation.lon,
          outbreak.location.lat,
          outbreak.location.lon
        );
        return distance < radiusMeters;
      });
      if (isInOutbreakArea) {
        const outbreakAlert = {
          id: 'outbreak-alert',
          type: 'disease',
          severity: 'high',
          title: 'Disease Outbreak Alert',
          message: 'You are in an area with a reported disease outbreak. Please take precautions!',
          created_at: new Date().toISOString(),
          expires_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour expiry
          location: { lat: location.latitude, lon: location.longitude },
          active: true,
        } as HealthAlert;
        setCustomAlerts([outbreakAlert]);
        showAlert({
          type: 'outbreak',
          message: outbreakAlert.message,
          severity: 'high',
        });
        Notifications.scheduleNotificationAsync({
          content: {
            title: outbreakAlert.title,
            body: outbreakAlert.message,
            sound: true,
          },
          trigger: null, // immediately
        });
        outbreakAlertShown.current = true;
      }
    }
    if (
      aqiData &&
      aqiData.list &&
      aqiData.list[0] &&
      !aqiAlertShown.current
    ) {
      const aqi = aqiData.list[0].main.aqi;
      if (aqi === 4 || aqi === 5) {
        const aqiAlert = {
          id: 'aqi-alert',
          type: 'aqi',
          severity: aqi === 4 ? 'medium' : 'high',
          title: 'Air Quality Alert',
          message: 'Air quality is poor in your area. Please take precautions such as wearing a mask and avoiding outdoor activities.',
          created_at: new Date().toISOString(),
          expires_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
          location: { lat: location.latitude || 0, lon: location.longitude || 0 },
          active: true,
        } as HealthAlert;
        setCustomAlerts(prev => {
          if (prev.some(alert => alert.id === 'aqi-alert')) return prev;
          return [...prev, aqiAlert];
        });
        showAlert({
          type: 'aqi',
          message: aqiAlert.message,
          severity: aqi === 4 ? 'medium' : 'high',
        });
        Notifications.scheduleNotificationAsync({
          content: {
            title: aqiAlert.title,
            body: aqiAlert.message,
            sound: true,
          },
          trigger: null,
        });
        aqiAlertShown.current = true;
      }
    }
  }, [location.latitude, location.longitude, outbreaks, showAlert, aqiData]);

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refetchWeather(), refetchAlerts(), refetchAQI()]);
    setRefreshing(false);
  };

  const formatLastUpdated = () => {
    if (!lastUpdated) return '';
    
    return lastUpdated.toLocaleTimeString(i18n.locale, {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleLocationError = () => {
    Alert.alert(
      i18n.t('common.error'),
      i18n.t('dashboard.locationError'),
      [
        {
          text: i18n.t('common.ok'),
          style: 'cancel'
        }
      ]
    );
  };

  const handleAlertPress = (alert: HealthAlert) => {
    setSelectedAlert(alert);
    setModalVisible(true);
  };

  const allAlerts = [...customAlerts, ...alerts];

  if (location.error) {
    return (
      <View style={styles.errorContainer}>
        <MapPin size={48} color="#FF3B30" />
        <Text style={styles.errorTitle}>{i18n.t('dashboard.locationError')}</Text>
        <Text style={styles.errorMessage}>{location.error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleLocationError}>
          <Text style={styles.retryButtonText}>{i18n.t('common.retry')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>{i18n.t('dashboard.title')}</Text>
        {lastUpdated && (
          <Text style={styles.lastUpdated}>
            {i18n.t('dashboard.lastUpdated')}: {formatLastUpdated()}
          </Text>
        )}
      </View>

      <WeatherCard 
        data={weatherData} 
        isLoading={weatherLoading || location.loading} 
      />
      <AQICard 
        data={aqiData} 
        isLoading={aqiLoading || location.loading} 
      />
      
      <View style={styles.alertsSection}>
        <View style={styles.alertsHeader}>
          <Text style={styles.alertsTitle}>{i18n.t('dashboard.alerts')}</Text>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>{i18n.t('dashboard.viewAllAlerts')}</Text>
            <ArrowRight size={16} color="#80A1D4" />
          </TouchableOpacity>
        </View>
        
        {alertsLoading ? (
          <Text style={styles.loadingText}>{i18n.t('common.loading')}</Text>
        ) : allAlerts.length > 0 ? (
          allAlerts.map(alert => (
            <AlertCard key={alert.id} alert={alert} onPress={() => handleAlertPress(alert)} />
          ))
        ) : (
          <Text style={styles.noAlertsText}>{i18n.t('dashboard.noAlerts')}</Text>
        )}
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.4)',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <View style={{
            backgroundColor: 'white',
            borderRadius: 16,
            padding: 24,
            width: '85%',
            maxWidth: 400,
            alignItems: 'center'
          }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 12 }}>{selectedAlert?.title}</Text>
            <Text style={{ fontSize: 16, color: '#555', marginBottom: 16 }}>{selectedAlert?.message}</Text>
            <Text style={{ fontSize: 13, color: '#888', marginBottom: 16 }}>
              {selectedAlert?.created_at ? new Date(selectedAlert.created_at).toLocaleString() : ''}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#80A1D4',
                borderRadius: 8,
                paddingVertical: 10,
                paddingHorizontal: 32,
                marginTop: 8
              }}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4EA',
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  lastUpdated: {
    fontSize: 12,
    color: '#666',
  },
  alertsSection: {
    padding: 16,
  },
  alertsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  alertsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: '#80A1D4',
    marginRight: 4,
  },
  loadingText: {
    textAlign: 'center',
    padding: 20,
    color: '#666',
  },
  noAlertsText: {
    textAlign: 'center',
    padding: 20,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F7F4EA',
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#80A1D4',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LiveDashboard;