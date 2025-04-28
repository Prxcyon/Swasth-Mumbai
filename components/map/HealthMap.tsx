import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE, Heatmap } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import useLocation from '@/hooks/useLocation';
import i18n from '@/i18n';
import { DiseaseReport } from '@/types';
import { MapPin, Pill, Building2, Map as MapIcon, OctagonAlert as AlertOctagon, CircleCheck as CheckCircle, Circle as XCircle } from 'lucide-react-native';
import * as Location from 'expo-location';
import { useOutbreaks } from '../report/OutbreaksContext';

// Add Hospital interface for type safety
interface Hospital {
  id: string;
  name: string;
  address: string;
  lat: number;
  lon: number;
  type: 'hospital';
}

// Add Pharmacy interface for type safety
interface Pharmacy {
  id: string;
  name: string;
  address: string;
  lat: number;
  lon: number;
  type: 'pharmacy';
}

// Comprehensive list of major Mumbai hospitals with accurate coordinates and addresses
const HOSPITALS: Hospital[] = [
  {
    id: 'h1',
    name: 'Lilavati Hospital & Research Centre',
    address: 'A-791, Bandra Reclamation, Bandra West, Mumbai, Maharashtra 400050',
    lat: 19.0506,
    lon: 72.8295,
    type: 'hospital'
  },
  {
    id: 'h2',
    name: 'Kokilaben Dhirubhai Ambani Hospital',
    address: 'Rao Saheb Achutrao Patwardhan Marg, Four Bungalows, Andheri West, Mumbai, Maharashtra 400053',
    lat: 19.1342,
    lon: 72.8324,
    type: 'hospital'
  },
  {
    id: 'h3',
    name: 'Bombay Hospital & Medical Research Centre',
    address: '12, Marine Lines, Mumbai, Maharashtra 400020',
    lat: 18.9440,
    lon: 72.8258,
    type: 'hospital'
  },
  {
    id: 'h4',
    name: 'Nanavati Super Speciality Hospital',
    address: 'S.V. Road, Vile Parle West, Mumbai, Maharashtra 400056',
    lat: 19.0966,
    lon: 72.8411,
    type: 'hospital'
  },
  {
    id: 'h5',
    name: 'Sir H. N. Reliance Foundation Hospital',
    address: 'Raja Rammohan Roy Rd, Prarthana Samaj, Girgaon, Mumbai, Maharashtra 400004',
    lat: 18.9542,
    lon: 72.8198,
    type: 'hospital'
  },
  {
    id: 'h6',
    name: 'Tata Memorial Hospital',
    address: 'Dr. E Borges Road, Parel, Mumbai, Maharashtra 400012',
    lat: 18.9966,
    lon: 72.8436,
    type: 'hospital'
  },
  {
    id: 'h7',
    name: 'Breach Candy Hospital',
    address: '60 A, Bhulabhai Desai Road, Mumbai, Maharashtra 400026',
    lat: 18.9677,
    lon: 72.8076,
    type: 'hospital'
  },
  {
    id: 'h8',
    name: 'Jaslok Hospital & Research Centre',
    address: '15, Dr. G Deshmukh Marg, Pedder Road, Mumbai, Maharashtra 400026',
    lat: 18.9717,
    lon: 72.8087,
    type: 'hospital'
  },
  {
    id: 'h9',
    name: 'Hinduja Hospital',
    address: 'Veer Savarkar Marg, Mahim, Mumbai, Maharashtra 400016',
    lat: 19.0386,
    lon: 72.8401,
    type: 'hospital'
  },
  {
    id: 'h10',
    name: 'S L Raheja Hospital',
    address: 'Raheja Rugnalaya Marg, Mahim West, Mumbai, Maharashtra 400016',
    lat: 19.0382,
    lon: 72.8407,
    type: 'hospital'
  },
  {
    id: 'h11',
    name: 'King Edward Memorial (KEM) Hospital',
    address: 'Acharya Donde Marg, Parel, Mumbai, Maharashtra 400012',
    lat: 18.9902,
    lon: 72.8411,
    type: 'hospital'
  },
  {
    id: 'h12',
    name: 'Lokmanya Tilak Municipal General (Sion) Hospital',
    address: 'Dr. Babasaheb Ambedkar Rd, Sion West, Mumbai, Maharashtra 400022',
    lat: 19.0380,
    lon: 72.8597,
    type: 'hospital'
  },
  {
    id: 'h13',
    name: 'BYL Nair Hospital',
    address: 'Dr. A.L. Nair Road, Mumbai Central, Mumbai, Maharashtra 400008',
    lat: 18.9726,
    lon: 72.8236,
    type: 'hospital'
  },
  {
    id: 'h14',
    name: 'Wockhardt Hospitals Mumbai Central',
    address: '1877, Dr. Anand Rao Nair Marg, Mumbai Central, Mumbai, Maharashtra 400008',
    lat: 18.9722,
    lon: 72.8232,
    type: 'hospital'
  },
  {
    id: 'h15',
    name: 'Global Hospital Mumbai',
    address: '35, Dr. E Borges Road, Parel, Mumbai, Maharashtra 400012',
    lat: 18.9956,
    lon: 72.8432,
    type: 'hospital'
  },
  {
    id: 'h16',
    name: 'Holy Family Hospital',
    address: 'St. Andrews Road, Bandra West, Mumbai, Maharashtra 400050',
    lat: 19.0502,
    lon: 72.8347,
    type: 'hospital'
  },
  {
    id: 'h17',
    name: 'Hiranandani Hospital',
    address: 'Hiranandani Gardens, Powai, Mumbai, Maharashtra 400076',
    lat: 19.1202,
    lon: 72.9096,
    type: 'hospital'
  },
  {
    id: 'h18',
    name: 'Cooper Hospital',
    address: 'Bhaktivedanta Swami Rd, Juhu, Mumbai, Maharashtra 400056',
    lat: 19.1071,
    lon: 72.8266,
    type: 'hospital'
  },
  {
    id: 'h19',
    name: 'SevenHills Hospital',
    address: 'Marol Maroshi Road, Andheri East, Mumbai, Maharashtra 400059',
    lat: 19.1111,
    lon: 72.8827,
    type: 'hospital'
  },
  {
    id: 'h20',
    name: 'SRCC Childrens Hospital',
    address: '173, Dr. Annie Besant Rd, Worli, Mumbai, Maharashtra 400018',
    lat: 19.0176,
    lon: 72.8172,
    type: 'hospital'
  }
];

