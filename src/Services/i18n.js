import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

// Tus recursos de traducción
const resources = {
  en: {
    translation: {
        "Servicios del Hotel": "Hotel Services",
    }
  },
  es: {
    translation: {     
           "Servicios del Hotel": "Servicios del Hotel",
    }
  },

};

console.log('Idioma local detectado:', Localization.locale);
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: Localization.locale,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
