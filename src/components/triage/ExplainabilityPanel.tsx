import React, { useState } from 'react';
import type { MedicalEvidence } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { HelpCircle, ChevronDown, ChevronUp, BookOpen, ShieldCheck, Cpu } from 'lucide-react';

interface ExplainabilityPanelProps {
  evidenceList: MedicalEvidence[];
  patientParameters: {
    age: number;
    symptoms: string[];
    vitals: string[];
    redFlags: string[];
  };
}

export const ExplainabilityPanel: React.FC<ExplainabilityPanelProps> = ({
  evidenceList,
  patientParameters,
}) => {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-slate-50 border border-slate-300 rounded-2xl overflow-hidden shadow-xs transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-100/80 transition-colors select-none"
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-gov-navy flex items-center justify-center flex-shrink-0">
            <HelpCircle className="w-4 h-4 text-gov-navy" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
              <span>{t('explainabilityTitle')}</span>
              <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.2 rounded-full border border-blue-200">
                Transparent AI / RAG
              </span>
            </h4>
            <p className="text-[11px] text-slate-500">
              {t('explainabilitySub')}
            </p>
          </div>
        </div>
        <div className="text-slate-400">
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-4 sm:p-6 border-t border-slate-200 bg-white space-y-5 animate-in fade-in slide-in-from-top-1">
          {/* Transparent Guardrail Disclaimer */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start space-x-2.5">
            <ShieldCheck className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">Transparent Decision-Support Architecture: </strong>
              <span>
                {language === 'hi'
                  ? 'यह प्रणाली केवल पूर्व-सत्यापित सरकारी स्वास्थ्य दिशानिर्देशों (IMNCI, NVBDCP) से मिलान कर अग्रिम पंक्ति के कार्यकर्ताओं को रेफरल व देखभाल में सहायता करती है।'
                  : 'The preliminary triage priority is deterministically synthesized by matching input clinical parameters against verified public health protocols.'}
              </span>
            </div>
          </div>

          {/* Section 1: Evaluated Patient Clinical Parameters */}
          <div className="space-y-2">
            <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-gov-navy" />
              <span>{language === 'hi' ? '1. विश्लेषित मरीज के प्रमुख पैरामीटर्स:' : '1. Evaluated Patient Clinical Inputs:'}</span>
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-[11px]">Age & Symptoms:</span>
                <span className="font-semibold text-slate-800">
                  {patientParameters.age} yrs • {patientParameters.symptoms.join(', ') || 'None specified'}
                </span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-[11px]">Recorded Vitals:</span>
                <span className="font-semibold text-slate-800">
                  {patientParameters.vitals.join(' | ') || 'Standard vitals baseline'}
                </span>
              </div>
              {patientParameters.redFlags.length > 0 && (
                <div className="p-2.5 bg-red-50 rounded-lg border border-red-200 sm:col-span-2 text-red-900">
                  <span className="text-red-700 font-bold block text-[11px]">Detected Red Flags:</span>
                  <span className="font-bold">{patientParameters.redFlags.join(' • ')}</span>
                </div>
              )}
            </div>
          </div>

          {/* Section 2: Matched Medical Protocols */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-gov-navy" />
              <span>{language === 'hi' ? '2. मिलान किए गए सरकारी स्वास्थ्य प्रोटोकॉल (Verified RAG Guidelines):' : '2. Verified Guidelines & Decision Logic Referenced:'}</span>
            </h5>

            <div className="space-y-2.5">
              {evidenceList.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-gov-navy">{item.guideline}</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Match: {(item.confidenceScore * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500">Source: {item.sourceModule}</div>
                  <div className="text-xs text-slate-700 font-medium bg-white p-2 rounded border border-slate-200">
                    <strong>Rule Logic:</strong> {item.ruleTriggered}
                  </div>
                  {item.matchedKeywords.length > 0 && (
                    <div className="text-[11px] text-slate-600 flex items-center gap-1">
                      <span className="font-semibold">Keywords:</span>
                      <span className="font-mono text-[10px] bg-slate-200 px-1.5 py-0.2 rounded text-slate-800">
                        {item.matchedKeywords.join(', ')}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
