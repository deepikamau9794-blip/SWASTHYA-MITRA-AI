import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { usePatients } from '../../context/PatientContext';
import { AppHeader } from '../../components/layout/AppHeader';
import { AppSidebar } from '../../components/layout/AppSidebar';
import { TriageBadge } from '../../components/common/TriageBadge';
import { ABHABadge } from '../../components/common/ABHABadge';
import { ExplainabilityPanel } from '../../components/triage/ExplainabilityPanel';
import { TeleconsultationModal } from '../../components/teleconsult/TeleconsultationModal';
import {
  Stethoscope,
  Video,
  FileText,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  ShieldAlert,
  Building2,
  Clock
} from 'lucide-react';

export const DoctorPatientView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const { getPatientById, getAssessmentsForPatient, updateReferralStatus } = usePatients();
  const navigate = useNavigate();

  const isHindi = language === 'hi';
  const patient = getPatientById(id || '');
  const patientAssessments = patient ? getAssessmentsForPatient(patient.id) : [];
  const latestAssessment = patientAssessments[0];

  const [clinicalNotes, setClinicalNotes] = useState(
    'Clinical evaluation conducted. Prescribed oral rehydration therapy, antipyretics SOS, and observation at CHC Sandwa Chandrika pediatric observation room.'
  );
  const [caseStatus, setCaseStatus] = useState<any>('ACCEPTED');
  const [teleconsultModalOpen, setTeleconsultModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  if (!patient || !latestAssessment) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
        <AppHeader pageTitle="Case Not Found" />
        <div className="flex-1 flex">
          <AppSidebar />
          <main className="flex-1 p-8 text-center space-y-4">
            <h2 className="text-xl font-bold">Clinical case record not found</h2>
            <Link to="/doctor/dashboard" className="text-gov-navy underline font-bold text-xs">
              Back to Doctor Dashboard
            </Link>
          </main>
        </div>
      </div>
    );
  }

  const handleSaveDoctorReview = () => {
    updateReferralStatus(latestAssessment.id, caseStatus);
    setIsSaved(true);
    setTimeout(() => {
      navigate('/doctor/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <AppHeader pageTitle={`Doctor Review: ${patient.name} (${patient.id})`} />

      <div className="flex-1 flex overflow-hidden">
        <AppSidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-5xl mx-auto w-full space-y-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-gov-navy"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Referral Queue</span>
          </button>

          {/* Medical Officer Review Header Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs font-bold text-slate-500">{patient.id}</span>
                  <ABHABadge abhaId={patient.abhaId} size="sm" />
                </div>
                <h1 className="text-2xl font-black text-gov-navy">{patient.name}</h1>
                <div className="text-xs text-slate-600">
                  {patient.age} Yrs / {patient.gender} • Village: {patient.village}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <TriageBadge level={latestAssessment.triageLevel} size="md" />
                {latestAssessment.triageLevel === 'RED' && (
                  <button
                    onClick={() => setTeleconsultModalOpen(true)}
                    className="bg-purple-700 hover:bg-purple-800 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center space-x-1 shadow-md"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Launch Tele-OPD Video</span>
                  </button>
                )}
              </div>
            </div>

            {/* Frontline Assessment Findings */}
            <div className="space-y-3 text-xs">
              <h3 className="font-bold text-slate-900 text-sm">
                Frontline ASHA Assessment Presentation ({latestAssessment.date}, {latestAssessment.timestamp})
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-slate-500 font-semibold block">Reported Symptoms:</span>
                  <ul className="list-disc list-inside font-medium text-slate-800 space-y-0.5">
                    {latestAssessment.symptoms.map(s => (
                      <li key={s.id}>{s.name} ({s.severity}) — Duration: {s.durationDays} days</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-slate-500 font-semibold block">Vitals Baseline:</span>
                  <div className="grid grid-cols-2 gap-1 font-mono text-[11px] text-slate-700">
                    <div>Temp: <strong>{latestAssessment.vitals.temperature || '--'}°F</strong></div>
                    <div>SpO2: <strong>{latestAssessment.vitals.spo2 || '--'}%</strong></div>
                    <div>RR: <strong>{latestAssessment.vitals.respiratoryRate || '--'} bpm</strong></div>
                    <div>HR: <strong>{latestAssessment.vitals.heartRate || '--'} bpm</strong></div>
                  </div>
                </div>
              </div>

              {latestAssessment.redFlagsIdentified.length > 0 && (
                <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-950">
                  <strong className="text-red-900 font-bold block mb-1">Danger Signs Flagged by Frontline Triage:</strong>
                  <div className="font-semibold">{latestAssessment.redFlagsIdentified.join(' • ')}</div>
                </div>
              )}
            </div>
          </div>

          {/* Transparent AI Explainability */}
          <ExplainabilityPanel
            evidenceList={latestAssessment.explainability}
            patientParameters={{
              age: latestAssessment.patientAge,
              symptoms: latestAssessment.symptoms.map(s => s.name),
              vitals: [
                `Temp: ${latestAssessment.vitals.temperature || '--'}°F`,
                `SpO2: ${latestAssessment.vitals.spo2 || '--'}%`
              ],
              redFlags: latestAssessment.redFlagsIdentified
            }}
          />

          {/* Doctor Clinical Disposition & Notes Entry */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4 text-xs">
            <h3 className="text-base font-extrabold text-gov-navy flex items-center gap-2 border-b border-slate-100 pb-2">
              <Stethoscope className="w-5 h-5 text-gov-saffron" />
              <span>Medical Officer Clinical Review & Disposition</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Referral Disposition / Status:</label>
                <select
                  value={caseStatus}
                  onChange={(e) => setCaseStatus(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-gov-navy"
                >
                  <option value="ACCEPTED">Accepted for In-Person Evaluation (स्वीकृत)</option>
                  <option value="ADMITTED">Admitted to Inpatient Ward (भर्ती)</option>
                  <option value="DISCHARGED">Discharged with Home Care Advice (सकुशल डिस्चार्ज)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Attending Doctor / MO:</label>
                <input
                  type="text"
                  disabled
                  value="Dr. Arvind Shrivastava, MD (UPMC-67219-MCI)"
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-700"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Doctor's Clinical Notes & Treatment Instructions:</label>
              <textarea
                rows={4}
                value={clinicalNotes}
                onChange={(e) => setClinicalNotes(e.target.value)}
                className="w-full border border-slate-300 rounded-xl p-3 text-xs focus:ring-1 focus:ring-gov-navy focus:outline-none leading-relaxed"
                placeholder="Enter clinical assessment, lab orders (CBC/RDT), and observation orders..."
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              {isSaved ? (
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Clinical Disposition Saved to ABDM Longitudinal EHR! Redirecting...</span>
                </span>
              ) : (
                <span className="text-slate-400 text-[11px]">
                  * Updates referral queue and transmits clinical note back to frontline worker.
                </span>
              )}

              <button
                type="button"
                onClick={handleSaveDoctorReview}
                className="bg-gov-navy hover:bg-gov-navyDark text-white font-bold px-6 py-2.5 rounded-xl shadow-md transition-all ml-auto"
              >
                Submit Clinical Disposition
              </button>
            </div>
          </div>
        </main>
      </div>

      {teleconsultModalOpen && (
        <TeleconsultationModal
          isOpen={teleconsultModalOpen}
          onClose={() => setTeleconsultModalOpen(false)}
          assessment={latestAssessment}
        />
      )}
    </div>
  );
};
