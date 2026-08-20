import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { Phone, Eye, Volume2, VolumeX } from 'lucide-react';

export const TopUtilityBar: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const { fontSize, setFontSize, highContrast, toggleHighContrast, isSpeaking, stopSpeaking } = useAccessibility();

  return (
    <div className="bg-[#07253B] text-slate-200 text-xs py-1 px-4 sm:px-8 border-b border-slate-700 select-none">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: Accessibility skip & helpline */}
        <div className="flex items-center space-x-4">
          <a
            href="#main-content"
            className="hover:text-gov-saffron focus:underline font-medium transition-colors"
          >
            {t('skipToContent')}
          </a>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <div className="hidden sm:flex items-center space-x-2 text-emerald-400 font-semibold">
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>Toll-Free 24x7: <strong className="text-white">108</strong> (Ambulance) / <strong className="text-white">104</strong> (Aarogya)</span>
          </div>
        </div>

        {/* Right: Text Size Controls, Contrast, Audio & Language */}
        <div className="flex items-center space-x-3 ml-auto">
          {/* TTS Audio Indicator */}
          {isSpeaking && (
            <button
              onClick={stopSpeaking}
              className="flex items-center space-x-1 text-gov-saffron animate-pulse font-medium bg-amber-950/60 px-2 py-0.5 rounded border border-amber-600/40 text-xs"
              title="Stop audio reading"
            >
              <VolumeX className="w-3 h-3" />
              <span>{language === 'hi' ? 'ऑडियो रोकें' : 'Stop Audio'}</span>
            </button>
          )}

          {/* Text Size (A- A A+) */}
          <div className="flex items-center bg-slate-800/80 rounded border border-slate-700 px-1 py-0.5 space-x-1">
            <span className="text-[11px] text-slate-400 mr-1 hidden sm:inline">A11y:</span>
            <button
              onClick={() => setFontSize('normal')}
              className={`px-1.5 py-0.2 rounded font-bold transition-colors ${fontSize === 'normal' ? 'bg-gov-saffron text-slate-900' : 'hover:bg-slate-700 text-slate-300'}`}
              title="Standard Font Size"
            >
              A-
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-1.5 py-0.2 rounded font-bold transition-colors ${fontSize === 'large' ? 'bg-gov-saffron text-slate-900' : 'hover:bg-slate-700 text-slate-300'}`}
              title="Large Font Size"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('larger')}
              className={`px-1.5 py-0.2 rounded font-bold transition-colors ${fontSize === 'larger' ? 'bg-gov-saffron text-slate-900' : 'hover:bg-slate-700 text-slate-300'}`}
              title="Extra Large Font Size"
            >
              A+
            </button>
          </div>

          {/* High Contrast Toggle */}
          <button
            onClick={toggleHighContrast}
            className={`flex items-center space-x-1 px-2 py-0.5 rounded border text-xs transition-colors ${
              highContrast
                ? 'bg-amber-400 text-black border-amber-300 font-bold'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
            title="Toggle High Contrast Mode"
          >
            <Eye className="w-3 h-3" />
            <span className="hidden sm:inline">{t('highContrast')}</span>
          </button>

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="bg-gov-navyLight hover:bg-gov-navy text-white font-bold px-2.5 py-0.5 rounded border border-cyan-600/50 text-xs shadow-sm flex items-center space-x-1 transition-all"
          >
            <span>{language === 'hi' ? 'English' : 'हिंदी'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
