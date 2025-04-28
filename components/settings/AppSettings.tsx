import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import i18n from '@/i18n';
import LanguageSelector from '@/components/ui/LanguageSelector';
import { UserSettings } from '@/types';
import { Globe, Bell, MapPin, Thermometer, Droplets, Wind, Info, ChevronRight } from 'lucide-react-native';

const AppSettings: React.FC = () => {
  const [settings, setSettings] = useState<UserSettings>({
    language: 'en',
    notifications_enabled: true,
    location_tracking_enabled: true,
    temperature_alert_threshold: {
      high: 35,
      low: 10,
    },
    humidity_alert_threshold: 80,
    wind_alert_threshold: 30,
  });
  
  const handleLanguageChange = (language: 'en' | 'hi' | 'mr') => {
    setSettings(prev => ({ ...prev, language }));
  };
  
  const handleToggleNotifications = () => {
    setSettings(prev => ({ 
      ...prev, 
      notifications_enabled: !prev.notifications_enabled 
    }));
  };
  
  const handleToggleLocationTracking = () => {
    setSettings(prev => ({ 
      ...prev, 
      location_tracking_enabled: !prev.location_tracking_enabled 
    }));
  };
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>{i18n.t('settings.title')}</Text>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Globe size={20} color="#333" />
          <Text style={styles.sectionTitle}>{i18n.t('settings.language')}</Text>
        </View>
        <View style={styles.languageSelectorContainer}>
          <LanguageSelector onChange={handleLanguageChange} />
        </View>
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Bell size={20} color="#333" />
          <Text style={styles.sectionTitle}>{i18n.t('settings.notifications')}</Text>
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>{i18n.t('settings.notifications')}</Text>
          <Switch
            value={settings.notifications_enabled}
            onValueChange={handleToggleNotifications}
            trackColor={{ false: '#DED9E2', true: '#80A1D4' }}
            thumbColor={settings.notifications_enabled ? '#fff' : '#f4f3f4'}
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MapPin size={20} color="#333" />
          <Text style={styles.sectionTitle}>{i18n.t('settings.locationTracking')}</Text>
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>{i18n.t('settings.locationTracking')}</Text>
          <Switch
            value={settings.location_tracking_enabled}
            onValueChange={handleToggleLocationTracking}
            trackColor={{ false: '#DED9E2', true: '#80A1D4' }}
            thumbColor={settings.location_tracking_enabled ? '#fff' : '#f4f3f4'}
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Thermometer size={20} color="#333" />
          <Text style={styles.sectionTitle}>{i18n.t('settings.alertThresholds')}</Text>
        </View>
        
        <View style={styles.sliderContainer}>
          <View style={styles.sliderHeader}>
            <Text style={styles.sliderLabel}>{i18n.t('settings.alertSettings.highTemp')}</Text>
            <Text style={styles.sliderValue}>{settings.temperature_alert_threshold.high}°C</Text>
          </View>
          <Slider
            style={styles.slider}
            value={settings.temperature_alert_threshold.high}
            minimumValue={30}
            maximumValue={45}
            step={1}
            minimumTrackTintColor="#80A1D4"
            maximumTrackTintColor="#DED9E2"
            thumbTintColor="#80A1D4"
            onValueChange={(value) => 
              setSettings(prev => ({ 
                ...prev, 
                temperature_alert_threshold: {
                  ...prev.temperature_alert_threshold,
                  high: value
                }
              }))
            }
          />
        </View>
        
        <View style={styles.sliderContainer}>
          <View style={styles.sliderHeader}>
            <Text style={styles.sliderLabel}>{i18n.t('settings.alertSettings.humidity')}</Text>
            <Text style={styles.sliderValue}>{settings.humidity_alert_threshold}%</Text>
          </View>
          <Slider
            style={styles.slider}
            value={settings.humidity_alert_threshold}
            minimumValue={60}
            maximumValue={100}
            step={5}
            minimumTrackTintColor="#80A1D4"
            maximumTrackTintColor="#DED9E2"
            thumbTintColor="#80A1D4"
            onValueChange={(value) => 
              setSettings(prev => ({ ...prev, humidity_alert_threshold: value }))
            }
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Info size={20} color="#333" />
          <Text style={styles.sectionTitle}>{i18n.t('settings.about')}</Text>
        </View>
        
        <TouchableOpacity style={styles.aboutRow}>
          <Text style={styles.aboutLabel}>{i18n.t('settings.privacy')}</Text>
          <ChevronRight size={16} color="#999" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.aboutRow}>
          <Text style={styles.aboutLabel}>{i18n.t('settings.terms')}</Text>
          <ChevronRight size={16} color="#999" />
        </TouchableOpacity>
        
        <Text style={styles.versionText}>Swasth Mumbai v1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4EA',
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 24,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  languageSelectorContainer: {
    alignItems: 'center',
  },
  sliderContainer: {
    marginBottom: 16,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sliderLabel: {
    fontSize: 16,
    color: '#333',
  },
  sliderValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#80A1D4',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  aboutLabel: {
    fontSize: 16,
    color: '#333',
  },
  versionText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 16,
  },
});

export default AppSettings;