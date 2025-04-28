import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import ReportCard from '@/components/ui/ReportCard';
import { DiseaseReport } from '@/types';
import { voteOnReport } from '@/services/reportService';
import i18n from '@/i18n';
import { CirclePlus as PlusCircle } from 'lucide-react-native';
import { useOutbreaks } from './OutbreaksContext';

// Mock data for reports list
const REPORTS: DiseaseReport[] = [
  {
    id: 'd1',
    disease_type: 'Dengue',
    symptoms: ['fever', 'headache', 'rash'],
    location: { lat: 19.0890, lon: 72.8679 },
    reported_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    reported_by: 'user1',
    confirmations: 7,
    denials: 1,
    total_votes: 8,
    legitimacy_percentage: 88,
    status: 'confirmed'
  },
  {
    id: 'd2',
    disease_type: 'Gastroenteritis',
    symptoms: ['vomiting', 'diarrhea', 'abdominal pain'],
    location: { lat: 19.0720, lon: 72.8530 },
    reported_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    reported_by: 'user2',
    confirmations: 4,
    denials: 3,
    total_votes: 7,
    legitimacy_percentage: 57,
    status: 'pending'
  },
  {
    id: 'd3',
    disease_type: 'Influenza',
    symptoms: ['fever', 'cough', 'sore throat'],
    location: { lat: 19.0605, lon: 72.8360 },
    reported_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    reported_by: 'user3',
    confirmations: 2,
    denials: 8,
    total_votes: 10,
    legitimacy_percentage: 20,
    status: 'rejected'
  }
];

interface ReportsListProps {
  onNewReport: () => void;
}

const ReportsList: React.FC<ReportsListProps> = ({ onNewReport }) => {
  const [userVotes, setUserVotes] = React.useState<Record<string, boolean>>({});
  const { outbreaks } = useOutbreaks();
  
  const handleVote = async (reportId: string, voteType: 'confirm' | 'deny') => {
    if (userVotes[reportId]) {
      Alert.alert(
        i18n.t('common.error'),
        i18n.t('reportCard.alreadyVoted')
      );
      return;
    }
    
    try {
      // In a real app, this would call to the actual API
      // await voteOnReport(reportId, voteType, 'current_user');
      
      // For demo purposes, just mark as voted
      setUserVotes(prev => ({
        ...prev,
        [reportId]: true
      }));
      
      Alert.alert(
        i18n.t('common.success'),
        i18n.t(`reportCard.${voteType}`),
      );
    } catch (error) {
      Alert.alert(
        i18n.t('common.error'),
        String(error)
      );
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{i18n.t('map.diseaseOutbreaks')}</Text>
        <TouchableOpacity style={styles.newReportButton} onPress={onNewReport}>
          <PlusCircle size={18} color="#fff" />
          <Text style={styles.newReportText}>{i18n.t('report.title')}</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={outbreaks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ReportCard
            report={item}
            onConfirm={() => handleVote(item.id, 'confirm')}
            onDeny={() => handleVote(item.id, 'deny')}
            userVoted={userVotes[item.id]}
            showLocation
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{i18n.t('map.noReportsNearby')}</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4EA',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  newReportButton: {
    backgroundColor: '#75C9C8',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  newReportText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 6,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default ReportsList;