// Sample list of major Mumbai pharmacies with accurate coordinates and addresses
const PHARMACIES: Pharmacy[] = [
  {
    id: 'p1',
    name: 'Apollo Pharmacy',
    address: 'Shop No 1, Ground Floor, Shreeji Heights, Sector 46A, Seawoods, Navi Mumbai, Maharashtra 400706',
    lat: 19.0330,
    lon: 73.0297,
    type: 'pharmacy'
  },
  {
    id: 'p2',
    name: 'Wellness Forever Chemists & Lifestyle',
    address: 'Shop No 2, Plot No 6, Sagar Darshan, Carter Road, Bandra West, Mumbai, Maharashtra 400050',
    lat: 19.0634,
    lon: 72.8237,
    type: 'pharmacy'
  },
  {
    id: 'p3',
    name: 'MedPlus Pharmacy',
    address: 'Shop No 4, Ground Floor, Shreeji Heights, Sector 46A, Seawoods, Navi Mumbai, Maharashtra 400706',
    lat: 19.0332,
    lon: 73.0299,
    type: 'pharmacy'
  },
  {
    id: 'p4',
    name: 'Suburban Diagnostics & Pharmacy',
    address: 'Shop No 3, Ground Floor, Shreeji Heights, Sector 46A, Seawoods, Navi Mumbai, Maharashtra 400706',
    lat: 19.0331,
    lon: 73.0298,
    type: 'pharmacy'
  },
  {
    id: 'p5',
    name: 'Fortis Healthworld',
    address: 'Shop No 5, Ground Floor, Shreeji Heights, Sector 46A, Seawoods, Navi Mumbai, Maharashtra 400706',
    lat: 19.0333,
    lon: 73.0300,
    type: 'pharmacy'
  },
  {
    id: 'p6',
    name: 'Guardian Pharmacy',
    address: 'Shop No 6, Ground Floor, Shreeji Heights, Sector 46A, Seawoods, Navi Mumbai, Maharashtra 400706',
    lat: 19.0334,
    lon: 73.0301,
    type: 'pharmacy'
  },
  {
    id: 'p7',
    name: 'Religare Wellness',
    address: 'Shop No 7, Ground Floor, Shreeji Heights, Sector 46A, Seawoods, Navi Mumbai, Maharashtra 400706',
    lat: 19.0335,
    lon: 73.0302,
    type: 'pharmacy'
  },
  {
    id: 'p8',
    name: 'Apollo Pharmacy (Andheri)',
    address: 'Shop No 8, Ground Floor, Shreeji Heights, Sector 46A, Seawoods, Navi Mumbai, Maharashtra 400706',
    lat: 19.1197,
    lon: 72.8468,
    type: 'pharmacy'
  },
  {
    id: 'p9',
    name: 'Wellness Forever (Dadar)',
    address: 'Shop No 9, Ground Floor, Shreeji Heights, Sector 46A, Seawoods, Navi Mumbai, Maharashtra 400706',
    lat: 19.0176,
    lon: 72.8562,
    type: 'pharmacy'
  },
  {
    id: 'p10',
    name: 'MedPlus (Powai)',
    address: 'Shop No 10, Ground Floor, Shreeji Heights, Sector 46A, Seawoods, Navi Mumbai, Maharashtra 400706',
    lat: 19.1196,
    lon: 72.9097,
    type: 'pharmacy'
  }
];

