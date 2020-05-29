import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import all locales
import es from './es.json';

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {
            es: {
                translation: es
            }
        },
        lng: 'es',
        fallbackLng: 'es',
        debug: true,

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        }
    });

export default function (name, params = {}) {
    return i18n.t(name, params);
}
