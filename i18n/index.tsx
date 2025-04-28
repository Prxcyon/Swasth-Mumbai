import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import React from 'react';
import { en } from './translations/en';
import { hi } from './translations/hi';
import { mr } from './translations/mr';

// Set up i18n
const i18n = new I18n({
  en,
  hi,
  mr
});

// Set the locale once at the beginning of your app
i18n.locale = Localization.locale;

// When a value is missing from a translation, fallback to the same key from the default language
i18n.enableFallback = true;
i18n.defaultLocale = 'en';

export default i18n;

// Helper function to change the language
export const setLanguage = (language: 'en' | 'hi' | 'mr') => {
  i18n.locale = language;
};

// --- Language Context ---
type Language = 'en' | 'hi' | 'mr';
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const LanguageContext = React.createContext<LanguageContextType>({
  language: (i18n.locale.substring(0, 2) as Language) || 'en',
  setLanguage: () => {},
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = React.useState<Language>((i18n.locale.substring(0, 2) as Language) || 'en');

  const handleSetLanguage = (lang: Language) => {
    setLanguageState(lang);
    i18n.locale = lang;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};