import React from 'react';
import { View, StyleSheet } from 'react-native';
import LiveDashboard from '@/components/dashboard/LiveDashboard';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <LiveDashboard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4EA',
  },
});