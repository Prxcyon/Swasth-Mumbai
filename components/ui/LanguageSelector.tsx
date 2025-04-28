import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LanguageContext } from '@/i18n';

type Language = 'en' | 'hi' | 'mr';

interface LanguageSelectorProps {
  onChange?: (language: Language) => void;
  containerStyle?: object;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  onChange,
  containerStyle
}) => {
  const { language, setLanguage } = React.useContext(LanguageContext);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    if (onChange) {
      onChange(lang);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={[
          styles.languageButton,
          language === 'en' && styles.selectedLanguage,
        ]}
        onPress={() => handleLanguageChange('en')}
      >
        <Text
          style={[
            styles.languageText,
            language === 'en' && styles.selectedLanguageText,
          ]}
        >
          EN
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.languageButton,
          language === 'hi' && styles.selectedLanguage,
        ]}
        onPress={() => handleLanguageChange('hi')}
      >
        <Text
          style={[
            styles.languageText,
            language === 'hi' && styles.selectedLanguageText,
          ]}
        >
          हि
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.languageButton,
          language === 'mr' && styles.selectedLanguage,
        ]}
        onPress={() => handleLanguageChange('mr')}
      >
        <Text
          style={[
            styles.languageText,
            language === 'mr' && styles.selectedLanguageText,
          ]}
        >
          म
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#DED9E2',
    backgroundColor: 'rgba(247, 244, 234, 0.3)',
  },
  languageButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedLanguage: {
    backgroundColor: '#80A1D4',
  },
  languageText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  selectedLanguageText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default LanguageSelector;