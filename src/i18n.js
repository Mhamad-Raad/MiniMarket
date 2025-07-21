import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector'; // Detect language
// Import translation files
import en from './locales/en.json';
import ar from './locales/ar.json';
import ku from './locales/ku.json';

i18n
  .use(LanguageDetector) // Detect the user's language automatically
  .use(initReactI18next) // Initialize i18next for React
  .init({
    fallbackLng: 'en', // Default language
    debug: true,
    resources: {
      en: {
        translation: en, // English translation
      },
      ar: {
        translation: ar, // Arabic translation
      },
      ku: {
        translation: ku, // Kurdish translation
      },
    },
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
