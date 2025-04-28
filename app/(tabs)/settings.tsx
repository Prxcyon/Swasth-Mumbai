import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppSettings from '@/components/settings/AppSettings';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <AppSettings />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4EA',
  },
});