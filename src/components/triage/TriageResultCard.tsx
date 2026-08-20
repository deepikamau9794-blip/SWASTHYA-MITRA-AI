import React from 'react';
import type { AssessmentRecord } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { TriageBadge } from '../common/TriageBadge';
import { AudioReaderButton } from '../common/AudioReaderButton';
import { AlertCircle, AlertTriangle, CheckCircle2, ArrowRight, Video, FileText, Share2 } from 'lucide-react';

interface TriageResultCardProps {
  assessment: AssessmentRecord;
  onGenerateReferral?: () => void;
  onInitiateTeleconsult?: () => void;
  onViewSupportiveCare?: () => void;
}

export const TriageResultCard: React.FC<TriageResultCardProps> = ({
  assessment,
  onGenerateReferral,
  onInitiateTeleconsult,
  onViewSupportiveCare,
}) => {
  const { language, t } = useLanguage();
  const { triageLevel, rationaleBullets, rationaleBulletsHi, recommendedAction, recommendedActionHi } = assessment;

  const cardStyles = {
    RED: {
      border: 'border-red-500 ring-2 ring-red-500/20 bg-gradient-to-b from-red-50/80 to-white',
      banner: 'bg-red-700 text-white',
      icon: AlertCircle,
      textColor: 'text-red-900',
    },
    AMBER: {
      border: 'border-amber-500 ring-2 ring-amber-500/20 bg-gradient-to-b from-amber-50/80 to-white',
      banner: 'bg-amber-600 text-white',
      icon: AlertTriangle,
      textColor: 'text-amber-900',
    },
    GREEN: {
      border: 'border-emerald-500 ring-2 ring-emerald-500/20 bg-gradient-to-b from-emerald-50/80 to-white',
      banner: 'bg-emerald-700 text-white',
      icon: CheckCircle2,
      textColor: 'text-emerald-900',
    },
  };

  const currentStyle = cardStyles[triageLevel];
  const Icon = currentStyle.icon;

  const bulletsToDisplay = language === 'hi' && rationaleBulletsHi && rationaleBulletsHi.length > 0
    ? rationaleBulletsHi
    : rationaleBullets;

  const actionText = language === 'hi' && recommendedActionHi
    ? recommendedActionHi
    : recommendedAction;

  const fullTextToRead = `${language === 'hi' ? 'प्राथमिक जांच परिणाम' : 'Preliminary Triage Result'}: ${
    language === 'hi' ? assessment.urgencyLabelHi : assessment.urgencyLabel
  }. ${actionText}.`;

  return (
    <div className={`rounded-2xl border ${currentStyle.border} shadow-lg overflow-hidden transition-all`}>
      {/* Top Banner */}
      <div className={`${currentStyle.banner} px-5 py-3 flex items-center justify-between`}>
        <div className="flex items-center space-x-2.5">
          <Icon className="w-5 h-5" />
          <h3 className="font-extrabold text-sm sm:text-base tracking-wide uppercase">
            {language === 'hi' ? 'प्राथमिक जांच परिणाम' : 'Preliminary Triage Result'}
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <AudioReaderButton textToRead={fullTextToRead} size="sm" />
          <TriageBadge level={triageLevel} size="md" showIcon={false} />
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-5">
        {/* Urgency Headline */}
        <div>
          <div className="text-xs uppercase font-bold tracking-wider text-slate-400">
            {language === 'hi' ? 'तात्कालिकता स्तर (Clinical Urgency):' : 'Triage Priority:'}
          </div>
          <div className={`text-lg sm:text-xl font-black mt-1 ${currentStyle.textColor}`}>
            {language === 'hi' ? assessment.urgencyLabelHi : assessment.urgencyLabel}
          </div>
        </div>

        {/* Why this assessment? */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs space-y-2">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-gov-navy" />
            <span>{language === 'hi' ? 'यह निर्णय क्यों लिया गया? (Clinical Rationale):' : 'Why this assessment?'}</span>
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-700 list-disc list-inside">
            {bulletsToDisplay.map((bullet, idx) => (
              <li key={idx} className="leading-relaxed">
                <span className="font-medium">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recommended Next Action */}
        <div className="bg-slate-900 text-white rounded-xl p-4 border border-slate-800 space-y-1.5 shadow-sm">
          <div className="text-[11px] uppercase font-bold text-gov-saffron tracking-wider">
            {language === 'hi' ? 'अनुशंसित अगला कदम (Recommended Action):' : 'Recommended Next Action:'}
          </div>
          <p className="text-xs sm:text-sm font-semibold leading-relaxed text-slate-100">
            {actionText}
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {/* If RED or AMBER: Show Teleconsultation & Referral buttons */}
          {(triageLevel === 'RED' || triageLevel === 'AMBER') && onInitiateTeleconsult && (
            <button
              onClick={onInitiateTeleconsult}
              className="bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center space-x-2 transition-all transform hover:scale-[1.02]"
            >
              <Video className="w-4 h-4" />
              <span>{t('escalateTeleconsult')}</span>
            </button>
          )}

          {onGenerateReferral && (
            <button
              onClick={onGenerateReferral}
              className="bg-gov-navy hover:bg-gov-navyDark text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center space-x-2 transition-all"
            >
              <FileText className="w-4 h-4 text-gov-saffron" />
              <span>{language === 'hi' ? 'रेफरल पर्ची तैयार करें' : 'Generate Referral Summary'}</span>
            </button>
          )}

          {onViewSupportiveCare && (
            <button
              onClick={onViewSupportiveCare}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-4 py-2.5 rounded-xl border border-slate-300 transition-colors flex items-center space-x-1.5 ml-auto"
            >
              <span>{language === 'hi' ? 'घरेलू देखभाल व सुरक्षा दिशानिर्देश' : 'Supportive Care Guide'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
