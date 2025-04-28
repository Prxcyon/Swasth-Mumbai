export const en = {
  common: {
    appName: 'Swasth Mumbai',
    loading: 'Loading...',
    error: 'An error occurred',
    retry: 'Retry',
    save: 'Save',
    cancel: 'Cancel',
    confirm: 'Confirm',
    back: 'Back',
    next: 'Next',
    settings: 'Settings',
    home: 'Home',
    report: 'Report',
    map: 'Map',
    health: 'Health',
    unknown: 'Unknown',
    yes: 'Yes',
    no: 'No',
    ok: 'OK',
    success: 'Report submitted successfully',
    approve: 'Report approved successfully',
    deny: 'Report denied successfully'
  },
  dashboard: {
    title: 'Dashboard',
    weather: 'Weather',
    aqi: 'Air Quality',
    temperature: 'Temperature',
    humidity: 'Humidity',
    wind: 'Wind',
    feelsLike: 'Feels Like',
    airQualityIndex: 'Air Quality Index',
    refreshing: 'Refreshing...',
    lastUpdated: 'Last updated',
    alerts: 'Health Alerts',
    noAlerts: 'No active alerts',
    viewAllAlerts: 'View All',
    pm25: 'PM2.5',
    pm10: 'PM10',
    no2: 'NO₂',
    so2: 'SO₂',
    o3: 'O₃',
    co: 'CO',
    pressure: 'Pressure',
    locationError: 'Location Access Required',
    locationErrorMessage: 'Please enable location access to view weather and air quality data for your area.',
    location: 'Location'
  },
  aqi: {
    good: 'Good',
    fair: 'Fair',
    moderate: 'Moderate',
    poor: 'Poor',
    veryPoor: 'Very Poor',
    unknown: 'Unknown',
    advice: {
      good: 'Air quality is satisfactory, and air pollution poses little or no risk.',
      fair: 'Air quality is acceptable. However, there may be a risk for some people.',
      moderate: 'Members of sensitive groups may experience health effects.',
      poor: 'Everyone may begin to experience health effects.',
      veryPoor: 'Health warnings of emergency conditions. Everyone is likely to be affected.',
      unknown: 'No data available.'
    }
  },
  map: {
    title: 'Health Map',
    diseaseOutbreaks: 'Disease Outbreaks',
    hospitalLocations: 'Hospitals',
    safeAreas: 'Safe Areas',
    searchPlaceholder: 'Search locations...',
    your_location: 'Your Location',
    legend: 'Map Legend',
    confirmed: 'Confirmed',
    suspected: 'Suspected',
    rejected: 'Rejected',
    hospital: 'Hospital',
    clinic: 'Clinic',
    pharmacy: 'Pharmacy',
    noReportsNearby: 'No health reports nearby'
  },
  report: {
    title: 'Report Outbreak',
    diseaseType: 'Disease Type',
    symptoms: 'Symptoms',
    location: 'Location',
    details: 'Additional Details',
    useCurrentLocation: 'Use Current Location',
    enterLocation: 'Enter Location',
    submitReport: 'Submit Report',
    reportSuccess: 'Report submitted successfully',
    reportError: 'Error submitting report',
    confirmationTitle: 'Confirm Report',
    confirmationMessage: 'Are you sure you want to submit this report?',
    symptomsPlaceholder: 'Enter symptoms separated by commas',
    detailsPlaceholder: 'Enter any additional details that might help others',
    commonDiseases: {
      dengue: 'Dengue',
      malaria: 'Malaria',
      typhoid: 'Typhoid',
      cholera: 'Cholera',
      covid19: 'COVID-19',
      gastroenteritis: 'Gastroenteritis',
      influenza: 'Influenza',
      other: 'Other'
    }
  },
  reportCard: {
    reportedOn: 'Reported on',
    confirmations: 'Confirmations',
    denials: 'Denials',
    legitimacy: 'Legitimacy',
    vote: 'Vote',
    confirm: 'Confirm',
    deny: 'Deny',
    alreadyVoted: 'You already voted',
    status: 'Status',
    statusValues: {
      pending: 'Pending',
      confirmed: 'Confirmed',
      rejected: 'Rejected'
    }
  },
  health: {
    title: 'Health Toolkit',
    firstAid: 'First Aid',
    emergencyContacts: 'Emergency Contacts',
    symptomsGuide: 'Symptoms Guide',
    preventionTips: 'Prevention Tips',
    healthEducation: 'Health Education',
    firstAidEmergencies: {
      burns: 'Burns',
      choking: 'Choking',
      drowning: 'Drowning',
      fractures: 'Fractures',
      heatStroke: 'Heat Stroke',
      heartAttack: 'Heart Attack',
      poisoning: 'Poisoning',
      snakeBite: 'Snake Bite'
    },
    emergencyNumbers: {
      ambulance: 'Ambulance',
      police: 'Police',
      fire: 'Fire',
      disaster: 'Disaster Management',
      women: 'Women Helpline',
      child: 'Child Helpline'
    }
  },
  settings: {
    title: 'Settings',
    language: 'Language',
    notifications: 'Notifications',
    locationTracking: 'Location Tracking',
    alertThresholds: 'Alert Thresholds',
    about: 'About',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    logout: 'Logout',
    languages: {
      english: 'English',
      hindi: 'Hindi',
      marathi: 'Marathi'
    },
    alertSettings: {
      aqi: 'AQI Alert Threshold',
      highTemp: 'High Temperature Alert',
      lowTemp: 'Low Temperature Alert',
      humidity: 'Humidity Alert',
      wind: 'Wind Speed Alert'
    }
  },
  alerts: {
    weatherAlert: 'Weather Alert',
    aqiAlert: 'Air Quality Alert',
    diseaseAlert: 'Disease Outbreak Alert',
    festivalAlert: 'Festival Health Alert',
    viewDetails: 'View Details',
    dismiss: 'Dismiss',
    highTemp: 'High Temperature',
    lowTemp: 'Low Temperature',
    highHumidity: 'High Humidity',
    strongWind: 'Strong Wind'
  },
  festivals: {
    diwali: 'Diwali',
    holi: 'Holi',
    ganeshChaturthi: 'Ganesh Chaturthi',
    navratri: 'Navratri',
    alerts: {
      diwali: 'Be cautious of air pollution from firecrackers. Wear masks and keep windows closed.',
      holi: 'Use natural colors to avoid skin irritation and allergies. Stay hydrated.',
      ganeshChaturthi: 'Be careful in crowded areas. Maintain hygiene when consuming prasad.',
      navratri: 'Stay hydrated during fasting. Be cautious in crowded pandals.'
    }
  }
};