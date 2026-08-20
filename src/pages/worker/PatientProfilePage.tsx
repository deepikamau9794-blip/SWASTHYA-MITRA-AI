import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { usePatients } from '../../context/PatientContext';
import { AppHeader } from '../../components/layout/AppHeader';
import { AppSidebar } from '../../components/layout/AppSidebar';
import { TriageBadge } from '../../components/common/TriageBadge';
import { ABHABadge } from '../../components/common/ABHABadge';
import {
  User,
  Stethoscope,
  Clock,
  Phone,
  MapPin,
  Calendar,
  AlertCircle,
  Video,
  FileText,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';

export const PatientProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const { getPatientById, getAssessmentsForPatient } = usePatients();
  const navigate = useNavigate();

  const isHindi = language === 'hi';
  const patient = getPatientById(id || '');
  const pastAssessments = patient ? getAssessmentsForPatient(patient.id) : [];

  if (!patient) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
        <AppHeader pageTitle="Patient Not Found" />
        <div className="flex-1 flex">
          <AppSidebar />
          <main className="flex-1 p-8 text-center space-y-4">
            <h2 className="text-xl font-bold text-slate-800">Patient record not found</h2>
            <Link to="/worker/patients" className="text-xs text-gov-navy underline font-bold">
              Back to Patient Registry
            </Link>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <AppHeader pageTitle={`${patient.name} (${patient.id})`} />

      <div className="flex-1 flex overflow-hidden">
        <AppSidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full space-y-6">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-gov-navy"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>

          {/* Patient Header Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs font-bold text-slate-500">{patient.id}</span>
                  <ABHABadge abhaId={patient.abhaId} size="sm" />
                </div>
                <h1 className="text-2xl font-black text-gov-navy">{patient.name}</h1>
                <div className="text-xs text-slate-600 flex flex-wrap items-center gap-3">
                  <span><strong>{patient.age} Yrs</strong> / {patient.gender}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {patient.village}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-mono">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    {patient.phone}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Link
                  to={`/worker/assessment?patientId=${patient.id}`}
                  className="bg-gov-navy hover:bg-gov-navyDark text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md flex items-center space-x-1.5 transition-all"
                >
                  <Stethoscope className="w-4 h-4 text-gov-saffron" />
                  <span>Start New Assessment</span>
                </Link>
              </div>
            </div>

            {/* Baseline Medical History Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 font-semibold block text-[11px]">Allergies:</span>
                <span className="font-bold text-slate-800">
                  {patient.allergies.length > 0 ? patient.allergies.join(', ') : 'No known allergies'}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 font-semibold block text-[11px]">Regular Medications:</span>
                <span className="font-bold text-slate-800">
                  {patient.currentMedications.length > 0 ? patient.currentMedications.join(', ') : 'None'}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 font-semibold block text-[11px]">Comorbidities:</span>
                <span className="font-bold text-slate-800">
                  {patient.existingConditions.length > 0 ? patient.existingConditions.join(', ') : 'None reported'}
                </span>
              </div>
            </div>
          </div>

          {/* Longitudinal Assessment Timeline */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-gov-navy" />
                <h3 className="text-base font-extrabold text-slate-900">
                  {isHindi ? 'मरीज नैदानिक इतिहास व टाइमलाइन' : 'Longitudinal Clinical Timeline'}
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-semibold">
                {pastAssessments.length} Recorded Assessments
              </span>
            </div>

            {pastAssessments.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400 space-y-2">
                <Stethoscope className="w-8 h-8 text-slate-300 mx-auto" />
                <p>No health screenings recorded for this patient yet.</p>
                <Link
                  to={`/worker/assessment?patientId=${patient.id}`}
                  className="inline-block bg-gov-navy text-white px-3 py-1.5 rounded-lg font-bold"
                >
                  Conduct First Triage
                </Link>
              </div>
            ) : (
              <div className="space-y-6 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-slate-200">
                {pastAssessments.map((record) => (
                  <div key={record.id} className="relative pl-8 space-y-2">
                    {/* Timeline Dot with Triage Color */}
                    <div
                      className={`absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm ${
                        record.triageLevel === 'RED'
                          ? 'bg-red-600 ring-2 ring-red-200'
                          : record.triageLevel === 'AMBER'
                          ? 'bg-amber-500 ring-2 ring-amber-200'
                          : 'bg-emerald-600 ring-2 ring-emerald-200'
                      }`}
                    />

                    <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-xs text-slate-900">{record.date}, {record.timestamp}</span>
                          <span className="text-[10px] font-mono text-slate-400">({record.id})</span>
                        </div>
                        <TriageBadge level={record.triageLevel} size="sm" />
                      </div>

                      {/* Symptoms & Vitals Summary */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <span className="text-slate-500 font-semibold block text-[11px]">Reported Symptoms:</span>
                          <span className="font-medium text-slate-800">
                            {record.symptoms.map(s => `${s.name} (${s.severity})`).join(', ')}
                          </span>
                        </div>

                        <div>
                          <span className="text-slate-500 font-semibold block text-[11px]">Vitals Recorded:</span>
                          <span className="font-mono text-slate-800">
                            Temp: {record.vitals.temperature || 'N/A'}°F | SpO2: {record.vitals.spo2 || 'N/A'}% | RR: {record.vitals.respiratoryRate || 'N/A'}
                          </span>
                        </div>
                      </div>

                      {/* Rationale and Action */}
                      <div className="text-xs text-slate-700 bg-white p-3 rounded-lg border border-slate-200 space-y-1">
                        <div className="font-bold text-gov-navy">
                          {isHindi ? record.urgencyLabelHi : record.urgencyLabel}
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          {isHindi ? record.recommendedActionHi : record.recommendedAction}
                        </p>
                      </div>

                      {/* Referral / Teleconsultation Status */}
                      {record.referralDetails?.isReferred && (
                        <div className="flex items-center justify-between text-xs bg-blue-50/70 p-2.5 rounded-lg border border-blue-200">
                          <div className="flex items-center space-x-2 text-blue-900 font-semibold">
                            <FileText className="w-3.5 h-3.5 text-blue-600" />
                            <span>Referral: {record.referralDetails.facilityName}</span>
                          </div>
                          <span className="text-[10px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded">
                            {record.referralDetails.urgency}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
