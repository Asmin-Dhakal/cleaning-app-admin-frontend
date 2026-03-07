import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en";
import es from "./locales/es";

export const SUPPORTED_LANGUAGES = [
    { code: "en", label: "English" },
    { code: "es", label: "Español" },
    // Add new languages here: { code: "fr", label: "Français" }
] as const;

export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number]["code"];

const resources = {
    en: { translation: en },
    es: { translation: es },
};

// Extend react-i18next types for full TypeScript autocompletion on t() keys
declare module "i18next" {
    interface CustomTypeOptions {
        defaultNS: "translation";
        resources: (typeof resources)["en"];
    }
}

i18n
    .use(LanguageDetector) // Detects browser language; saves/restores choice from localStorage
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "en",
        supportedLngs: SUPPORTED_LANGUAGES.map((l) => l.code),
        interpolation: {
            escapeValue: false, // React already escapes values
        },
        detection: {
            order: ["localStorage", "navigator"],
            lookupLocalStorage: "cleanflow_language",
            caches: ["localStorage"],
        },
    });

export default i18n;
