import React from 'react';
import { View, Platform, Text, StyleSheet } from 'react-native';

// Only import HealthMap on native platforms
let HealthMap: React.ComponentType | null = null;
if (Platform.OS !== 'web') {
  HealthMap = require('@/components/map/HealthMap').default;
}

export default function MapScreen() {
  return (
    <View style={styles.container}>
      {Platform.OS === 'web' ? (
        <View style={styles.webMessage}>
          <Text style={styles.text}>
            Maps are currently only available on mobile devices.
          </Text>
          <Text style={styles.subText}>
            Please use our mobile app to access the full mapping features.
          </Text>
        </View>
      ) : (
        HealthMap && <HealthMap />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4EA',
  },
  webMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    color: '#333',
  },
  subText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
});