export const hi = {
  common: {
    appName: 'स्वस्थ मुंबई',
    loading: 'लोड हो रहा है...',
    error: 'एक त्रुटि हुई',
    retry: 'पुनः प्रयास करें',
    save: 'सहेजें',
    cancel: 'रद्द करें',
    confirm: 'पुष्टि करें',
    back: 'वापस',
    next: 'अगला',
    settings: 'सेटिंग्स',
    home: 'होम',
    report: 'रिपोर्ट',
    map: 'नक्शा',
    health: 'स्वास्थ्य',
    unknown: 'अज्ञात',
    yes: 'हां',
    no: 'नहीं',
    ok: 'ठीक है'
  },
  dashboard: {
    title: 'डैशबोर्ड',
    weather: 'मौसम',
    aqi: 'वायु गुणवत्ता',
    temperature: 'तापमान',
    humidity: 'आर्द्रता',
    wind: 'हवा',
    feelsLike: 'महसूस होता है',
    airQualityIndex: 'वायु गुणवत्ता सूचकांक',
    refreshing: 'रिफ्रेश हो रहा है...',
    lastUpdated: 'अंतिम अपडेट',
    alerts: 'स्वास्थ्य अलर्ट',
    noAlerts: 'कोई सक्रिय अलर्ट नहीं',
    viewAllAlerts: 'सभी देखें',
    pm25: 'PM2.5',
    pm10: 'PM10',
    no2: 'NO₂',
    so2: 'SO₂',
    o3: 'O₃',
    co: 'CO',
    pressure: 'दबाव',
    locationError: 'स्थान पहुंच आवश्यक',
    locationErrorMessage: 'अपने क्षेत्र के मौसम और वायु गुणवत्ता डेटा देखने के लिए कृपया स्थान पहुंच सक्षम करें।',
    location: 'स्थान'
  },
  aqi: {
    good: 'अच्छा',
    fair: 'उचित',
    moderate: 'मध्यम',
    poor: 'खराब',
    veryPoor: 'बहुत खराब',
    unknown: 'अज्ञात',
    advice: {
      good: 'वायु गुणवत्ता संतोषजनक है, और वायु प्रदूषण कम या कोई जोखिम नहीं है।',
      fair: 'वायु गुणवत्ता स्वीकार्य है। हालांकि, कुछ लोगों के लिए जोखिम हो सकता है।',
      moderate: 'संवेदनशील समूहों के सदस्य स्वास्थ्य प्रभावों का अनुभव कर सकते हैं।',
      poor: 'सभी लोग स्वास्थ्य प्रभावों का अनुभव करना शुरू कर सकते हैं।',
      veryPoor: 'आपातकालीन स्थितियों की स्वास्थ्य चेतावनी। सभी लोग प्रभावित होने की संभावना है।',
      unknown: 'कोई डेटा उपलब्ध नहीं है।'
    }
  },
  map: {
    title: 'स्वास्थ्य नक्शा',
    diseaseOutbreaks: 'रोग प्रकोप',
    hospitalLocations: 'अस्पताल',
    safeAreas: 'सुरक्षित क्षेत्र',
    searchPlaceholder: 'स्थान खोजें...',
    your_location: 'आपका स्थान',
    legend: 'नक्शा प्रतीक',
    confirmed: 'पुष्टि',
    suspected: 'संदिग्ध',
    rejected: 'अस्वीकृत',
    hospital: 'अस्पताल',
    clinic: 'क्लिनिक',
    pharmacy: 'फार्मेसी',
    noReportsNearby: 'आस-पास कोई स्वास्थ्य रिपोर्ट नहीं'
  },
  report: {
    title: 'प्रकोप रिपोर्ट',
    diseaseType: 'रोग प्रकार',
    symptoms: 'लक्षण',
    location: 'स्थान',
    details: 'अतिरिक्त विवरण',
    useCurrentLocation: 'वर्तमान स्थान का उपयोग करें',
    enterLocation: 'स्थान दर्ज करें',
    submitReport: 'रिपोर्ट जमा करें',
    reportSuccess: 'रिपोर्ट सफलतापूर्वक जमा की गई',
    reportError: 'रिपोर्ट जमा करने में त्रुटि',
    confirmationTitle: 'रिपोर्ट की पुष्टि करें',
    confirmationMessage: 'क्या आप वाकई यह रिपोर्ट जमा करना चाहते हैं?',
    symptomsPlaceholder: 'अल्पविराम से अलग करके लक्षण दर्ज करें',
    detailsPlaceholder: 'कोई अतिरिक्त विवरण दर्ज करें जो दूसरों की मदद कर सकता है',
    commonDiseases: {
      dengue: 'डेंगू',
      malaria: 'मलेरिया',
      typhoid: 'टाइफाइड',
      cholera: 'हैजा',
      covid19: 'कोविड-19',
      gastroenteritis: 'गैस्ट्रोएंटेराइटिस',
      influenza: 'इन्फ्लूएंजा',
      other: 'अन्य'
    }
  },
  reportCard: {
    reportedOn: 'रिपोर्ट की गई',
    confirmations: 'पुष्टियां',
    denials: 'अस्वीकरण',
    legitimacy: 'वैधता',
    vote: 'वोट',
    confirm: 'पुष्टि करें',
    deny: 'अस्वीकार करें',
    alreadyVoted: 'आपने पहले ही वोट किया है',
    status: 'स्थिति',
    statusValues: {
      pending: 'लंबित',
      confirmed: 'पुष्टि',
      rejected: 'अस्वीकृत'
    }
  },
  health: {
    title: 'स्वास्थ्य टूलकिट',
    firstAid: 'प्राथमिक चिकित्सा',
    emergencyContacts: 'आपातकालीन संपर्क',
    symptomsGuide: 'लक्षण गाइड',
    preventionTips: 'रोकथाम टिप्स',
    healthEducation: 'स्वास्थ्य शिक्षा',
    firstAidEmergencies: {
      burns: 'जलना',
      choking: 'दम घुटना',
      drowning: 'डूबना',
      fractures: 'फ्रैक्चर',
      heatStroke: 'हीट स्ट्रोक',
      heartAttack: 'हृदय रोग',
      poisoning: 'विषाक्तता',
      snakeBite: 'सांप का काटना'
    },
    emergencyNumbers: {
      ambulance: 'एंबुलेंस',
      police: 'पुलिस',
      fire: 'अग्निशमन',
      disaster: 'आपदा प्रबंधन',
      women: 'महिला हेल्पलाइन',
      child: 'बाल हेल्पलाइन'
    }
  },
  settings: {
    title: 'सेटिंग्स',
    language: 'भाषा',
    notifications: 'सूचनाएं',
    locationTracking: 'स्थान ट्रैकिंग',
    alertThresholds: 'अलर्ट थ्रेशोल्ड',
    about: 'के बारे में',
    privacy: 'गोपनीयता नीति',
    terms: 'सेवा की शर्तें',
    logout: 'लॉग आउट',
    languages: {
      english: 'अंग्रे़ी',
      hindi: 'हिंदी',
      marathi: 'मराठी'
    },
    alertSettings: {
      aqi: 'AQI अलर्ट थ्रेशोल्ड',
      highTemp: 'उच्च तापमान अलर्ट',
      lowTemp: 'निम्न तापमान अलर्ट',
      humidity: 'आर्द्रता अलर्ट',
      wind: 'हवा की गति अलर्ट'
    }
  },
  alerts: {
    weatherAlert: 'मौसम अलर्ट',
    aqiAlert: 'वायु गुणवत्ता अलर्ट',
    diseaseAlert: 'रोग प्रकोप अलर्ट',
    festivalAlert: 'त्योहार स्वास्थ्य अलर्ट',
    viewDetails: 'विवरण देखें',
    dismiss: 'ख़ारिज करें',
    highTemp: 'उच्च तापमान',
    lowTemp: 'निम्न तापमान',
    highHumidity: 'उच्च आर्द्रता',
    strongWind: 'तेज़ हवा'
  },
  festivals: {
    diwali: 'दिवाली',
    holi: 'होली',
    ganeshChaturthi: 'गणेश चतुर्थी',
    navratri: 'नवरात्रि',
    alerts: {
      diwali: 'पटाखों से वायु प्रदूषण के प्रति सावधान रहें। मास्क पहनें और खिड़कियां बंद रखें।',
      holi: 'त्वचा में जलन और एलर्जी से बचने के लिए प्राकृतिक रंगों का उपयोग करें। हाइड्रेटेड रहें।',
      ganeshChaturthi: 'भीड़ वाले क्षेत्रों में सावधान रहें। प्रसाद का सेवन करते समय स्वच्छता बनाए रखें।',
      navratri: 'उपवास के दौरान हाइड्रेटेड रहें। भीड़ वाले पंडालों में सावधान रहें।'
    }
  }
};