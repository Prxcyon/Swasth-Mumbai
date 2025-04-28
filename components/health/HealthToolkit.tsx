import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking } from 'react-native';
import i18n from '@/i18n';
import { Heart, Phone, Thermometer, Shield, BookOpen, User } from 'lucide-react-native';

interface CategoryProps {
  title: string;
  icon: React.ReactNode;
  color: string;
  onPress: () => void;
}

const Category: React.FC<CategoryProps> = ({ title, icon, color, onPress }) => {
  return (
    <TouchableOpacity 
      style={[styles.categoryCard, { backgroundColor: color }]} 
      onPress={onPress}
    >
      <View style={styles.categoryIcon}>
        {icon}
      </View>
      <Text style={styles.categoryTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

interface EmergencyContactProps {
  name: string;
  number: string;
}

const EmergencyContact: React.FC<EmergencyContactProps> = ({ name, number }) => {
  return (
    <TouchableOpacity style={styles.contactCard} onPress={() => Linking.openURL(`tel:${number}`)}>
      <View style={styles.contactIcon}>
        <Phone size={20} color="#80A1D4" />
      </View>
      <View style={styles.contactDetails}>
        <Text style={styles.contactName}>{name}</Text>
        <Text style={styles.contactNumber}>{number}</Text>
      </View>
    </TouchableOpacity>
  );
};

interface FirstAidInfoProps {
  title: string;
  steps: string[];
  image?: string;
}

const FirstAidInfo: React.FC<FirstAidInfoProps> = ({ title, steps, image }) => {
  let imageSource = undefined;
  if (typeof image === 'string') {
    imageSource = { uri: image };
  } else if (image) {
    imageSource = image;
  }
  return (
    <View style={styles.firstAidCard}>
      <Text style={styles.firstAidTitle}>{title}</Text>
      {imageSource && (
        <Image
          source={imageSource}
          style={styles.firstAidImage}
          resizeMode="cover"
        />
      )}
      <View style={styles.stepsList}>
        {steps.map((step, index) => (
          <View key={index} style={styles.stepItem}>
            <Text style={styles.stepNumber}>{index + 1}</Text>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

enum ToolkitSection {
  MAIN = 'main',
  FIRST_AID = 'firstAid',
  EMERGENCY_CONTACTS = 'emergencyContacts',
  PREVENTION = 'prevention',
  SYMPTOMS_GUIDE = 'symptomsGuide',
  HEALTH_EDUCATION = 'healthEducation',
}

const HealthToolkit: React.FC = () => {
  const [activeSection, setActiveSection] = useState<ToolkitSection>(ToolkitSection.MAIN);
  
  const renderMainSection = () => {
    return (
      <>
        <Text style={styles.title}>{i18n.t('health.title')}</Text>
        
        <View style={styles.categoriesContainer}>
          <Category
            title={i18n.t('health.firstAid')}
            icon={<Heart size={24} color="white" />}
            color="#FF9500"
            onPress={() => setActiveSection(ToolkitSection.FIRST_AID)}
          />
          <Category
            title={i18n.t('health.emergencyContacts')}
            icon={<Phone size={24} color="white" />}
            color="#FF3B30"
            onPress={() => setActiveSection(ToolkitSection.EMERGENCY_CONTACTS)}
          />
          <Category
            title={i18n.t('health.symptomsGuide')}
            icon={<Thermometer size={24} color="white" />}
            color="#34C759"
            onPress={() => setActiveSection(ToolkitSection.SYMPTOMS_GUIDE)}
          />
          <Category
            title={i18n.t('health.preventionTips')}
            icon={<Shield size={24} color="white" />}
            color="#007AFF"
            onPress={() => setActiveSection(ToolkitSection.PREVENTION)}
          />
          <Category
            title={i18n.t('health.healthEducation')}
            icon={<BookOpen size={24} color="white" />}
            color="#5856D6"
            onPress={() => setActiveSection(ToolkitSection.HEALTH_EDUCATION)}
          />
        </View>
        
        <View style={styles.festivalAlertsContainer}>
          <Text style={styles.sectionTitle}>{i18n.t('alerts.festivalAlert')}</Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={[styles.festivalCard, { backgroundColor: 'rgba(255, 149, 0, 0.2)' }]}>
              <Text style={styles.festivalTitle}>{i18n.t('festivals.diwali')}</Text>
              <Text style={styles.festivalAlert}>{i18n.t('festivals.alerts.diwali')}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.festivalCard, { backgroundColor: 'rgba(52, 199, 89, 0.2)' }]}>
              <Text style={styles.festivalTitle}>{i18n.t('festivals.holi')}</Text>
              <Text style={styles.festivalAlert}>{i18n.t('festivals.alerts.holi')}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.festivalCard, { backgroundColor: 'rgba(0, 122, 255, 0.2)' }]}>
              <Text style={styles.festivalTitle}>{i18n.t('festivals.ganeshChaturthi')}</Text>
              <Text style={styles.festivalAlert}>{i18n.t('festivals.alerts.ganeshChaturthi')}</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </>
    );
  };
  
  const renderFirstAidSection = () => {
    return (
      <>
        <View style={styles.sectionHeader}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => setActiveSection(ToolkitSection.MAIN)}
          >
            <Text style={styles.backButtonText}>{i18n.t('common.back')}</Text>
          </TouchableOpacity>
          <Text style={styles.sectionHeaderTitle}>{i18n.t('health.firstAid')}</Text>
        </View>
        
        <FirstAidInfo
          title="Burns"
          steps={[
            'Cool the burn under running water for 10-15 min. Cover with a clean, non-fluffy cloth. Do NOT apply ice or oils.',
            'Cover with a clean, non-sticky bandage or cloth.',
            'Do not break blisters. Seek medical help for severe burns.'
          ]}
          image="https://images.pexels.com/photos/4506105/pexels-photo-4506105.jpeg?auto=compress&cs=tinysrgb&w=600"
        />
        
        <FirstAidInfo
          title="Heatstroke"
          steps={[
            'Move the person to a cool place. Remove extra clothing.',
            'Cool the body with water, wet towels, or a fan.',
            'If conscious, give sips of cool water. Seek medical help immediately.'
          ]}
          image="https://images.pexels.com/photos/7108213/pexels-photo-7108213.jpeg?auto=compress&cs=tinysrgb&w=600"
        />
        
        <FirstAidInfo
          title="Choking"
          steps={[
            'Ask if the person can speak or cough. If not, stand behind and give abdominal thrusts (Heimlich maneuver).',
            'For infants, give 5 back blows and 5 chest thrusts.',
            'Call emergency services if the object does not come out.'
          ]}
          image={require('../../assets/firstaid/choking.jpg')}
        />
        
        <FirstAidInfo
          title="Severe Bleeding"
          steps={[
            'Apply firm, direct pressure with a clean cloth or bandage.',
            'Keep the injured part elevated if possible.',
            'Do not remove soaked cloths—add more layers if needed. Seek medical help if bleeding is heavy or does not stop.'
          ]}
          image={require('../../assets/firstaid/severe_bleeding.jpg')}
        />
        
        <FirstAidInfo
          title="Fractures (Broken Bones)"
          steps={[
            'Do not try to straighten the bone. Immobilize the area with a splint or padding.',
            'Apply a cold pack to reduce swelling (not directly on skin).',
            'Seek medical help. Do not move the person if you suspect a spinal, head, or hip injury.'
          ]}
          image="https://images.pexels.com/photos/4226216/pexels-photo-4226216.jpeg?auto=compress&fit=crop&w=600&q=80"
        />
        
        <FirstAidInfo
          title="Nosebleed"
          steps={[
            'Sit the person down and tilt their head slightly forward.',
            'Pinch the soft part of the nose and maintain pressure for 10 minutes.',
            'Do not let the person lie down or tilt their head back. Seek medical help if bleeding is severe or does not stop.'
          ]}
          image={require('../../assets/firstaid/nosebleed.jpg')}
        />
      </>
    );
  };
  
  const renderEmergencyContactsSection = () => {
    return (
      <>
        <View style={styles.sectionHeader}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => setActiveSection(ToolkitSection.MAIN)}
          >
            <Text style={styles.backButtonText}>{i18n.t('common.back')}</Text>
          </TouchableOpacity>
          <Text style={styles.sectionHeaderTitle}>{i18n.t('health.emergencyContacts')}</Text>
        </View>
        <EmergencyContact name="Centralized Helpline" number="112" />
        <EmergencyContact name={i18n.t('health.emergencyNumbers.police')} number="100" />
        <EmergencyContact name="Police (Alt)" number="022-22621855" />
        <EmergencyContact name={i18n.t('health.emergencyNumbers.fire')} number="101" />
        <EmergencyContact name="Fire (Alt)" number="022-23085991" />
        <EmergencyContact name="Fire (Alt)" number="022-23085992" />
        <EmergencyContact name={i18n.t('health.emergencyNumbers.ambulance')} number="108" />
        <EmergencyContact name="Ambulance (Alt)" number="102" />
        <EmergencyContact name="Ambulance (Private)" number="1298" />
        <EmergencyContact name="Ambulance (BMC)" number="022-24308888" />
        <EmergencyContact name={i18n.t('health.emergencyNumbers.women')} number="1091" />
        <EmergencyContact name="Women Helpline (Alt)" number="022-22633333" />
        <EmergencyContact name="Women Helpline (Alt)" number="22620111" />
        <EmergencyContact name={i18n.t('health.emergencyNumbers.child')} number="1098" />
        <EmergencyContact name={i18n.t('health.emergencyNumbers.disaster')} number="1077" />
        <EmergencyContact name="Disaster Helpline (Alt)" number="022-22694725" />
        <EmergencyContact name="Senior Citizen Helpline" number="1291" />
        <EmergencyContact name="Blood Bank" number="104" />
        <EmergencyContact name="Blood Bank (Alt)" number="1910" />
        <EmergencyContact name="AIDS Helpline" number="1097" />
        <EmergencyContact name="Gas Leakage" number="1906" />
        <EmergencyContact name="Railway Helpline" number="23004000" />
        <EmergencyContact name="Tourist Helpline" number="1363" />
        <EmergencyContact name="Road Accident" number="1073" />
        <EmergencyContact name="Medical Helpline" number="104" />
        <EmergencyContact name="Traffic Police WhatsApp" number="8454999999" />
      </>
    );
  };
  
  const renderPreventionSection = () => {
    return (
      <>
        <View style={styles.sectionHeader}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => setActiveSection(ToolkitSection.MAIN)}
          >
            <Text style={styles.backButtonText}>{i18n.t('common.back')}</Text>
          </TouchableOpacity>
          <Text style={styles.sectionHeaderTitle}>{i18n.t('health.preventionTips')}</Text>
        </View>
        
        <View style={styles.preventionCard}>
          <Text style={styles.preventionTitle}>Mosquito-borne Diseases</Text>
          <View style={styles.preventionContent}>
            <Image 
              source={{ uri: "https://images.pexels.com/photos/6621065/pexels-photo-6621065.jpeg?auto=compress&cs=tinysrgb&w=600" }} 
              style={styles.preventionImage} 
              resizeMode="cover"
            />
            <View style={styles.preventionTipsList}>
              <Text style={styles.preventionTip}>• Wear long sleeves and pants</Text>
              <Text style={styles.preventionTip}>• Use mosquito repellent</Text>
              <Text style={styles.preventionTip}>• Remove stagnant water sources</Text>
              <Text style={styles.preventionTip}>• Install screens on windows</Text>
              <Text style={styles.preventionTip}>• Use bed nets while sleeping</Text>
              <Text style={styles.preventionTip}>• Use mosquito nets and repellents</Text>
              <Text style={styles.preventionTip}>• Empty standing water containers weekly (prevent dengue, malaria)</Text>
            </View>
          </View>
        </View>
        <View style={styles.preventionCard}>
          <Text style={styles.preventionTitle}>Pollution Safety</Text>
          <View style={styles.preventionContent}>
            <Image 
              source={require('../../assets/prevention/pollution_safety.jpg')} 
              style={styles.preventionImage} 
              resizeMode="cover"
            />
            <View style={styles.preventionTipsList}>
              <Text style={styles.preventionTip}>• Wear an N95 mask when AQI is bad</Text>
              <Text style={styles.preventionTip}>• Avoid outdoor exercise when AQI &gt;150</Text>
              <Text style={styles.preventionTip}>• Stay indoors when pollution is severe</Text>
              <Text style={styles.preventionTip}>• Use air purifiers at home if possible</Text>
              <Text style={styles.preventionTip}>• Maintain good ventilation indoors</Text>
              <Text style={styles.preventionTip}>• Ensure your mask fits well and is NIOSH approved</Text>
            </View>
          </View>
        </View>
        <View style={styles.preventionCard}>
          <Text style={styles.preventionTitle}>Monsoon Illness Prevention</Text>
          <View style={styles.preventionContent}>
            <Image 
              source={require('../../assets/prevention/monsoon_illness.jpg')} 
              style={styles.preventionImage} 
              resizeMode="cover"
            />
            <View style={styles.preventionTipsList}>
              <Text style={styles.preventionTip}>• Avoid walking in dirty water (leptospirosis risk)</Text>
              <Text style={styles.preventionTip}>• Only drink boiled or filtered water</Text>
              <Text style={styles.preventionTip}>• Wash hands frequently with soap and water</Text>
              <Text style={styles.preventionTip}>• Avoid eating street food during monsoon</Text>
              <Text style={styles.preventionTip}>• Keep surroundings clean and dry</Text>
              <Text style={styles.preventionTip}>• Use insect repellents and nets</Text>
              <Text style={styles.preventionTip}>• Eat fresh, home-cooked meals</Text>
            </View>
          </View>
        </View>
        <View style={styles.preventionCard}>
          <Text style={styles.preventionTitle}>General Immunity Boost</Text>
          <View style={styles.preventionContent}>
            <Image 
              source={require('../../assets/prevention/immunity_boost.jpg')} 
              style={styles.preventionImage} 
              resizeMode="cover"
            />
            <View style={styles.preventionTipsList}>
              <Text style={styles.preventionTip}>• Eat fresh fruits and vegetables daily (citrus, amla, moringa, papaya, greens)</Text>
              <Text style={styles.preventionTip}>• Use turmeric, ginger, and garlic in your diet</Text>
              <Text style={styles.preventionTip}>• Get at least 7–8 hours of sleep per night</Text>
              <Text style={styles.preventionTip}>• Exercise lightly (even stretching) daily</Text>
              <Text style={styles.preventionTip}>• Manage stress with relaxation and mindfulness</Text>
              <Text style={styles.preventionTip}>• Stay hydrated—drink plenty of water and herbal teas</Text>
              <Text style={styles.preventionTip}>• Try an amla-moringa shot in the morning for vitamin C boost</Text>
            </View>
          </View>
        </View>
      </>
    );
  };
  
  const renderSymptomsGuideSection = () => {
    return (
      <>
        <View style={styles.sectionHeader}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => setActiveSection(ToolkitSection.MAIN)}
          >
            <Text style={styles.backButtonText}>{i18n.t('common.back')}</Text>
          </TouchableOpacity>
          <Text style={styles.sectionHeaderTitle}>{i18n.t('health.symptomsGuide')}</Text>
        </View>
        <View style={styles.firstAidCard}>
          <Text style={styles.firstAidTitle}>Common Symptoms & Possible Causes</Text>
          <View style={styles.stepsList}>
            <Text style={styles.stepText}><Text style={{fontWeight:'bold'}}>Fever:</Text> Infection (viral, bacterial), heat exhaustion, inflammatory conditions</Text>
            <Text style={styles.stepText}><Text style={{fontWeight:'bold'}}>Cough:</Text> Common cold, flu, bronchitis, asthma, allergies</Text>
            <Text style={styles.stepText}><Text style={{fontWeight:'bold'}}>Headache:</Text> Tension, migraine, dehydration, sinusitis, stress</Text>
            <Text style={styles.stepText}><Text style={{fontWeight:'bold'}}>Abdominal Pain:</Text> Indigestion, infection, food poisoning, gastritis</Text>
            <Text style={styles.stepText}><Text style={{fontWeight:'bold'}}>Vomiting/Diarrhea:</Text> Gastroenteritis, food poisoning, viral infection</Text>
            <Text style={styles.stepText}><Text style={{fontWeight:'bold'}}>Rash:</Text> Allergies, infections, skin irritation</Text>
            <Text style={styles.stepText}><Text style={{fontWeight:'bold'}}>Shortness of Breath:</Text> Asthma, respiratory infection, anxiety</Text>
            <Text style={styles.stepText}><Text style={{fontWeight:'bold'}}>Fatigue:</Text> Anemia, thyroid issues, lack of sleep, chronic illness</Text>
          </View>
          <Text style={{marginTop:16, fontSize:12, color:'#888'}}>Note: This guide is for informational purposes only. For persistent or severe symptoms, consult a healthcare professional.</Text>
        </View>
        
        <View style={styles.firstAidCard}>
          <Text style={styles.firstAidTitle}>Common Health Symptoms and What They Could Indicate</Text>
          <View style={styles.stepsList}>
            <Text style={styles.stepText}><Text style={{fontWeight:'bold'}}>Fever + Chills:</Text> Viral infection, Dengue, Malaria. <Text style={{fontStyle:'italic'}}>Monitor temperature, stay hydrated. If fever &gt;2 days, see a doctor.</Text></Text>
            <Text style={styles.stepText}><Text style={{fontWeight:'bold'}}>Severe Headache + Nausea:</Text> Migraine, Heatstroke, Dengue. <Text style={{fontStyle:'italic'}}>Rest in a quiet place. Seek medical advice if persistent.</Text></Text>
            <Text style={styles.stepText}><Text style={{fontWeight:'bold'}}>Cough + Difficulty Breathing:</Text> COVID-19, Asthma, Pollution. <Text style={{fontStyle:'italic'}}>Use a mask, stay indoors, consult a doctor if severe.</Text></Text>
            <Text style={styles.stepText}><Text style={{fontWeight:'bold'}}>Rashes + Itching:</Text> Allergy, Dengue, Fungal infection. <Text style={{fontStyle:'italic'}}>Avoid scratching. Use soothing creams. See a doctor if spreading.</Text></Text>
            <Text style={styles.stepText}><Text style={{fontWeight:'bold'}}>Stomach Pain + Vomiting:</Text> Food poisoning, Gastroenteritis. <Text style={{fontStyle:'italic'}}>Drink ORS. Avoid solid foods initially. If pain is intense, visit hospital.</Text></Text>
            <Text style={styles.stepText}><Text style={{fontWeight:'bold'}}>Joint Pain + Fatigue:</Text> Chikungunya, Viral Infection. <Text style={{fontStyle:'italic'}}>Rest, stay hydrated. Seek doctor if pain worsens.</Text></Text>
          </View>
          <Text style={{marginTop:16, fontSize:12, color:'#888'}}>This is general information. Please consult a health professional for accurate diagnosis.</Text>
        </View>
      </>
    );
  };

  const renderHealthEducationSection = () => {
    return (
      <>
        <View style={styles.sectionHeader}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => setActiveSection(ToolkitSection.MAIN)}
          >
            <Text style={styles.backButtonText}>{i18n.t('common.back')}</Text>
          </TouchableOpacity>
          <Text style={styles.sectionHeaderTitle}>{i18n.t('health.healthEducation')}</Text>
        </View>
        <View style={styles.firstAidCard}>
          <Text style={styles.firstAidTitle}>General Health Tips</Text>
          <View style={styles.stepsList}>
            <Text style={styles.stepText}>• Wash your hands regularly with soap and water.</Text>
            <Text style={styles.stepText}>• Eat a balanced diet rich in fruits and vegetables.</Text>
            <Text style={styles.stepText}>• Stay physically active—aim for at least 30 minutes most days.</Text>
            <Text style={styles.stepText}>• Get enough sleep (7-8 hours for adults).</Text>
            <Text style={styles.stepText}>• Stay hydrated by drinking plenty of water.</Text>
            <Text style={styles.stepText}>• Avoid smoking and limit alcohol consumption.</Text>
            <Text style={styles.stepText}>• Manage stress through relaxation and mindfulness.</Text>
            <Text style={styles.stepText}>• Keep up with vaccinations and regular health checkups.</Text>
            <Text style={styles.stepText}>• Practice safe food handling and hygiene to prevent foodborne illnesses.</Text>
            <Text style={styles.stepText}>• Use mosquito nets and repellents to prevent vector-borne diseases.</Text>
            <Text style={styles.stepText}>• Wear a mask and maintain social distancing during outbreaks of infectious diseases.</Text>
            <Text style={styles.stepText}>• Protect your skin from excessive sun exposure by using sunscreen and wearing protective clothing.</Text>
            <Text style={styles.stepText}>• Take regular breaks from screens to reduce eye strain.</Text>
            <Text style={styles.stepText}>• Maintain good oral hygiene by brushing and flossing daily.</Text>
            <Text style={styles.stepText}>• Seek mental health support if you feel anxious, depressed, or overwhelmed.</Text>
          </View>
        </View>
        <View style={styles.firstAidCard}>
          <Text style={styles.firstAidTitle}>Official Government Health Resources</Text>
          <View style={styles.stepsList}>
            <Text style={styles.stepText}>
              • <Text style={{color: '#007AFF'}} onPress={() => Linking.openURL('https://www.nhp.gov.in/')}>National Health Portal of India (NHP)</Text>
            </Text>
            <Text style={styles.stepText}>
              • <Text style={{color: '#007AFF'}} onPress={() => Linking.openURL('https://www.mohfw.gov.in/')}>Ministry of Health & Family Welfare (MoHFW)</Text>
            </Text>
            <Text style={styles.stepText}>
              • <Text style={{color: '#007AFF'}} onPress={() => Linking.openURL('https://www.cdc.gov/')}>Centers for Disease Control and Prevention (CDC)</Text>
            </Text>
            <Text style={styles.stepText}>
              • <Text style={{color: '#007AFF'}} onPress={() => Linking.openURL('https://www.who.int/')}>World Health Organization (WHO)</Text>
            </Text>
            <Text style={styles.stepText}>
              • <Text style={{color: '#007AFF'}} onPress={() => Linking.openURL('https://www.aiims.edu/')}>All India Institute of Medical Sciences (AIIMS)</Text>
            </Text>
            <Text style={styles.stepText}>
              • <Text style={{color: '#007AFF'}} onPress={() => Linking.openURL('https://www.icmr.gov.in/')}>Indian Council of Medical Research (ICMR)</Text>
            </Text>
          </View>
        </View>
      </>
    );
  };
  
  const renderContent = () => {
    switch (activeSection) {
      case ToolkitSection.FIRST_AID:
        return renderFirstAidSection();
      case ToolkitSection.EMERGENCY_CONTACTS:
        return renderEmergencyContactsSection();
      case ToolkitSection.PREVENTION:
        return renderPreventionSection();
      case ToolkitSection.SYMPTOMS_GUIDE:
        return renderSymptomsGuideSection();
      case ToolkitSection.HEALTH_EDUCATION:
        return renderHealthEducationSection();
      default:
        return renderMainSection();
    }
  };
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {renderContent()}
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
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 24,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  categoryCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryIcon: {
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  festivalAlertsContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  festivalCard: {
    width: 250,
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  festivalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  festivalAlert: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    marginRight: 12,
  },
  backButtonText: {
    fontSize: 16,
    color: '#80A1D4',
    fontWeight: '600',
  },
  sectionHeaderTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  firstAidCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  firstAidTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  firstAidImage: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginBottom: 16,
  },
  stepsList: {
    marginTop: 8,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom:
    12,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#80A1D4',
    color: 'white',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '600',
    fontSize: 14,
    marginRight: 12,
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(128, 161, 212, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contactDetails: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  contactNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF3B30',
  },
  preventionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  preventionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  preventionContent: {
    flexDirection: 'row',
  },
  preventionImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginRight: 16,
  },
  preventionTipsList: {
    flex: 1,
    justifyContent: 'center',
  },
  preventionTip: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default HealthToolkit;