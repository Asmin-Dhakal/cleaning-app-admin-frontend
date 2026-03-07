import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES, type LanguageCode } from "../../../i18n/i18n";
import { useTheme } from "../../../app/providers/ThemeProvider";

interface LanguageSelectorProps {
  className?: string;
}

export const LanguageSelector = ({ className }: LanguageSelectorProps) => {
  const { i18n } = useTranslation();
  const { theme } = useTheme();

  const currentLang = i18n.language.split("-")[0] as LanguageCode;

  const handleChange = (code: LanguageCode) => {
    i18n.changeLanguage(code);
  };

  return (
    <div className={`flex items-center gap-1 ${className ?? ""}`}>
      {SUPPORTED_LANGUAGES.map((lang, index) => (
        <span key={lang.code} className="flex items-center">
          {index > 0 && (
            <span
              className="mx-1 text-xs select-none"
              style={{ color: theme.colors.border }}
            >
              |
            </span>
          )}
          <button
            type="button"
            onClick={() => handleChange(lang.code)}
            className="text-xs font-medium transition-opacity hover:opacity-100"
            style={{
              color:
                currentLang === lang.code
                  ? theme.colors.accent
                  : theme.colors.textMuted,
              opacity: currentLang === lang.code ? 1 : 0.6,
              fontWeight: currentLang === lang.code ? 700 : 400,
            }}
          >
            {lang.label}
          </button>
        </span>
      ))}
    </div>
  );
};
