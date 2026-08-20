import React, { useState } from 'react';
import type { AssessmentRecord } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { TriageBadge } from '../common/TriageBadge';
import { ArrowRight, TrendingUp, TrendingDown, Minus, CheckCircle, RefreshCw } from 'lucide-react';

interface SideBySideComparisonProps {
  previousAssessment: AssessmentRecord;
  currentAssessment: AssessmentRecord;
  onSaveFollowupProgression?: (progression: 'IMPROVING' | 'STABLE' | 'DETERIORATING', notes: string) => void;
}

export const SideBySideComparison: React.FC<SideBySideComparisonProps> = ({
  previousAssessment,
  currentAssessment,
  onSaveFollowupProgression,
}) => {
  const { language, t } = useLanguage();
  const [progression, setProgression] = useState<'IMPROVING' | 'STABLE' | 'DETERIORATING'>('IMPROVING');
  const [followupNotes, setFollowupNotes] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    if (onSaveFollowupProgression) {
      onSaveFollowupProgression(progression, followupNotes);
    }
    setIsSaved(true);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 space-y-6">
      {/* Title Header */}
      <div className="border-b border-slate-200 pb-4">
        <h3 className="text-base font-black text-gov-navy flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-gov-saffron" />
          <span>{t('followupComparisonTitle')}</span>
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          {language === 'hi' ? 'समय के साथ मरीज की स्थिति में सुधार या बदलाव का तुलनात्मक विश्लेषण' : 'Comparative clinical evaluation to ensure longitudinal continuity of care'}
        </p>
      </div>

      {/* Side-by-Side Cards Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: Previous Assessment (Day 1) */}
        <div className="p-4 rounded-xl border border-slate-300 bg-slate-50/70 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Previous Assessment ({previousAssessment.date})
            </span>
            <TriageBadge level={previousAssessment.triageLevel} size="sm" />
          </div>

          <div className="space-y-2 text-xs">
            <div>
              <span className="text-slate-500 font-semibold block text-[11px]">Primary Symptoms:</span>
              <div className="font-medium text-slate-800">
                {previousAssessment.symptoms.map(s => s.name).join(', ')}
              </div>
            </div>

            <div>
              <span className="text-slate-500 font-semibold block text-[11px]">Vitals Recorded:</span>
              <div className="grid grid-cols-2 gap-1 font-mono text-[11px] text-slate-700 bg-white p-2 rounded border border-slate-200">
                <div>Temp: <strong>{previousAssessment.vitals.temperature || 'N/A'}°F</strong></div>
                <div>SpO2: <strong>{previousAssessment.vitals.spo2 || 'N/A'}%</strong></div>
                <div>Resp Rate: <strong>{previousAssessment.vitals.respiratoryRate || 'N/A'}</strong></div>
                <div>Heart Rate: <strong>{previousAssessment.vitals.heartRate || 'N/A'}</strong></div>
              </div>
            </div>

            {previousAssessment.generalObservations && (
              <div>
                <span className="text-slate-500 font-semibold block text-[11px]">Observations:</span>
                <p className="text-slate-700 bg-white p-2 rounded border border-slate-200">
                  {previousAssessment.generalObservations}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Current Assessment (Follow-up) */}
        <div className="p-4 rounded-xl border-2 border-blue-400 bg-blue-50/30 space-y-3">
          <div className="flex items-center justify-between border-b border-blue-200 pb-2">
            <span className="text-xs font-bold text-gov-navy uppercase tracking-wider">
              Current Assessment ({currentAssessment.date})
            </span>
            <TriageBadge level={currentAssessment.triageLevel} size="sm" />
          </div>

          <div className="space-y-2 text-xs">
            <div>
              <span className="text-slate-500 font-semibold block text-[11px]">Current Symptoms:</span>
              <div className="font-medium text-slate-800">
                {currentAssessment.symptoms.map(s => s.name).join(', ')}
              </div>
            </div>

            <div>
              <span className="text-slate-500 font-semibold block text-[11px]">Current Vitals:</span>
              <div className="grid grid-cols-2 gap-1 font-mono text-[11px] text-slate-700 bg-white p-2 rounded border border-blue-200">
                <div>Temp: <strong>{currentAssessment.vitals.temperature || 'N/A'}°F</strong></div>
                <div>SpO2: <strong>{currentAssessment.vitals.spo2 || 'N/A'}%</strong></div>
                <div>Resp Rate: <strong>{currentAssessment.vitals.respiratoryRate || 'N/A'}</strong></div>
                <div>Heart Rate: <strong>{currentAssessment.vitals.heartRate || 'N/A'}</strong></div>
              </div>
            </div>

            {currentAssessment.generalObservations && (
              <div>
                <span className="text-slate-500 font-semibold block text-[11px]">Follow-up Observations:</span>
                <p className="text-slate-700 bg-white p-2 rounded border border-blue-200">
                  {currentAssessment.generalObservations}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* "Has the situation changed?" Interactive Field Evaluation */}
      <div className="bg-slate-900 text-white rounded-xl p-5 space-y-4">
        <h4 className="text-xs font-bold text-gov-saffron uppercase tracking-wider">
          {t('hasSituationChanged')}
        </h4>

        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setProgression('IMPROVING')}
            className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center justify-center space-y-1 ${
              progression === 'IMPROVING'
                ? 'bg-emerald-600 text-white border-emerald-400 ring-2 ring-emerald-300'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <TrendingDown className="w-5 h-5 text-emerald-300" />
            <span>{t('improving')}</span>
          </button>

          <button
            type="button"
            onClick={() => setProgression('STABLE')}
            className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center justify-center space-y-1 ${
              progression === 'STABLE'
                ? 'bg-blue-600 text-white border-blue-400 ring-2 ring-blue-300'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <Minus className="w-5 h-5 text-blue-300" />
            <span>{t('stable')}</span>
          </button>

          <button
            type="button"
            onClick={() => setProgression('DETERIORATING')}
            className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center justify-center space-y-1 ${
              progression === 'DETERIORATING'
                ? 'bg-red-600 text-white border-red-400 ring-2 ring-red-300'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <TrendingUp className="w-5 h-5 text-red-300" />
            <span>{t('deteriorating')}</span>
          </button>
        </div>

        <div>
          <label className="text-xs text-slate-300 block mb-1 font-semibold">
            {language === 'hi' ? 'आशा कार्यकर्ता फॉलो-अप टिप्पणी:' : 'Health Worker Follow-up Notes:'}
          </label>
          <input
            type="text"
            value={followupNotes}
            onChange={(e) => setFollowupNotes(e.target.value)}
            placeholder={language === 'hi' ? 'जैसे: बुखार कम हो गया है, बच्चा सामान्य रूप से खेल रहा है...' : 'e.g. Fever resolved, appetite recovered, resting comfortably...'}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-gov-saffron"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          {isSaved ? (
            <span className="inline-flex items-center space-x-1 text-emerald-400 text-xs font-bold">
              <CheckCircle className="w-4 h-4" />
              <span>Follow-up Evaluation Saved to Longitudinal EHR</span>
            </span>
          ) : (
            <span className="text-[11px] text-slate-400">
              * Updates patient timeline and closes pending follow-up task.
            </span>
          )}

          <button
            onClick={handleSave}
            className="bg-gov-saffron hover:bg-amber-500 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs transition-colors shadow-sm ml-auto"
          >
            {language === 'hi' ? 'फॉलो-अप सहेजें' : 'Save Follow-up Progression'}
          </button>
        </div>
      </div>
    </div>
  );
};