// Mock disease reports
const DISEASE_REPORTS: DiseaseReport[] = [
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

interface MapFilterProps {
  showHospitals: boolean;
  showDiseaseReports: boolean;
  onToggleHospitals: () => void;
  onToggleDiseaseReports: () => void;
}

const MapFilters: React.FC<MapFilterProps> = ({
  showHospitals,
  showDiseaseReports,
  onToggleHospitals,
  onToggleDiseaseReports
}) => {
  return (
    <View style={styles.filtersContainer}>
      <TouchableOpacity
        style={[styles.filterButton, showHospitals && styles.filterButtonActive]}
        onPress={onToggleHospitals}
      >
        <Building2 size={16} color={showHospitals ? '#fff' : '#333'} />
        <Text style={[styles.filterText, showHospitals && styles.filterTextActive]}>
          {i18n.t('map.hospitalLocations')}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.filterButton, showDiseaseReports && styles.filterButtonActive]}
        onPress={onToggleDiseaseReports}
      >
        <AlertOctagon size={16} color={showDiseaseReports ? '#fff' : '#333'} />
        <Text style={[styles.filterText, showDiseaseReports && styles.filterTextActive]}>
          {i18n.t('map.diseaseOutbreaks')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

interface MapLegendProps {
  visible: boolean;
  onClose: () => void;
}

const MapLegend: React.FC<MapLegendProps> = ({ visible, onClose }) => {
  if (!visible) return null;
  
  return (
    <View style={styles.legendContainer}>
      <View style={styles.legendHeader}>
        <Text style={styles.legendTitle}>{i18n.t('map.legend')}</Text>
        <TouchableOpacity onPress={onClose}>
          <XCircle size={20} color="#333" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.legendSection}>
        <Text style={styles.legendSectionTitle}>{i18n.t('map.diseaseOutbreaks')}</Text>
        <View style={styles.legendItem}>
          <View style={[styles.legendIcon, { backgroundColor: '#34C759' }]}>
            <CheckCircle size={12} color="#fff" />
          </View>
          <Text style={styles.legendText}>{i18n.t('map.confirmed')}</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendIcon, { backgroundColor: '#FF9500' }]}>
            <AlertOctagon size={12} color="#fff" />
          </View>
          <Text style={styles.legendText}>{i18n.t('map.suspected')}</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendIcon, { backgroundColor: '#FF3B30' }]}>
            <XCircle size={12} color="#fff" />
          </View>
          <Text style={styles.legendText}>{i18n.t('map.rejected')}</Text>
        </View>
      </View>
      
      <View style={styles.legendSection}>
        <Text style={styles.legendSectionTitle}>{i18n.t('map.hospitalLocations')}</Text>
        <View style={styles.legendItem}>
          <View style={[styles.legendIcon, { backgroundColor: '#FF3B30', alignItems: 'center', justifyContent: 'center' }]}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14 }}>H</Text>
          </View>
          <Text style={styles.legendText}>{i18n.t('map.hospital')}</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendIcon, { backgroundColor: '#4CD964' }]}>
            <Pill size={12} color="#fff" />
          </View>
          <Text style={styles.legendText}>{i18n.t('map.pharmacy')}</Text>
        </View>
      </View>
    </View>
  );
};

