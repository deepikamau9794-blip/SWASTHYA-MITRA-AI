import React from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useLanguage } from '../../context/LanguageContext';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioReaderButtonProps {
  textToRead: string;
  label?: string;
  size?: 'sm' | 'md';
}

export const AudioReaderButton: React.FC<AudioReaderButtonProps> = ({
  textToRead,
  label,
  size = 'md',
}) => {
  const { isSpeaking, speakText, stopSpeaking } = useAccessibility();
  const { language } = useLanguage();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speakText(textToRead, language);
    }
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className={`inline-flex items-center space-x-1.5 rounded-lg border transition-all font-semibold select-none ${
        isSpeaking
          ? 'bg-amber-500 text-slate-950 border-amber-600 animate-pulse'
          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
      } ${size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1.5 text-xs'}`}
      title="Listen to this guidance via speech synthesis"
    >
      {isSpeaking ? (
        <>
          <VolumeX className="w-3.5 h-3.5 text-slate-950" />
          <span>{label || (language === 'hi' ? 'रोकें' : 'Stop Audio')}</span>
        </>
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5 text-gov-navy" />
          <span>{label || (language === 'hi' ? 'ऑडियो सुनें' : 'Listen')}</span>
        </>
      )}
    </button>
  );
};
