import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { usePatients } from '../../context/PatientContext';
import { AppHeader } from '../../components/layout/AppHeader';
import { AppSidebar } from '../../components/layout/AppSidebar';
import { SideBySideComparison } from '../../components/followups/SideBySideComparison';
import { RefreshCw, Calendar, CheckCircle2, ChevronRight, UserCheck } from 'lucide-react';
import type { AssessmentRecord } from '../../types';

export const FollowupsPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { assessments, updateAssessment } = usePatients();
  const isHindi = language === 'hi';

  const [selectedPair, setSelectedPair] = useState<{
    prev: AssessmentRecord;
    curr: AssessmentRecord;
  } | null>(null);

  // Find patients with scheduled follow-ups
  const followUpQueue = assessments.filter(a => a.followUp.needed);

  const handleOpenComparison = (item: AssessmentRecord) => {
    // Construct simulated current follow-up assessment for comparison demo
    const simulatedCurrent: AssessmentRecord = {
      ...item,
      id: `ASS-FOLLOWUP-${Date.now().toString().slice(-4)}`,
      date: 'Today, 19 Aug 2026',
      timestamp: '11:45 AM',
      vitals: {
        ...item.vitals,
        temperature: 99.1,
        spo2: 98,
        respiratoryRate: 22,
      },
      generalObservations: 'Follow-up on Day 3: Patient is afebrile, accepting oral fluids and alert.'
    };

    setSelectedPair({ prev: item, curr: simulatedCurrent });
  };

  const handleSaveProgression = (progression: 'IMPROVING' | 'STABLE' | 'DETERIORATING', notes: string) => {
    if (selectedPair) {
      updateAssessment(selectedPair.prev.id, {
        followUp: {
          ...selectedPair.prev.followUp,
          status: 'COMPLETED',
          clinicalProgression: progression,
          notes: notes || undefined
        }
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <AppHeader pageTitle={isHindi ? 'फॉलो-अप एवं निरंतर देखभाल' : 'Continuity of Care & Follow-ups'} />

      <div className="flex-1 flex overflow-hidden">
        <AppSidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h1 className="text-2xl font-black text-gov-navy flex items-center gap-2">
              <RefreshCw className="w-6 h-6 text-gov-saffron" />
              <span>{isHindi ? 'फॉलो-अप एवं सतत निगरानी कतार' : 'Frontline Follow-up & Progression Queue'}</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Demonstrates longitudinal continuity: compare initial triage presentation against follow-up recovery
            </p>
          </div>

          {/* Follow-up Queue Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {followUpQueue.map((rec) => (
              <div
                key={rec.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">{rec.patientName}</span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">
                      Due: {rec.followUp.dueDate || '20 Aug'}
                    </span>
                  </div>
                  <div className="text-slate-500">
                    Initial Triage: <strong className="text-slate-800">{rec.triageLevel} Priority</strong> ({rec.date})
                  </div>
                  <div className="text-slate-600 line-clamp-1">
                    Symptoms: {rec.symptoms.map(s => s.name).join(', ')}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenComparison(rec)}
                  className="w-full bg-gov-navy hover:bg-gov-navyDark text-white py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 shadow-2xs"
                >
                  <span>Open Side-by-Side Comparison</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Side-by-Side Comparison Drawer / Card if selected */}
          {selectedPair && (
            <div className="pt-4 animate-in fade-in slide-in-from-bottom-3">
              <SideBySideComparison
                previousAssessment={selectedPair.prev}
                currentAssessment={selectedPair.curr}
                onSaveFollowupProgression={handleSaveProgression}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
