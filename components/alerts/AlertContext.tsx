import React, { createContext, useContext, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

interface AlertData {
  type: 'outbreak' | 'aqi' | 'humidity' | 'custom';
  message: string;
  severity?: 'high' | 'medium' | 'low';
}

interface AlertContextType {
  showAlert: (alert: AlertData) => void;
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alert, setAlert] = useState<AlertData | null>(null);
  const [visible, setVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  const showAlert = useCallback((alertData: AlertData) => {
    setAlert(alertData);
    setVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const hideAlert = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
      setAlert(null);
    });
  }, [fadeAnim]);

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      {visible && alert && (
        <Animated.View style={[styles.banner, { opacity: fadeAnim, backgroundColor: getBannerColor(alert.severity) }]}> 
          <Text style={styles.bannerText}>{alert.message}</Text>
          <TouchableOpacity onPress={hideAlert} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </AlertContext.Provider>
  );
};

function getBannerColor(severity?: string) {
  switch (severity) {
    case 'high': return '#FF3B30';
    case 'medium': return '#FF9500';
    case 'low': return '#34C759';
    default: return '#007AFF';
  }
}

export const useAlert = () => {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error('useAlert must be used within AlertProvider');
  return ctx;
};

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    elevation: 5,
  },
  bannerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
  },
  closeButton: {
    marginLeft: 16,
    padding: 4,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
}); 