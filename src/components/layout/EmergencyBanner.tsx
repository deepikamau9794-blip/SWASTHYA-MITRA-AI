import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { AlertTriangle, PhoneCall } from 'lucide-react';

export const EmergencyBanner: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="bg-red-700 text-white py-1.5 px-4 sm:px-8 text-xs font-semibold shadow-inner flex items-center justify-between border-b border-red-800">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
        <div className="flex items-center space-x-2.5 overflow-hidden">
          <div className="bg-white text-red-700 p-0.5 rounded-full flex-shrink-0 animate-pulse">
            <AlertTriangle className="w-3.5 h-3.5" />
          </div>
          <span className="truncate tracking-wide text-xs sm:text-sm">
            {t('emergencyMarquee')}
          </span>
        </div>
        <div className="flex items-center space-x-2 flex-shrink-0">
          <a
            href="tel:108"
            className="inline-flex items-center space-x-1 bg-white text-red-800 hover:bg-red-50 px-2.5 py-0.5 rounded-full text-xs font-bold shadow-sm transition-all transform hover:scale-105"
          >
            <PhoneCall className="w-3 h-3 text-red-600" />
            <span>{language === 'hi' ? '108 एम्बुलेंस' : '108 Ambulance'}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
