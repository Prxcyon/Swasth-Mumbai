import React from 'react';
import { View, StyleSheet } from 'react-native';
import HealthToolkit from '@/components/health/HealthToolkit';

export default function HealthScreen() {
  return (
    <View style={styles.container}>
      <HealthToolkit />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4EA',
  },
});