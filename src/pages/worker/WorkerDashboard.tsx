import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { usePatients } from '../../context/PatientContext';
import { AppHeader } from '../../components/layout/AppHeader';
import { AppSidebar } from '../../components/layout/AppSidebar';
import { TriageBadge } from '../../components/common/TriageBadge';
import { ABHABadge } from '../../components/common/ABHABadge';
import { FacilityCard } from '../../components/common/FacilityCard';
import {
  Users,
  UserPlus,
  Stethoscope,
  Clock,
  RefreshCw,
  Send,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Building2,
  ChevronRight,
  ArrowRight,
  Search,
  Filter,
  CheckCircle
} from 'lucide-react';
import type { TriageLevel } from '../../types';

export const WorkerDashboard: React.FC = () => {
  const { user } = useAuth();
  const { language, t } = useLanguage();
  const { patients, assessments, reminders, facilities, completeReminder } = usePatients();
  const navigate = useNavigate();

  const [triageFilter, setTriageFilter] = useState<'ALL' | TriageLevel>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const isHindi = language === 'hi';

  const totalPatientsCount = patients.length;
  const todayAssessmentsCount = assessments.filter(a => a.date.includes('19 Aug') || a.date.includes('Today')).length;
  const followupsDueCount = assessments.filter(a => a.followUp.needed && a.followUp.status === 'SCHEDULED').length;
  const urgentCount = assessments.filter(a => a.triageLevel === 'RED').length;

  const filteredAssessments = assessments.filter(a => {
    const matchesFilter = triageFilter === 'ALL' || a.triageLevel === triageFilter;
    const matchesSearch =
      a.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.patientVillage.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const activeReminders = reminders.filter(r => !r.completed);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <AppHeader pageTitle={isHindi ? 'आशा कार्यकर्ता डैशबोर्ड' : 'Healthcare Worker Dashboard'} />

      <div className="flex-1 flex overflow-hidden">
        <AppSidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto space-y-6 max-w-7xl mx-auto w-full">
          {/* Top Greeting Band */}
          <div className="bg-gradient-to-r from-[#0B3C5D] via-[#07253B] to-[#14537D] text-white p-6 rounded-2xl shadow-md flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs text-gov-saffron font-bold uppercase tracking-wider">
                {t('assignedOverview')} • {user?.assignedFacility}
              </div>
              <h1 className="text-xl sm:text-2xl font-black">
                {t('goodMorning')}, {user?.name}
              </h1>
              <p className="text-xs text-slate-300">
                {isHindi
                  ? `निर्धारित क्षेत्र: ${user?.village || 'सदर प्रतापगढ़'} • आज की नैदानिक कार्यसूची तैयार है।`
                  : `Assigned Area: ${user?.village || 'Pratapgarh Sadar'} • Ready for field assessments.`}
              </p>
            </div>

            <div className="flex items-center space-x-2.5">
              <Link
                to="/worker/new-patient"
                className="bg-gov-saffron hover:bg-amber-500 text-slate-950 px-4 py-2.5 rounded-xl font-black text-xs shadow-sm flex items-center space-x-1.5 transition-all"
              >
                <UserPlus className="w-4 h-4" />
                <span>{t('actionNewPatient')}</span>
              </Link>
              <Link
                to="/worker/assessment"
                className="bg-white hover:bg-slate-100 text-gov-navy px-4 py-2.5 rounded-xl font-black text-xs shadow-sm flex items-center space-x-1.5 transition-all"
              >
                <Stethoscope className="w-4 h-4 text-gov-navy" />
                <span>{t('actionStartAssessment')}</span>
              </Link>
            </div>
          </div>

          {/* 4 Stat Overview Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-bold">{t('totalPatients')}</span>
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">{totalPatientsCount}</div>
              <div className="text-[11px] text-slate-400">Village Registry</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-bold">{t('todayAssessments')}</span>
                <Stethoscope className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">{todayAssessmentsCount}</div>
              <div className="text-[11px] text-emerald-700 font-semibold">Active Field Visits</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-bold">{t('followupsDue')}</span>
                <RefreshCw className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-2xl font-black text-amber-700">{followupsDueCount}</div>
              <div className="text-[11px] text-slate-400">Day 3 / Day 7 Visits</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-red-200 bg-red-50/40 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-red-800">
                <span className="text-xs font-bold">{t('urgentReferrals')}</span>
                <AlertTriangle className="w-4 h-4 text-red-600" />
              </div>
              <div className="text-2xl font-black text-red-700">{urgentCount}</div>
              <div className="text-[11px] text-red-700 font-semibold">Hospital Escalations</div>
            </div>
          </div>

          {/* Split Section: Left Reminders / Right Nearby Facilities Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Today's Field Action Reminders (7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gov-navy" />
                  <h3 className="text-sm font-extrabold text-slate-900">{t('todayRemindersTitle')}</h3>
                </div>
                <span className="text-[11px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                  {activeReminders.length} Actions Due
                </span>
              </div>

              <div className="space-y-2.5">
                {activeReminders.map((rem) => (
                  <div
                    key={rem.id}
                    className="p-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 flex items-center justify-between gap-3 text-xs transition-colors"
                  >
                    <div className="space-y-0.5">
                      <div className="font-bold text-slate-900">
                        {isHindi ? rem.titleHi : rem.title}
                      </div>
                      <div className="text-slate-500 text-[11px]">
                        Patient: <strong className="text-slate-700">{rem.patientName}</strong> • {rem.village}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                        {rem.dueDate}
                      </span>
                      <button
                        onClick={() => completeReminder(rem.id)}
                        className="bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-300 font-bold px-2.5 py-1 rounded-lg text-[11px] shadow-2xs transition-colors"
                      >
                        ✓ Done
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Nearby Linked Facilities Preview (5 Cols) */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <Building2 className="w-4 h-4 text-gov-navy" />
                  <h3 className="text-sm font-extrabold text-slate-900">{t('nearbyFacilitiesTitle')}</h3>
                </div>
                <Link to="/worker/facilities" className="text-[11px] font-bold text-gov-navy hover:underline">
                  View All
                </Link>
              </div>

              <div className="space-y-3">
                {facilities.slice(0, 2).map((fac) => (
                  <div key={fac.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <strong className="text-slate-900 text-xs truncate max-w-[200px]">
                        {isHindi ? fac.nameHi : fac.name}
                      </strong>
                      <span className="text-[10px] bg-slate-200 text-slate-800 font-bold px-1.5 py-0.2 rounded">
                        {fac.distanceKm} km
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 line-clamp-1">{fac.address}</div>
                    <div className="flex items-center justify-between pt-1 text-[10px] text-slate-600">
                      <span>Beds: <strong>{fac.availableBeds}</strong></span>
                      {fac.emergencyAvailable24x7 && <span className="text-red-700 font-bold">24x7 Emergency</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Assessments Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">{t('recentAssessmentsTitle')}</h3>
                <p className="text-xs text-slate-500">
                  {isHindi ? 'मरीजों की प्राथमिक जांच परिणाम एवं फॉलो-अप स्थिति' : 'Filter by clinical priority status'}
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <button
                  onClick={() => setTriageFilter('ALL')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    triageFilter === 'ALL' ? 'bg-gov-navy text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  All ({assessments.length})
                </button>
                <button
                  onClick={() => setTriageFilter('RED')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    triageFilter === 'RED' ? 'bg-red-600 text-white' : 'bg-red-50 text-red-800 hover:bg-red-100'
                  }`}
                >
                  Urgent ({assessments.filter(a => a.triageLevel === 'RED').length})
                </button>
                <button
                  onClick={() => setTriageFilter('AMBER')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    triageFilter === 'AMBER' ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                  }`}
                >
                  Needs Eval ({assessments.filter(a => a.triageLevel === 'AMBER').length})
                </button>
                <button
                  onClick={() => setTriageFilter('GREEN')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    triageFilter === 'GREEN' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                  }`}
                >
                  Lower Priority ({assessments.filter(a => a.triageLevel === 'GREEN').length})
                </button>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-xl focus:ring-1 focus:ring-gov-navy focus:outline-none"
              />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                    <th className="p-3">Patient ID</th>
                    <th className="p-3">Name / Village</th>
                    <th className="p-3">Primary Symptoms</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Triage Urgency</th>
                    <th className="p-3">Referral Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAssessments.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3 font-mono font-bold text-slate-900">
                        {item.patientId}
                      </td>
                      <td className="p-3">
                        <div className="font-bold text-slate-900">{item.patientName}</div>
                        <div className="text-[11px] text-slate-500">{item.patientVillage} ({item.patientAge} Yrs)</div>
                      </td>
                      <td className="p-3">
                        <span className="font-semibold text-slate-800">
                          {item.symptoms.map(s => s.name).join(', ')}
                        </span>
                      </td>
                      <td className="p-3 text-slate-600 font-mono text-[11px]">
                        {item.date}
                      </td>
                      <td className="p-3">
                        <TriageBadge level={item.triageLevel} size="sm" />
                      </td>
                      <td className="p-3">
                        {item.referralDetails?.isReferred ? (
                          <span className="text-[11px] font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                            Referred ({item.referralDetails.urgency})
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-400">Home Care</span>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        <Link
                          to={`/worker/patient/${item.patientId}`}
                          className="inline-flex items-center space-x-1 text-gov-navy hover:text-gov-saffron font-bold text-xs"
                        >
                          <span>{t('viewDetails')}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
