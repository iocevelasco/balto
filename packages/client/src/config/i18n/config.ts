import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/eng/translation.json';
import translationES from './locales/es/translation.json';

// The translations
const resources = {
  en: {
    translation: translationEN
  },
  es: {
    translation: translationES
  },
};

i18n
  .use(initReactI18next) 
  .init({
    resources,
    lng: 'es', // Default language
    fallbackLng: 'en', // Fallback language
    interpolation: {
      escapeValue: false, // React already does escaping
    }
  });

export default i18n;
