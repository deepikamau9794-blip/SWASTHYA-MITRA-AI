import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { usePatients } from '../../context/PatientContext';
import { AppHeader } from '../../components/layout/AppHeader';
import { AppSidebar } from '../../components/layout/AppSidebar';
import { TeleconsultationModal } from '../../components/teleconsult/TeleconsultationModal';
import { TriageBadge } from '../../components/common/TriageBadge';
import { Video, Stethoscope, AlertCircle, PhoneCall, CheckCircle2 } from 'lucide-react';
import type { AssessmentRecord } from '../../types';

export const TeleconsultPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { assessments } = usePatients();
  const isHindi = language === 'hi';

  const [activeCallAssessment, setActiveCallAssessment] = useState<AssessmentRecord | null>(null);

  const teleconsultEligible = assessments.filter(a => a.triageLevel === 'RED' || a.triageLevel === 'AMBER');

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <AppHeader pageTitle={isHindi ? 'टेलीकंसल्टेशन मॉड्यूल' : 'Apex Teleconsultation Module'} />

      <div className="flex-1 flex overflow-hidden">
        <AppSidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h1 className="text-2xl font-black text-gov-navy flex items-center gap-2">
              <Video className="w-6 h-6 text-purple-600" />
              <span>{isHindi ? 'एम्स एवं जिला अस्पताल टेलीकंसल्टेशन' : 'Teleconsultation Escalation Desk'}</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Modeled after AIIMS Tele-OPD: direct audio-video link for Urgent (Red) & Needs Evaluation (Amber) cases
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white rounded-2xl p-6 shadow-md flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs text-purple-300 font-bold uppercase tracking-wider">
                Active Telemedicine Hub • AIIMS Gorakhpur & DH Pratapgarh
              </div>
              <h3 className="text-lg font-bold">On-Call Pediatric & Medicine Consultants Available</h3>
              <p className="text-xs text-slate-300">
                Frontline workers can instantly initiate a tele-triage video session with EHR sharing.
              </p>
            </div>
            <div className="flex items-center space-x-2 bg-purple-950/60 border border-purple-400/30 px-3 py-1.5 rounded-full text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Doctor Desk Online</span>
            </div>
          </div>

          {/* Eligible Patients Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900">
              Patients Eligible for Immediate Medical Officer Teleconsultation:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teleconsultEligible.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <strong className="text-slate-900 text-sm">{item.patientName}</strong>
                      <TriageBadge level={item.triageLevel} size="sm" />
                    </div>
                    <div className="text-slate-600">
                      {item.patientAge} Yrs • {item.patientVillage}
                    </div>
                    <div className="text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200 text-[11px] line-clamp-2">
                      <strong>Symptoms:</strong> {item.symptoms.map(s => s.name).join(', ')}
                    </div>
                    {item.teleconsult?.status === 'COMPLETED' && (
                      <div className="flex items-center space-x-1 text-emerald-700 text-[11px] font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Doctor Consultation Notes Attached</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => setActiveCallAssessment(item)}
                    className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 rounded-xl text-xs shadow-md transition-all flex items-center justify-center space-x-2"
                  >
                    <Video className="w-4 h-4" />
                    <span>{item.teleconsult?.status === 'COMPLETED' ? 'Re-open Teleconsult Video' : 'Initiate Video Call with Doctor'}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {activeCallAssessment && (
        <TeleconsultationModal
          isOpen={!!activeCallAssessment}
          onClose={() => setActiveCallAssessment(null)}
          assessment={activeCallAssessment}
        />
      )}
    </div>
  );
};