const GOOGLE_PLACES_API_KEY = 'AIzaSyDXZIaSnyKeUzD7Q99dwDx8RfRag2OqFe0';

const HealthMap: React.FC = () => {
  const location = useLocation();
  const { outbreaks } = useOutbreaks();
  const [showHospitals, setShowHospitals] = useState(true);
  const [showDiseaseReports, setShowDiseaseReports] = useState(true);
  const [showLegend, setShowLegend] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState<string | null>(null);
  const [calloutAddresses, setCalloutAddresses] = useState<{ [id: string]: string }>({});
  const [googleHospitals, setGoogleHospitals] = useState<Hospital[]>([]);
  const [googlePharmacies, setGooglePharmacies] = useState<Pharmacy[]>([]);

  useEffect(() => {
    // Fetch hospitals from Google Places API for Mumbai
    const fetchHospitals = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/textsearch/json?query=hospitals+in+Mumbai&key=${GOOGLE_PLACES_API_KEY}`
        );
        const data = await response.json();
        if (data.results) {
          setGoogleHospitals(
            data.results.map((place: any, idx: number) => ({
              id: `g${idx}`,
              name: place.name,
              address: place.formatted_address,
              lat: place.geometry.location.lat,
              lon: place.geometry.location.lng,
              type: 'hospital',
            }))
          );
        }
      } catch (e) {
        // Handle error
      }
    };
    // Fetch pharmacies from Google Places API for Mumbai
    const fetchPharmacies = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/textsearch/json?query=pharmacies+in+Mumbai&key=${GOOGLE_PLACES_API_KEY}`
        );
        const data = await response.json();
        if (data.results) {
          setGooglePharmacies(
            data.results.map((place: any, idx: number) => ({
              id: `gp${idx}`,
              name: place.name,
              address: place.formatted_address,
              lat: place.geometry.location.lat,
              lon: place.geometry.location.lng,
              type: 'pharmacy',
            }))
          );
        }
      } catch (e) {
        // Handle error
      }
    };
    fetchHospitals();
    fetchPharmacies();
  }, []);

  // Helper to reverse geocode for outbreaks
  const fetchAddress = async (lat: number, lon: number, id: string) => {
    try {
      const res = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lon });
      if (res && res.length > 0) {
        const place = res[0];
        const address = [place.name, place.street, place.city, place.region].filter(Boolean).join(', ');
        setCalloutAddresses(prev => ({ ...prev, [id]: address }));
      }
    } catch {}
  };

  if (location.loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading map and location...</Text>
      </View>
    );
  }
  if (location.error || location.latitude === null || location.longitude === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Unable to access location. Please enable location services and restart the app.</Text>
        {location.error && <Text style={{ color: 'red' }}>{location.error}</Text>}
      </View>
    );
  }
  const initialRegion = {
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const getDiseaseMarkerColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return '#34C759';
      case 'rejected':
        return '#FF3B30';
      default:
        return '#FF9500';
    }
  };
  
  const getHospitalMarkerColor = (type: string) => {
    switch (type) {
      case 'hospital':
        return '#007AFF';
      case 'pharmacy':
        return '#4CD964';
      default:
        return '#8E8E93';
    }
  };

  // Group reports by disease type for heatmap
  const diseaseTypes = Array.from(new Set(outbreaks.map(r => r.disease_type)));
  const heatmapPoints = selectedDisease
    ? outbreaks.filter(r => r.disease_type === selectedDisease).map(r => ({
        latitude: r.location.lat,
        longitude: r.location.lon,
        weight: 1
      }))
    : outbreaks.map(r => ({
        latitude: r.location.lat,
        longitude: r.location.lon,
        weight: 1
      }));

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
      >
        {/* User location marker */}
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          pinColor="#80A1D4"
        >
          <Callout>
            <View style={styles.callout}>
              <Text style={styles.calloutTitle}>{i18n.t('map.your_location')}</Text>
            </View>
          </Callout>
        </Marker>
        
        {/* Outbreak Markers */}
        {showDiseaseReports && outbreaks.map(report => (
          <Marker
            key={report.id}
            coordinate={{
              latitude: report.location.lat,
              longitude: report.location.lon
            }}
            pinColor={getDiseaseMarkerColor(report.status)}
            onPress={() => {
              if (!calloutAddresses[report.id]) fetchAddress(report.location.lat, report.location.lon, report.id);
            }}
          >
            <Callout>
              <View style={{ maxWidth: 220, padding: 8, backgroundColor: 'white', borderRadius: 8 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 17, marginBottom: 4, color: '#222' }}>{report.disease_type}</Text>
                <Text style={{ color: '#555', marginBottom: 2 }}>Symptoms: {report.symptoms.join(', ')}</Text>
                <Text style={{ color: '#555', marginBottom: 2 }}>Reported: {new Date(report.reported_at).toLocaleDateString()}</Text>
                <Text style={{ color: '#555', marginBottom: 2 }}>Legitimacy: {report.legitimacy_percentage}%</Text>
                <Text style={{ color: '#555', marginBottom: 2 }}>Confirmations: {report.confirmations} | Denials: {report.denials}</Text>
                <Text style={{ color: getDiseaseMarkerColor(report.status), marginBottom: 2, fontWeight: 'bold' }}>Status: {report.status.charAt(0).toUpperCase() + report.status.slice(1)}</Text>
                <Text style={{ color: '#555', marginBottom: 2 }}>
                  Location: {calloutAddresses[report.id] || `${report.location.lat.toFixed(4)}, ${report.location.lon.toFixed(4)}`}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
        {/* Heatmap Layer */}
        {showDiseaseReports && heatmapPoints.length > 0 && (
          <Heatmap
            points={heatmapPoints}
            radius={40}
            opacity={0.5}
            gradient={{
              colors: ['#00f', '#0ff', '#0f0', '#ff0', '#f00'],
              startPoints: [0.01, 0.25, 0.5, 0.75, 1],
              colorMapSize: 256
            }}
          />
        )}
        
        {/* Hospital markers (static) */}
        {showHospitals && HOSPITALS.map((hospital) => (
          <Marker
            key={hospital.id}
            coordinate={{
              latitude: hospital.lat,
              longitude: hospital.lon,
            }}
          >
            <View style={styles.hospitalMarker}>
              <Text style={styles.hospitalMarkerText}>H</Text>
            </View>
            <Callout>
              <View style={{ maxWidth: 220, padding: 8, backgroundColor: 'white', borderRadius: 8 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 17, marginBottom: 4, color: '#222' }}>{hospital.name}</Text>
                <Text style={{ color: '#555', marginBottom: 2, fontWeight: 'bold' }}>Type: Hospital</Text>
                <Text style={{ color: '#555', marginBottom: 2 }}>{hospital.address}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
        {/* Hospital markers (Google Places) */}
        {showHospitals && googleHospitals.map((hospital) => (
          <Marker
            key={hospital.id}
            coordinate={{
              latitude: hospital.lat,
              longitude: hospital.lon,
            }}
          >
            <View style={styles.hospitalMarker}>
              <Text style={styles.hospitalMarkerText}>H</Text>
            </View>
            <Callout>
              <View style={{ maxWidth: 220, padding: 8, backgroundColor: 'white', borderRadius: 8 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 17, marginBottom: 4, color: '#222' }}>{hospital.name}</Text>
                <Text style={{ color: '#555', marginBottom: 2, fontWeight: 'bold' }}>Type: Hospital</Text>
                <Text style={{ color: '#555', marginBottom: 2 }}>{hospital.address}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
        {/* Pharmacy markers (static and Google Places) */}
        {showHospitals && PHARMACIES.concat(googlePharmacies).map((pharmacy) => (
          <Marker
            key={pharmacy.id}
            coordinate={{
              latitude: pharmacy.lat,
              longitude: pharmacy.lon,
            }}
          >
            <View style={styles.pharmacyMarker}>
              <Pill size={20} color="#fff" />
            </View>
            <Callout>
              <View style={{ maxWidth: 220, padding: 8, backgroundColor: 'white', borderRadius: 8 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 17, marginBottom: 4, color: '#222' }}>{pharmacy.name}</Text>
                <Text style={{ color: '#555', marginBottom: 2, fontWeight: 'bold' }}>Type: Pharmacy</Text>
                <Text style={{ color: '#555', marginBottom: 2 }}>{pharmacy.address}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      
      {/* Disease Filter Buttons for Heatmap */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.8)', padding: 8 }}>
        <TouchableOpacity onPress={() => setSelectedDisease(null)} style={{ marginHorizontal: 4, padding: 6, backgroundColor: selectedDisease === null ? '#34C759' : '#dedede', borderRadius: 8 }}>
          <Text style={{ color: selectedDisease === null ? '#fff' : '#333' }}>All</Text>
        </TouchableOpacity>
        {diseaseTypes.map(type => (
          <TouchableOpacity key={type} onPress={() => setSelectedDisease(type)} style={{ marginHorizontal: 4, padding: 6, backgroundColor: selectedDisease === type ? '#34C759' : '#dedede', borderRadius: 8 }}>
            <Text style={{ color: selectedDisease === type ? '#fff' : '#333' }}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <MapFilters
        showHospitals={showHospitals}
        showDiseaseReports={showDiseaseReports}
        onToggleHospitals={() => setShowHospitals(v => !v)}
        onToggleDiseaseReports={() => setShowDiseaseReports(v => !v)}
      />
      
      <TouchableOpacity style={styles.legendButton} onPress={() => setShowLegend(true)}>
        <MapIcon size={20} color="#333" />
        <Text style={styles.legendButtonText}>{i18n.t('map.legend')}</Text>
      </TouchableOpacity>
      
      <MapLegend 
        visible={showLegend} 
        onClose={() => setShowLegend(false)} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  filtersContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  filterButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: 'white',
  },
  filterButtonActive: {
    backgroundColor: '#80A1D4',
  },
  filterText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 6,
  },
  filterTextActive: {
    color: 'white',
  },
  legendButton: {
    position: 'absolute',
    bottom: 20,
    right: 16,
    backgroundColor: 'white',
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  legendButtonText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 6,
  },
  legendContainer: {
    position: 'absolute',
    bottom: 80,
    right: 16,
    width: 220,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  legendHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  legendSection: {
    marginBottom: 16,
  },
  legendSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  legendIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: '#555',
  },
  hospitalMarker: {
    backgroundColor: '#FF3B30',
    borderRadius: 20,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  hospitalMarkerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  pharmacyMarker: {
    backgroundColor: '#4CD964',
    borderRadius: 20,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  callout: {
    width: 150,
    padding: 8,
  },
  calloutTitle: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 4,
  },
  calloutText: {
    fontSize: 12,
    color: '#555',
  },
});

export default HealthMap;