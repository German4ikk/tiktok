
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { LanguageCode, LocalizedContent }  from '../types';

// Interface for the context
interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  translations: LocalizedContent;
  isLoadingTranslations: boolean;
}

// Fallback translations to use while loading or if a fetch fails
const fallbackTranslations: LocalizedContent = {
  headerTitle: "Loading...",
  headerSubtitle: "Please wait",
  buttonWebsite: "Website",
  buttonTelegram: "Telegram",
  buttonYouTube: "YouTube",
  buttonInstagram: "Instagram",
  buttonDonate: "Support",
  buttonConsultation: "Consultation",
  aboutMeTitle: "About Me",
  aboutMeText: "Loading content...",
  footerMadeBy: "Made by Digital Expert",
  languageSwitcherTooltip: "Change Language",
  chatWithExpert: "Chat with Expert",
  chatPlaceholder: "Type message...",
  chatSend: "Send",
  chatSimulateReply: "Simulate Reply",
  chatClose: "Close",
  expertTyping: "Expert is typing...",
  chatTelegramSimulationHint: "Expert typically replies via Telegram. (Simulation)",
  chatErrorReply: "Sorry, could not generate a response.",
  chatRateLimitError: "Service busy. Please try later.",
  expertTipTitle: "💡 Expert Tip",
  expertTipButton: "Get Another Tip",
  expertTipLoading: "Fetching tip...",
  expertTipError: "Could not fetch tip.",
  expertTipRateLimitError: "Tips temporarily unavailable. Try later."
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    // Detect browser language or default to English
    const browserLang = navigator.language.split('-')[0];
    if (Object.values(LanguageCode).includes(browserLang as LanguageCode)) {
      return browserLang as LanguageCode;
    }
    return LanguageCode.EN;
  });

  const [translations, setTranslations] = useState<LocalizedContent>(fallbackTranslations);
  const [isLoadingTranslations, setIsLoadingTranslations] = useState<boolean>(true);

  const setLanguage = useCallback((lang: LanguageCode) => {
    setLanguageState(lang);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language; // Set lang attribute on HTML element

    const fetchTranslations = async (langToFetch: LanguageCode) => {
      setIsLoadingTranslations(true);
      const jsonFileName = `${langToFetch}.json`;
      // Path relative to index.html (e.g., "locales/en.json")
      const relativePath = `locales/${jsonFileName}`;

      try {
        const response = await fetch(relativePath);
        if (!response.ok) {
          throw new Error(`Failed to fetch translations for ${langToFetch} (status: ${response.status}) from ${relativePath}`);
        }
        const data = await response.json();
        setTranslations(data as LocalizedContent);
      } catch (error) {
        console.error(error);
        // If the selected language fails, try falling back to English
        if (langToFetch !== LanguageCode.EN) {
          try {
            const enJsonFileName = `${LanguageCode.EN}.json`;
            const enRelativePath = `locales/${enJsonFileName}`;
            const enResponse = await fetch(enRelativePath);
            if (enResponse.ok) {
              const enData = await enResponse.json();
              setTranslations(enData as LocalizedContent);
            } else {
              // If English also fails, keep the initial fallbackTranslations
              console.error(`Failed to fetch fallback English translations (status: ${enResponse.status}) from ${enRelativePath}`);
              setTranslations(fallbackTranslations);
            }
          } catch (enError) {
            console.error("Failed to fetch fallback English translations:", enError);
            setTranslations(fallbackTranslations);
          }
        } else {
          // English itself failed to load
          setTranslations(fallbackTranslations);
        }
      } finally {
        setIsLoadingTranslations(false);
      }
    };

    fetchTranslations(language);
  }, [language]); // Re-fetch when language changes

  return React.createElement(
    LanguageContext.Provider,
    { value: { language, setLanguage, translations, isLoadingTranslations } },
    children
  );
};

export const useLocalization = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLocalization must be used within a LanguageProvider');
  }
  return context;
};