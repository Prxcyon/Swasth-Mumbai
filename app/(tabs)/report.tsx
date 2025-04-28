import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import OutbreakReportForm from '@/components/report/OutbreakReportForm';
import ReportsList from '@/components/report/ReportsList';

export default function ReportScreen() {
  const [showForm, setShowForm] = useState(false);
  
  const toggleForm = () => {
    setShowForm(!showForm);
  };
  
  return (
    <View style={styles.container}>
      {showForm ? (
        <OutbreakReportForm onBack={() => setShowForm(false)} />
      ) : (
        <ReportsList onNewReport={() => setShowForm(true)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4EA',
  },
});