import React from 'react';
import type { SupportiveCareAdvice } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { AudioReaderButton } from '../common/AudioReaderButton';
import {
  Droplets,
  Utensils,
  Moon,
  Ban,
  AlertOctagon,
  ShieldCheck,
  Printer,
  ChevronLeft
} from 'lucide-react';

interface SupportiveCareGuideProps {
  advice: SupportiveCareAdvice;
  onBack?: () => void;
}

export const SupportiveCareGuide: React.FC<SupportiveCareGuideProps> = ({ advice, onBack }) => {
  const { language, t } = useLanguage();

  const isHindi = language === 'hi';
  const generalList = isHindi && advice.generalHi?.length ? advice.generalHi : advice.general;
  const hydrationList = isHindi && advice.hydrationHi?.length ? advice.hydrationHi : advice.hydration;
  const dietList = isHindi && advice.dietHi?.length ? advice.dietHi : advice.diet;
  const activityList = isHindi && advice.activityHi?.length ? advice.activityHi : advice.activity;
  const avoidList = isHindi && advice.avoidHi?.length ? advice.avoidHi : advice.avoid;
  const warningList = isHindi && advice.warningSignsHi?.length ? advice.warningSignsHi : advice.warningSigns;

  const fullTextToRead = `
    ${language === 'hi' ? 'घरेलू सहायक देखभाल एवं सुरक्षा मार्गदर्शन' : 'Supportive Care and Home Safety Guidance'}.
    ${language === 'hi' ? 'जलपान सलाह' : 'Hydration'}: ${hydrationList.join('. ')}.
    ${language === 'hi' ? 'आहार सलाह' : 'Diet'}: ${dietList.join('. ')}.
    ${language === 'hi' ? 'सावधानियां' : 'Things to avoid'}: ${avoidList.join('. ')}.
    ${language === 'hi' ? 'खतरे के संकेत' : 'Warning signs'}: ${warningList.join('. ')}.
  `;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center space-x-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 no-print"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <h3 className="text-lg font-black text-gov-navy flex items-center gap-2">
              <span>{t('supportiveCareTitle')}</span>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                Home Care Protocol
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'hi' ? 'मरीज व परिजनों के लिए आवश्यक निर्देश' : 'Essential instructions for patient recovery and caregiver safety'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 no-print">
          <AudioReaderButton textToRead={fullTextToRead} />
          <button
            onClick={handlePrint}
            className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-300 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'प्रिंट पर्ची' : 'Print Slip'}</span>
          </button>
        </div>
      </div>

      {/* Safety Guardrail Disclaimer */}
      <div className="bg-amber-50 border-l-4 border-amber-500 p-3.5 rounded-r-xl text-xs text-amber-900 flex items-start space-x-3">
        <ShieldCheck className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          {t('safetyDisclaimer')}
        </p>
      </div>

      {/* Grid of Guidance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1. Hydration & Fluids */}
        <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 space-y-2.5">
          <div className="flex items-center space-x-2 text-blue-900 font-bold text-xs uppercase tracking-wide">
            <Droplets className="w-4 h-4 text-blue-600" />
            <span>{t('hydrationAdvice')}</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-700 list-disc list-inside">
            {hydrationList.map((item, i) => (
              <li key={i} className="leading-relaxed">{item}</li>
            ))}
          </ul>
        </div>

        {/* 2. Diet & Nutrition */}
        <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-2.5">
          <div className="flex items-center space-x-2 text-emerald-900 font-bold text-xs uppercase tracking-wide">
            <Utensils className="w-4 h-4 text-emerald-600" />
            <span>{t('dietAdvice')}</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-700 list-disc list-inside">
            {dietList.map((item, i) => (
              <li key={i} className="leading-relaxed">{item}</li>
            ))}
          </ul>
        </div>

        {/* 3. Rest & Activity */}
        <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/50 space-y-2.5">
          <div className="flex items-center space-x-2 text-indigo-900 font-bold text-xs uppercase tracking-wide">
            <Moon className="w-4 h-4 text-indigo-600" />
            <span>{t('restAdvice')}</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-700 list-disc list-inside">
            {activityList.map((item, i) => (
              <li key={i} className="leading-relaxed">{item}</li>
            ))}
          </ul>
        </div>

        {/* 4. Things to Avoid */}
        <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 space-y-2.5">
          <div className="flex items-center space-x-2 text-rose-900 font-bold text-xs uppercase tracking-wide">
            <Ban className="w-4 h-4 text-rose-600" />
            <span>{t('thingsToAvoid')}</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-700 list-disc list-inside">
            {avoidList.map((item, i) => (
              <li key={i} className="leading-relaxed">{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* 5. Warning Signs (Red Flags) - Full Width */}
      <div className="p-4 sm:p-5 rounded-xl border-2 border-red-400 bg-red-50/80 space-y-3">
        <div className="flex items-center space-x-2 text-red-950 font-extrabold text-sm uppercase tracking-wide">
          <AlertOctagon className="w-5 h-5 text-red-600 animate-pulse" />
          <span>{t('warningSigns')}</span>
          <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded font-bold ml-auto">
            Emergency Alert
          </span>
        </div>
        <p className="text-xs text-red-900 font-medium">
          {language === 'hi'
            ? 'यदि नीचे दिए गए लक्षणों में से कोई भी दिखाई दे तो तुरंत 108 पर कॉल करें या नज़दीकी अस्पताल ले जाएं:'
            : 'If any of the following danger signs develop, immediately transfer patient to the nearest CHC / Hospital or dial 108:'}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-red-950 font-bold">
          {warningList.map((item, i) => (
            <div key={i} className="flex items-start space-x-2 bg-white/80 p-2.5 rounded-lg border border-red-200">
              <span className="text-red-600 mt-0.5">•</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
