import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';
import type { TranslationDict } from '../data/translations';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: keyof typeof translations | string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('swasthyamitra_lang');
    return (saved === 'hi' || saved === 'en') ? saved : 'hi'; // Default Hindi for rural frontline context
  });

  useEffect(() => {
    localStorage.setItem('swasthyamitra_lang', language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState(prev => (prev === 'hi' ? 'en' : 'hi'));
  };

  const t = (key: string, fallback?: string): string => {
    const dict = translations as TranslationDict;
    if (dict[key]) {
      return dict[key][language] || dict[key].en || fallback || key;
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
