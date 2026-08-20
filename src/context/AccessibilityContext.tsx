import React, { createContext, useContext, useState, useEffect } from 'react';

type FontSize = 'normal' | 'large' | 'larger';

interface AccessibilityContextType {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
  highContrast: boolean;
  toggleHighContrast: () => void;
  isSpeaking: boolean;
  speakText: (text: string, lang?: 'hi' | 'en') => void;
  stopSpeaking: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontSize, setFontSizeState] = useState<FontSize>(() => {
    return (localStorage.getItem('bharatgen_font_size') as FontSize) || 'normal';
  });

  const [highContrast, setHighContrastState] = useState<boolean>(() => {
    return localStorage.getItem('bharatgen_contrast') === 'true';
  });

  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('bharatgen_font_size', fontSize);
    const root = document.documentElement;
    root.classList.remove('font-scale-normal', 'font-scale-large', 'font-scale-larger');
    root.classList.add(`font-scale-${fontSize}`);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('bharatgen_contrast', String(highContrast));
    const root = document.documentElement;
    if (highContrast) {
      root.classList.add('high-contrast-mode');
    } else {
      root.classList.remove('high-contrast-mode');
    }
  }, [highContrast]);

  const setFontSize = (size: FontSize) => setFontSizeState(size);
  const increaseFontSize = () => {
    if (fontSize === 'normal') setFontSizeState('large');
    else if (fontSize === 'large') setFontSizeState('larger');
  };
  const decreaseFontSize = () => {
    if (fontSize === 'larger') setFontSizeState('large');
    else if (fontSize === 'large') setFontSizeState('normal');
  };
  const resetFontSize = () => setFontSizeState('normal');

  const toggleHighContrast = () => setHighContrastState(prev => !prev);

  const speakText = (text: string, lang: 'hi' | 'en' = 'hi') => {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported on this browser');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.9; // Slightly slower for clear rural comprehension
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        setFontSize,
        increaseFontSize,
        decreaseFontSize,
        resetFontSize,
        highContrast,
        toggleHighContrast,
        isSpeaking,
        speakText,
        stopSpeaking
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
