import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { HealthAlert } from '@/types';
import i18n from '@/i18n';
import { TriangleAlert as AlertTriangle, Info, ThermometerSun, Wind } from 'lucide-react-native';

interface AlertCardProps {
  alert: HealthAlert;
  onPress?: () => void;
}

const AlertCard: React.FC<AlertCardProps> = ({ alert, onPress }) => {
  const getBackgroundColor = () => {
    switch (alert.severity) {
      case 'high':
        return 'rgba(255, 59, 48, 0.1)';
      case 'medium':
        return 'rgba(255, 149, 0, 0.1)';
      case 'low':
        return 'rgba(255, 204, 0, 0.1)';
      default:
        return 'rgba(142, 142, 147, 0.1)';
    }
  };

  const getBorderColor = () => {
    switch (alert.severity) {
      case 'high':
        return '#FF3B30';
      case 'medium':
        return '#FF9500';
      case 'low':
        return '#FFCC00';
      default:
        return '#8E8E93';
    }
  };

  const getIcon = () => {
    const iconColor = getBorderColor();
    const iconSize = 24;

    switch (alert.type) {
      case 'weather':
        if (alert.title.includes('Temperature')) {
          return <ThermometerSun size={iconSize} color={iconColor} />;
        } else if (alert.title.includes('Wind')) {
          return <Wind size={iconSize} color={iconColor} />;
        } else {
          return <AlertTriangle size={iconSize} color={iconColor} />;
        }
      case 'aqi':
        return <Info size={iconSize} color={iconColor} />;
      case 'disease':
        return <AlertTriangle size={iconSize} color={iconColor} />;
      case 'festival':
        return <Info size={iconSize} color={iconColor} />;
      default:
        return <AlertTriangle size={iconSize} color={iconColor} />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString(i18n.locale, { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: getBackgroundColor(), borderColor: getBorderColor() }
      ]}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        {getIcon()}
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{alert.title}</Text>
        <Text style={styles.message} numberOfLines={2}>{alert.message}</Text>
        <Text style={styles.time}>{formatDate(alert.created_at)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
  },
  iconContainer: {
    marginRight: 12,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  time: {
    fontSize: 12,
    color: '#777',
  },
});

export default AlertCard;