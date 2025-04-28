export const mr = {
  common: {
    appName: 'स्वस्थ मुंबई',
    loading: 'लोड होत आहे...',
    error: 'एक त्रुटी आली',
    retry: 'पुन्हा प्रयत्न करा',
    save: 'जतन करा',
    cancel: 'रद्द करा',
    confirm: 'पुष्टी करा',
    back: 'मागे',
    next: 'पुढे',
    settings: 'सेटिंग्ज',
    home: 'होम',
    report: 'अहवाल',
    map: 'नकाशा',
    health: 'आरोग्य',
    unknown: 'अज्ञात',
    yes: 'होय',
    no: 'नाही',
    ok: 'ठीक आहे'
  },
  dashboard: {
    title: 'डॅशबोर्ड',
    weather: 'हवामान',
    aqi: 'हवेची गुणवत्ता',
    temperature: 'तापमान',
    humidity: 'आर्द्रता',
    wind: 'वारा',
    feelsLike: 'जाणवते',
    airQualityIndex: 'हवा गुणवत्ता निर्देशांक',
    refreshing: 'रिफ्रेश होत आहे...',
    lastUpdated: 'शेवटचे अद्यतन',
    alerts: 'आरोग्य सूचना',
    noAlerts: 'कोणत्याही सक्रिय सूचना नाहीत',
    viewAllAlerts: 'सर्व पहा',
    pm25: 'PM2.5',
    pm10: 'PM10',
    no2: 'NO₂',
    so2: 'SO₂',
    o3: 'O₃',
    co: 'CO',
    pressure: 'दाब',
    locationError: 'स्थान प्रवेश आवश्यक',
    locationErrorMessage: 'तुमच्या क्षेत्रासाठी हवामान आणि हवेची गुणवत्ता डेटा पाहण्यासाठी कृपया स्थान प्रवेश सक्षम करा.',
    location: 'स्थान'
  },
  aqi: {
    good: 'चांगले',
    fair: 'उचित',
    moderate: 'मध्यम',
    poor: 'वाईट',
    veryPoor: 'अतिशय वाईट',
    unknown: 'अज्ञात',
    advice: {
      good: 'हवेची गुणवत्ता समाधानकारक आहे, आणि हवा प्रदूषणामुळे कमी किंवा काही धोका नाही.',
      fair: 'हवेची गुणवत्ता स्वीकार्य आहे. तथापि, काही लोकांना धोका असू शकतो.',
      moderate: 'संवेदनशील गटातील सदस्यांना आरोग्य परिणाम अनुभवास येऊ शकतात.',
      poor: 'सर्वजण आरोग्य परिणाम अनुभवण्यास सुरुवात करू शकतात.',
      veryPoor: 'आपत्कालीन परिस्थितीच्या आरोग्य चेतावण्या. सर्व प्रभावित होण्याची शक्यता आहे.',
      unknown: 'कोणतीही माहिती उपलब्ध नाही.'
    }
  },
  map: {
    title: 'आरोग्य नकाशा',
    diseaseOutbreaks: 'रोग प्रकोप',
    hospitalLocations: 'रुग्णालये',
    safeAreas: 'सुरक्षित क्षेत्रे',
    searchPlaceholder: 'स्थाने शोधा...',
    your_location: 'तुमचे स्थान',
    legend: 'नकाशा किंवदंती',
    confirmed: 'पुष्टी',
    suspected: 'संशयित',
    rejected: 'नाकारलेले',
    hospital: 'रुग्णालय',
    clinic: 'दवाखाना',
    pharmacy: 'औषधालय',
    noReportsNearby: 'जवळपास कोणतेही आरोग्य अहवाल नाहीत'
  },
  report: {
    title: 'रोग प्रकोप अहवाल',
    diseaseType: 'रोगाचा प्रकार',
    symptoms: 'लक्षणे',
    location: 'स्थान',
    details: 'अतिरिक्त तपशील',
    useCurrentLocation: 'वर्तमान स्थान वापरा',
    enterLocation: 'स्थान प्रविष्ट करा',
    submitReport: 'अहवाल सादर करा',
    reportSuccess: 'अहवाल यशस्वीरित्या सादर केला',
    reportError: 'अहवाल सादर करताना त्रुटी',
    confirmationTitle: 'अहवाल पुष्टी करा',
    confirmationMessage: 'तुम्हाला खरेच हा अहवाल सादर करायचा आहे का?',
    symptomsPlaceholder: 'स्वल्पविरामाने वेगळी केलेली लक्षणे प्रविष्ट करा',
    detailsPlaceholder: 'कोणतेही अतिरिक्त तपशील प्रविष्ट करा जे इतरांना मदत करू शकतील',
    commonDiseases: {
      dengue: 'डेंग्यू',
      malaria: 'मलेरिया',
      typhoid: 'टायफॉइड',
      cholera: 'कॉलरा',
      covid19: 'कोविड-19',
      gastroenteritis: 'गॅस्ट्रोएंटेराइटिस',
      influenza: 'इन्फ्लुएंझा',
      other: 'इतर'
    }
  },
  reportCard: {
    reportedOn: 'अहवाल दिला',
    confirmations: 'पुष्टीकरणे',
    denials: 'नकार',
    legitimacy: 'वैधता',
    vote: 'मत',
    confirm: 'पुष्टी करा',
    deny: 'नाकारा',
    alreadyVoted: 'तुम्ही आधीच मतदान केले आहे',
    status: 'स्थिती',
    statusValues: {
      pending: 'प्रलंबित',
      confirmed: 'पुष्टी',
      rejected: 'नाकारलेले'
    }
  },
  health: {
    title: 'आरोग्य टूलकिट',
    firstAid: 'प्रथमोपचार',
    emergencyContacts: 'आपत्कालीन संपर्क',
    symptomsGuide: 'लक्षणे मार्गदर्शिका',
    preventionTips: 'प्रतिबंध टिप्स',
    healthEducation: 'आरोग्य शिक्षण',
    firstAidEmergencies: {
      burns: 'जळणे',
      choking: 'दम लागणे',
      drowning: 'बुडणे',
      fractures: 'फ्रॅक्चर',
      heatStroke: 'हीट स्ट्रोक',
      heartAttack: 'हृदय विकाराचा झटका',
      poisoning: 'विषबाधा',
      snakeBite: 'साप चावणे'
    },
    emergencyNumbers: {
      ambulance: 'रुग्णवाहिका',
      police: 'पोलीस',
      fire: 'अग्निशमन',
      disaster: 'आपत्ती व्यवस्थापन',
      women: 'महिला हेल्पलाइन',
      child: 'बाल हेल्पलाइन'
    }
  },
  settings: {
    title: 'सेटिंग्ज',
    language: 'भाषा',
    notifications: 'सूचना',
    locationTracking: 'स्थान ट्रॅकिंग',
    alertThresholds: 'सूचना थ्रेशोल्ड',
    about: 'बद्दल',
    privacy: 'गोपनीयता धोरण',
    terms: 'सेवा अटी',
    logout: 'लॉग आउट',
    languages: {
      english: 'इंग्रजी',
      hindi: 'हिंदी',
      marathi: 'मराठी'
    },
    alertSettings: {
      aqi: 'AQI सूचना थ्रेशोल्ड',
      highTemp: 'उच्च तापमान सूचना',
      lowTemp: 'कमी तापमान सूचना',
      humidity: 'आर्द्रता सूचना',
      wind: 'वारा वेग सूचना'
    }
  },
  alerts: {
    weatherAlert: 'हवामान सूचना',
    aqiAlert: 'हवा गुणवत्ता सूचना',
    diseaseAlert: 'रोग प्रकोप सूचना',
    festivalAlert: 'सण आरोग्य सूचना',
    viewDetails: 'तपशील पहा',
    dismiss: 'डिसमिस करा',
    highTemp: 'उच्च तापमान',
    lowTemp: 'कमी तापमान',
    highHumidity: 'उच्च आर्द्रता',
    strongWind: 'जोरदार वारा'
  },
  festivals: {
    diwali: 'दिवाळी',
    holi: 'होळी',
    ganeshChaturthi: 'गणेश चतुर्थी',
    navratri: 'नवरात्री',
    alerts: {
      diwali: 'फटाक्यांमुळे होणाऱ्या वायु प्रदूषणाबद्दल सावध रहा. मास्क घाला आणि खिडक्या बंद ठेवा.',
      holi: 'त्वचा जळजळ आणि अलर्जी टाळण्यासाठी नैसर्गिक रंग वापरा. हायड्रेटेड रहा.',
      ganeshChaturthi: 'गर्दीच्या क्षेत्रात सावध रहा. प्रसाद सेवन करताना स्वच्छता राखा.',
      navratri: 'उपवासादरम्यान हायड्रेटेड रहा. गर्दीच्या पंडालात सावध रहा.'
    }
  }
};