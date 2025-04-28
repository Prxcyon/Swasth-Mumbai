import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Alert,
  ActivityIndicator
} from 'react-native';
import i18n from '@/i18n';
import useLocation from '@/hooks/useLocation';
import { createDiseaseReport } from '@/services/reportService';
import { CircleCheck as CheckCircle, MapPin, ChevronLeft } from 'lucide-react-native';
import MapView, { Marker } from 'react-native-maps';
import Modal from 'react-native-modal';
import { useOutbreaks } from './OutbreaksContext';

const DISEASE_TYPES = [
  'dengue',
  'malaria',
  'typhoid',
  'cholera',
  'covid19',
  'gastroenteritis',
  'influenza',
  'other'
];

interface OutbreakReportFormProps {
  onBack: () => void;
}

const OutbreakReportForm: React.FC<OutbreakReportFormProps> = ({ onBack }) => {
  const location = useLocation();
  const { addOutbreak } = useOutbreaks();
  const [diseaseType, setDiseaseType] = useState<string>('');
  const [customDiseaseType, setCustomDiseaseType] = useState<string>('');
  const [symptoms, setSymptoms] = useState<string>('');
  const [details, setDetails] = useState<string>('');
  const [useCurrentLocation, setUseCurrentLocation] = useState<boolean>(true);
  const [pickedLocation, setPickedLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [draggedLocation, setDraggedLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  
  const handleMapPress = (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setDraggedLocation({ lat: latitude, lon: longitude });
  };

  const handleConfirmLocation = () => {
    if (draggedLocation) {
      setPickedLocation(draggedLocation);
      setUseCurrentLocation(false);
    }
    setShowLocationModal(false);
  };

  const getFinalLocation = () => {
    const lat = useCurrentLocation || !pickedLocation ? location.latitude : pickedLocation.lat;
    const lon = useCurrentLocation || !pickedLocation ? location.longitude : pickedLocation.lon;
    return {
      lat: lat ?? 0,
      lon: lon ?? 0
    };
  };

  const handleSubmit = async () => {
    // Validate form
    if (!diseaseType) {
      Alert.alert(
        i18n.t('common.error'),
        i18n.t('report.diseaseType')
      );
      return;
    }
    
    if (!symptoms) {
      Alert.alert(
        i18n.t('common.error'),
        i18n.t('report.symptoms')
      );
      return;
    }
    
    // Confirm submission
    Alert.alert(
      i18n.t('report.confirmationTitle'),
      i18n.t('report.confirmationMessage'),
      [
        {
          text: i18n.t('common.cancel'),
          style: 'cancel',
        },
        {
          text: i18n.t('common.confirm'),
          onPress: async () => {
            try {
              setSubmitting(true);
              
              const finalDiseaseType = diseaseType === 'other' ? 
                customDiseaseType : 
                i18n.t(`report.commonDiseases.${diseaseType}`);
              
              const symptomsList = symptoms
                .split(',')
                .map(item => item.trim())
                .filter(item => item.length > 0);
              
              const finalLocation = getFinalLocation();
              
              const report = {
                disease_type: finalDiseaseType,
                symptoms: symptomsList,
                location: finalLocation,
                details,
                reported_at: new Date().toISOString(),
                reported_by: 'current_user' // This would come from authentication
              };
              
              await createDiseaseReport(report);
              addOutbreak({
                ...report,
                id: Math.random().toString(36).substr(2, 9), // Temporary ID
                confirmations: 0,
                denials: 0,
                total_votes: 0,
                legitimacy_percentage: 100,
                status: 'pending',
              });
              
              // Reset form
              setDiseaseType('');
              setCustomDiseaseType('');
              setSymptoms('');
              setDetails('');
              
              Alert.alert(
                i18n.t('common.success'),
                i18n.t('report.reportSuccess')
              );
            } catch (error) {
              Alert.alert(
                i18n.t('common.error'),
                i18n.t('report.reportError')
              );
            } finally {
              setSubmitting(false);
            }
          },
        },
      ]
    );
  };
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <ChevronLeft size={24} color="#333" />
        <Text style={styles.backButtonText}>{i18n.t('common.back')}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{i18n.t('report.title')}</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{i18n.t('report.diseaseType')}</Text>
        <View style={styles.diseaseTypeContainer}>
          {DISEASE_TYPES.map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.diseaseTypeButton,
                diseaseType === type && styles.diseaseTypeButtonSelected,
              ]}
              onPress={() => setDiseaseType(type)}
            >
              <Text
                style={[
                  styles.diseaseTypeText,
                  diseaseType === type && styles.diseaseTypeTextSelected,
                ]}
              >
                {i18n.t(`report.commonDiseases.${type}`)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {diseaseType === 'other' && (
          <TextInput
            style={styles.input}
            placeholder={i18n.t('report.diseaseType')}
            value={customDiseaseType}
            onChangeText={setCustomDiseaseType}
          />
        )}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{i18n.t('report.symptoms')}</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder={i18n.t('report.symptomsPlaceholder')}
          value={symptoms}
          onChangeText={setSymptoms}
          multiline
          numberOfLines={3}
        />
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{i18n.t('report.location')}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity 
            style={[styles.locationButton, useCurrentLocation && styles.locationButtonSelected]}
            onPress={() => setUseCurrentLocation(true)}
          >
            <MapPin 
              size={16} 
              color={useCurrentLocation ? '#fff' : '#333'} 
            />
            <Text 
              style={[styles.locationButtonText, useCurrentLocation && styles.locationButtonTextSelected]}
            >
              {i18n.t('report.useCurrentLocation')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.locationButton, !useCurrentLocation && styles.locationButtonSelected, { marginLeft: 8 }]}
            onPress={() => setShowLocationModal(true)}
          >
            <MapPin size={16} color={!useCurrentLocation ? '#fff' : '#333'} />
            <Text style={[styles.locationButtonText, !useCurrentLocation && styles.locationButtonTextSelected]}>Pick Location</Text>
          </TouchableOpacity>
        </View>
        {!useCurrentLocation && pickedLocation && (
          <Text style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
            Selected: {pickedLocation.lat.toFixed(4)}, {pickedLocation.lon.toFixed(4)}
          </Text>
        )}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{i18n.t('report.details')}</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder={i18n.t('report.detailsPlaceholder')}
          value={details}
          onChangeText={setDetails}
          multiline
          numberOfLines={4}
        />
      </View>
      
      <TouchableOpacity 
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={submitting}
      >
        {submitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <CheckCircle size={20} color="#fff" />
            <Text style={styles.submitButtonText}>{i18n.t('report.submitReport')}</Text>
          </>
        )}
      </TouchableOpacity>
      <Modal isVisible={showLocationModal} onBackdropPress={() => setShowLocationModal(false)}>
        <View style={{ backgroundColor: 'white', borderRadius: 12, overflow: 'hidden', height: 400 }}>
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: location.latitude || 19.0760,
              longitude: location.longitude || 72.8777,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
            onPress={handleMapPress}
          >
            <Marker
              draggable
              coordinate={draggedLocation ? { latitude: draggedLocation.lat, longitude: draggedLocation.lon } : pickedLocation ? { latitude: pickedLocation.lat, longitude: pickedLocation.lon } : { latitude: location.latitude || 19.0760, longitude: location.longitude || 72.8777 }}
              onDragEnd={e => setDraggedLocation({ lat: e.nativeEvent.coordinate.latitude, lon: e.nativeEvent.coordinate.longitude })}
              pinColor="#34C759"
            />
          </MapView>
          <View style={{ padding: 12, alignItems: 'center' }}>
            <Text style={{ fontSize: 13, color: '#333', marginBottom: 8 }}>
              Selected: {draggedLocation ? `${draggedLocation.lat.toFixed(4)}, ${draggedLocation.lon.toFixed(4)}` : pickedLocation ? `${pickedLocation.lat.toFixed(4)}, ${pickedLocation.lon.toFixed(4)}` : 'None'}
            </Text>
            <TouchableOpacity style={{ backgroundColor: '#34C759', borderRadius: 8, paddingVertical: 8, paddingHorizontal: 24, marginBottom: 8 }} onPress={handleConfirmLocation}>
              <Text style={{ color: 'white', fontWeight: '600' }}>Confirm Location</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: '#dedede', borderRadius: 8, paddingVertical: 8, paddingHorizontal: 24 }} onPress={() => setShowLocationModal(false)}>
              <Text style={{ color: '#333', fontWeight: '600' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  diseaseTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  diseaseTypeButton: {
    backgroundColor: '#DED9E2',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  diseaseTypeButtonSelected: {
    backgroundColor: '#80A1D4',
  },
  diseaseTypeText: {
    fontSize: 14,
    color: '#333',
  },
  diseaseTypeTextSelected: {
    color: 'white',
    fontWeight: '500',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#DED9E2',
    fontSize: 16,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DED9E2',
    borderRadius: 8,
    padding: 12,
  },
  locationButtonSelected: {
    backgroundColor: '#80A1D4',
  },
  locationButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  locationButtonTextSelected: {
    color: 'white',
  },
  submitButton: {
    backgroundColor: '#75C9C8',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    flexDirection: 'row',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  backButtonText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 4,
  },
});

export default OutbreakReportForm;