import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { usePatients } from '../../context/PatientContext';
import { AppHeader } from '../../components/layout/AppHeader';
import { AppSidebar } from '../../components/layout/AppSidebar';
import { TriageBadge } from '../../components/common/TriageBadge';
import { TeleconsultationModal } from '../../components/teleconsult/TeleconsultationModal';
import {
  Stethoscope,
  Send,
  Video,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Clock,
  ShieldAlert,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import type { AssessmentRecord } from '../../types';

export const DoctorDashboard: React.FC = () => {
  const { user } = useAuth();
  const { language, t } = useLanguage();
  const { assessments, updateReferralStatus } = usePatients();
  const navigate = useNavigate();

  const isHindi = language === 'hi';

  const [activeTeleconsultRecord, setActiveTeleconsultRecord] = useState<AssessmentRecord | null>(null);

  // Referral Queue: Sort so RED urgent cases are pinned to top
  const referralQueue = assessments
    .filter(a => a.referralDetails?.isReferred)
    .sort((a, b) => {
      if (a.triageLevel === 'RED' && b.triageLevel !== 'RED') return -1;
      if (a.triageLevel !== 'RED' && b.triageLevel === 'RED') return 1;
      if (a.triageLevel === 'AMBER' && b.triageLevel === 'GREEN') return -1;
      return 0;
    });

  const urgentCount = assessments.filter(a => a.triageLevel === 'RED').length;
  const pendingTeleconsults = assessments.filter(a => a.teleconsult?.status === 'PENDING').length;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <AppHeader pageTitle={isHindi ? 'चिकित्सा अधिकारी डैशबोर्ड' : 'Medical Officer Referral & Tele-OPD Dashboard'} />

      <div className="flex-1 flex overflow-hidden">
        <AppSidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full space-y-6">
          {/* Doctor Header Banner */}
          <div className="bg-gradient-to-r from-[#0B3C5D] via-[#07253B] to-[#0d3b59] text-white p-6 rounded-2xl shadow-md flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs text-gov-saffron font-bold uppercase tracking-wider">
                {user?.designation} • {user?.assignedFacility}
              </div>
              <h1 className="text-xl sm:text-2xl font-black">
                {user?.name}
              </h1>
              <p className="text-xs text-slate-300">
                Frontline triage referral review desk & AIIMS Telemedicine link • License: {user?.badgeNumber}
              </p>
            </div>

            <div className="flex items-center space-x-2 bg-slate-800/90 border border-slate-700 px-3.5 py-2 rounded-xl text-xs font-mono text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Teleconsult Desk Active</span>
            </div>
          </div>

          {/* Strict Non-Autonomous Medical Safety Warning */}
          <div className="bg-amber-50 border-l-4 border-amber-600 p-4 rounded-r-xl text-xs text-amber-950 flex items-start space-x-3 shadow-2xs">
            <ShieldAlert className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <strong className="font-extrabold block">Clinical Governance & Decision-Support Safety Notice:</strong>
              <p className="leading-relaxed">
                Swasthya Mitra AI provides risk stratification and evidence-based preliminary triage based on frontline worker inputs. <strong>The AI system never prescribes medications or replaces definitive clinical judgment.</strong> All prescription and clinical admission decisions reside exclusively with the attending licensed Medical Officer.
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-red-200 bg-red-50/40 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-red-800 text-xs">
                <span className="font-bold">Urgent Red Cases</span>
                <AlertTriangle className="w-4 h-4 text-red-600" />
              </div>
              <div className="text-2xl font-black text-red-700">{urgentCount}</div>
              <div className="text-[11px] text-red-700 font-semibold">Priority Pinned</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-purple-200 bg-purple-50/40 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-purple-800 text-xs">
                <span className="font-bold">Teleconsult Requests</span>
                <Video className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-2xl font-black text-purple-700">{pendingTeleconsults}</div>
              <div className="text-[11px] text-purple-700 font-semibold">Live Call Queue</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span className="font-bold">Total Referred</span>
                <Send className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">{referralQueue.length}</div>
              <div className="text-[11px] text-slate-400">Incoming from ASHAs</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span className="font-bold">Reviewed Cases</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">12</div>
              <div className="text-[11px] text-emerald-700 font-semibold">Today's Shift</div>
            </div>
          </div>

          {/* Priority-Sorted Referral Queue Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Send className="w-5 h-5 text-gov-navy" />
                <h3 className="text-base font-extrabold text-slate-900">
                  {t('referralQueue')} (Urgent Pinned)
                </h3>
              </div>
              <span className="text-xs font-bold text-slate-500">
                {referralQueue.length} Referrals Awaiting Review
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                    <th className="p-3">Priority / ID</th>
                    <th className="p-3">Patient Name & Age</th>
                    <th className="p-3">Reported Symptoms & Vitals</th>
                    <th className="p-3">Referred By (ASHA)</th>
                    <th className="p-3">Target Facility</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Clinical Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {referralQueue.map((item) => {
                    const isUrgent = item.triageLevel === 'RED';
                    return (
                      <tr
                        key={item.id}
                        className={`transition-colors ${
                          isUrgent ? 'bg-red-50/40 hover:bg-red-50/70 font-semibold' : 'hover:bg-slate-50'
                        }`}
                      >
                        <td className="p-3">
                          <div className="flex items-center space-x-2">
                            {isUrgent && <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping flex-shrink-0" />}
                            <TriageBadge level={item.triageLevel} size="sm" />
                          </div>
                          <div className="font-mono text-[10px] text-slate-400 mt-1">{item.patientId}</div>
                        </td>

                        <td className="p-3">
                          <div className="font-extrabold text-slate-900 text-sm">{item.patientName}</div>
                          <div className="text-[11px] text-slate-500">{item.patientAge} Yrs / {item.patientGender} • {item.patientVillage}</div>
                        </td>

                        <td className="p-3 max-w-[220px]">
                          <div className="font-bold text-slate-800 truncate">
                            {item.symptoms.map(s => s.name).join(', ')}
                          </div>
                          <div className="font-mono text-[10px] text-slate-500 mt-0.5">
                            Temp: {item.vitals.temperature || '--'}°F | SpO2: {item.vitals.spo2 || '--'}% | RR: {item.vitals.respiratoryRate || '--'}
                          </div>
                        </td>

                        <td className="p-3 text-slate-700">
                          <div>{item.referralDetails?.referredByWorker}</div>
                          <div className="text-[10px] text-slate-400">{item.referralDetails?.referredAt}</div>
                        </td>

                        <td className="p-3 text-gov-navy font-bold">
                          {item.referralDetails?.facilityName}
                        </td>

                        <td className="p-3">
                          <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                            {item.referralDetails?.status || 'PENDING_REVIEW'}
                          </span>
                        </td>

                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            {isUrgent && (
                              <button
                                onClick={() => setActiveTeleconsultRecord(item)}
                                className="bg-purple-700 hover:bg-purple-800 text-white font-bold px-2.5 py-1 rounded-lg text-xs flex items-center space-x-1 shadow-2xs"
                                title="Launch Video Teleconsultation"
                              >
                                <Video className="w-3 h-3" />
                                <span>Video</span>
                              </button>
                            )}

                            <Link
                              to={`/doctor/patient/${item.patientId}`}
                              className="bg-gov-navy hover:bg-gov-navyDark text-white font-bold px-3 py-1 rounded-lg text-xs shadow-2xs flex items-center space-x-1"
                            >
                              <span>Review EHR</span>
                              <ChevronRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {activeTeleconsultRecord && (
        <TeleconsultationModal
          isOpen={!!activeTeleconsultRecord}
          onClose={() => setActiveTeleconsultRecord(null)}
          assessment={activeTeleconsultRecord}
        />
      )}
    </div>
  );
};
