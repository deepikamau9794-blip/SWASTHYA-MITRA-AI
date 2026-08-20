import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, CheckCircle2, ShieldCheck, Database, Search, Activity, Stethoscope } from 'lucide-react';

interface AIPipelineVisualizerProps {
  onComplete: () => void;
}

export const AIPipelineVisualizer: React.FC<AIPipelineVisualizerProps> = ({ onComplete }) => {
  const { language, t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);

  const stages = [
    {
      title: language === 'hi' ? '1. मरीज के लक्षणों व इतिहास का विश्लेषण' : '1. Understanding symptoms & medical history',
      desc: language === 'hi' ? 'आयु, पूर्व बीमारियां, लक्षण अवधि और गंभीरता का मूल्यांकन' : 'Evaluating patient age, baseline comorbidities, onset duration and severity markers',
      icon: Activity,
    },
    {
      title: language === 'hi' ? '2. नैदानिक संकेतों एवं वाइटल्स की जांच' : '2. Extracting clinical severity markers & vitals',
      desc: language === 'hi' ? 'तापमान, श्वसन दर, ऑक्सीजन स्तर एवं रेड-फ्लैग्स का मिलान' : 'Cross-checking SpO2, respiratory rate, body temperature and alert thresholds',
      icon: Stethoscope,
    },
    {
      title: language === 'hi' ? '3. सत्यापित स्वास्थ्य दिशानिर्देशों से मिलान (RAG)' : '3. Retrieving verified medical protocols (IMNCI / NVBDCP)',
      desc: language === 'hi' ? 'स्वास्थ्य मंत्रालय (MoHFW) एवं राष्ट्रीय स्वास्थ्य मिशन के प्रोटोकॉल' : 'Querying verified Indian public health standards and community care guidelines',
      icon: Database,
    },
    {
      title: language === 'hi' ? '4. तात्कालिकता एवं जोखिम स्तर का आकलन' : '4. Assessing urgency & danger flags',
      desc: language === 'hi' ? 'ग्रीन, एम्बर या रेड ट्राइएज श्रेणी का पारदर्शी निर्धारण' : 'Calibrating preliminary clinical priority (Green / Amber / Red)',
      icon: Search,
    },
    {
      title: language === 'hi' ? '5. सहायक देखभाल एवं सुरक्षा मार्गदर्शन' : '5. Preparing supportive guidance & referral summary',
      desc: language === 'hi' ? 'घरेलू देखभाल, सावधानियां व नज़दीकी स्वास्थ्य केंद्र रेफरल तैयार' : 'Formulating hydration, diet, danger signs advice and recipient facility match',
      icon: ShieldCheck,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < stages.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 800);
          return prev;
        }
      });
    }, 650);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-lg max-w-2xl mx-auto my-4 text-center select-none">
      {/* Header Badge */}
      <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 text-gov-navy px-3 py-1 rounded-full text-xs font-bold mb-4">
        <Sparkles className="w-3.5 h-3.5 text-gov-saffron animate-spin" />
        <span>BharatGen Clinical Decision Support Engine</span>
      </div>

      <h2 className="text-xl font-black text-gov-navy mb-2">
        {t('aiProcessingTitle')}
      </h2>
      <p className="text-xs text-slate-500 max-w-md mx-auto mb-8">
        {language === 'hi'
          ? 'सत्यापित सरकारी स्वास्थ्य दिशानिर्देशों के आधार पर प्राथमिक जांच परिणाम तैयार किया जा रहा है।'
          : 'Synthesizing evidence-based guidance aligned with National Health Mission protocols.'}
      </p>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 h-2.5 rounded-full mb-8 overflow-hidden border border-slate-200">
        <div
          className="bg-gradient-to-r from-gov-navy via-blue-600 to-gov-saffron h-full transition-all duration-500 rounded-full"
          style={{ width: `${((currentStep + 1) / stages.length) * 100}%` }}
        />
      </div>

      {/* Sequential Pipeline Stages */}
      <div className="space-y-3.5 text-left">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          const isDone = idx < currentStep;
          const isCurrent = idx === currentStep;
          const isPending = idx > currentStep;

          return (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border transition-all flex items-start space-x-3.5 ${
                isCurrent
                  ? 'bg-blue-50/80 border-gov-navy ring-1 ring-gov-navy shadow-sm'
                  : isDone
                  ? 'bg-emerald-50/50 border-emerald-200 text-slate-800'
                  : 'bg-slate-50/60 border-slate-200 opacity-40'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  isDone
                    ? 'bg-emerald-600 text-white'
                    : isCurrent
                    ? 'bg-gov-navy text-white animate-pulse'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {isDone ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-3.5 h-3.5" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 leading-tight truncate">
                    {stage.title}
                  </h4>
                  {isDone && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                      Verified
                    </span>
                  )}
                  {isCurrent && (
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-1.5 py-0.2 rounded animate-pulse">
                      Analyzing...
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-normal">
                  {stage.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-[11px] text-slate-400 font-mono">
        RAG Protocol Stack: IMNCI • NVBDCP • CPHC • RMNCH+A
      </div>
    </div>
  );
};
