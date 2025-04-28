import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DiseaseReport } from '@/types';
import i18n from '@/i18n';
import { CircleCheck as CheckCircle, Circle as XCircle } from 'lucide-react-native';
import * as Location from 'expo-location';

interface ReportCardProps {
  report: DiseaseReport;
  onConfirm?: () => void;
  onDeny?: () => void;
  userVoted?: boolean;
  showLocation?: boolean;
}

const ReportCard: React.FC<ReportCardProps> = ({ 
  report, 
  onConfirm, 
  onDeny,
  userVoted = false,
  showLocation = false
}) => {
  const [placeName, setPlaceName] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchPlaceName() {
      try {
        const res = await Location.reverseGeocodeAsync({
          latitude: report.location.lat,
          longitude: report.location.lon,
        });
        if (isMounted && res && res.length > 0) {
          const place = res[0];
          setPlaceName(
            place.district || place.subregion || place.city || place.region || place.name || null
          );
        }
      } catch {
        // ignore errors
      }
    }
    if (showLocation) fetchPlaceName();
    return () => { isMounted = false; };
  }, [report.location.lat, report.location.lon, showLocation]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(i18n.locale, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getStatusColor = () => {
    switch (report.status) {
      case 'confirmed':
        return '#34C759';
      case 'rejected':
        return '#FF3B30';
      default:
        return '#FF9500';
    }
  };

  const getLegitimacyColor = () => {
    if (report.legitimacy_percentage >= 70) {
      return '#34C759';
    } else if (report.legitimacy_percentage <= 30) {
      return '#FF3B30';
    } else {
      return '#FF9500';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.diseaseType}>{report.disease_type}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
          <Text style={styles.statusText}>
            {i18n.t(`reportCard.statusValues.${report.status}`)}
          </Text>
        </View>
      </View>

      <Text style={styles.symptoms}>{report.symptoms.join(', ')}</Text>
      {showLocation && (
        <Text style={styles.locationText}>
          {i18n.t('dashboard.location')}: {placeName ? placeName : `${report.location.lat.toFixed(4)}, ${report.location.lon.toFixed(4)}`}
        </Text>
      )}
      
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{i18n.t('reportCard.reportedOn')}:</Text>
        <Text style={styles.infoValue}>{formatDate(report.reported_at)}</Text>
      </View>
      
      <View style={styles.legitimacyContainer}>
        <View style={styles.legitimacyHeader}>
          <Text style={styles.legitimacyLabel}>{i18n.t('reportCard.legitimacy')}</Text>
          <Text 
            style={[styles.legitimacyValue, { color: getLegitimacyColor() }]}
          >
            {report.legitimacy_percentage}%
          </Text>
        </View>
        
        <View style={styles.progressBarBackground}>
          <View 
            style={[
              styles.progressBarFill, 
              { 
                width: `${report.legitimacy_percentage}%`,
                backgroundColor: getLegitimacyColor() 
              }
            ]} 
          />
        </View>
        
        <View style={styles.votesContainer}>
          <Text style={styles.votesText}>
            {i18n.t('reportCard.confirmations')}: {report.confirmations}
          </Text>
          <Text style={styles.votesText}>
            {i18n.t('reportCard.denials')}: {report.denials}
          </Text>
        </View>
      </View>

      {!userVoted && (
        <View style={styles.actionContainer}>
          <Text style={styles.actionTitle}>{i18n.t('reportCard.vote')}:</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.confirmButton]} 
              onPress={onConfirm}
            >
              <CheckCircle size={16} color="#FFF" />
              <Text style={styles.actionButtonText}>{i18n.t('reportCard.confirm')}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, styles.denyButton]} 
              onPress={onDeny}
            >
              <XCircle size={16} color="#FFF" />
              <Text style={styles.actionButtonText}>{i18n.t('reportCard.deny')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {userVoted && (
        <View style={styles.votedMessage}>
          <Text style={styles.votedText}>{i18n.t('reportCard.alreadyVoted')}</Text>
        </View>
      )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  diseaseType: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  symptoms: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 4,
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  legitimacyContainer: {
    marginBottom: 16,
  },
  legitimacyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  legitimacyLabel: {
    fontSize: 14,
    color: '#666',
  },
  legitimacyValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  votesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  votesText: {
    fontSize: 12,
    color: '#666',
  },
  actionContainer: {
    marginTop: 12,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
  },
  confirmButton: {
    backgroundColor: '#34C759',
    marginRight: 8,
  },
  denyButton: {
    backgroundColor: '#FF3B30',
    marginLeft: 8,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 8,
  },
  votedMessage: {
    marginTop: 12,
    backgroundColor: '#DED9E2',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  votedText: {
    color: '#666',
    fontWeight: '500',
  },
  locationText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
});

export default ReportCard;