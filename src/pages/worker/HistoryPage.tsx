import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { usePatients } from '../../context/PatientContext';
import { AppHeader } from '../../components/layout/AppHeader';
import { AppSidebar } from '../../components/layout/AppSidebar';
import { TriageBadge } from '../../components/common/TriageBadge';
import { Clock, Search, Filter, ChevronRight, FileText } from 'lucide-react';
import type { TriageLevel } from '../../types';

export const HistoryPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { assessments } = usePatients();
  const isHindi = language === 'hi';

  const [triageFilter, setTriageFilter] = useState<'ALL' | TriageLevel>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = assessments.filter(a => {
    const matchesFilter = triageFilter === 'ALL' || a.triageLevel === triageFilter;
    const matchesSearch =
      a.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.patientVillage.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <AppHeader pageTitle={isHindi ? 'मरीज इतिहास व दीर्घकालिक रिकॉर्ड' : 'Longitudinal Patient Assessment History'} />

      <div className="flex-1 flex overflow-hidden">
        <AppSidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h1 className="text-2xl font-black text-gov-navy flex items-center gap-2">
                <Clock className="w-6 h-6 text-gov-saffron" />
                <span>{isHindi ? 'मरीज इतिहास एवं दीर्घकालिक स्वास्थ्य रिकॉर्ड' : 'Longitudinal Clinical History'}</span>
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Chronological audit trail of all field assessments and triage decisions
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 text-xs">
              <button
                onClick={() => setTriageFilter('ALL')}
                className={`px-3 py-1.5 rounded-lg font-bold ${triageFilter === 'ALL' ? 'bg-gov-navy text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                All ({assessments.length})
              </button>
              <button
                onClick={() => setTriageFilter('RED')}
                className={`px-3 py-1.5 rounded-lg font-bold ${triageFilter === 'RED' ? 'bg-red-600 text-white' : 'bg-red-50 text-red-800'}`}
              >
                Urgent
              </button>
              <button
                onClick={() => setTriageFilter('AMBER')}
                className={`px-3 py-1.5 rounded-lg font-bold ${triageFilter === 'AMBER' ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-800'}`}
              >
                Needs Eval
              </button>
              <button
                onClick={() => setTriageFilter('GREEN')}
                className={`px-3 py-1.5 rounded-lg font-bold ${triageFilter === 'GREEN' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-800'}`}
              >
                Lower Priority
              </button>
            </div>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Patient ID, Name, or Village..."
              className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-xl focus:ring-1 focus:ring-gov-navy bg-white"
            />
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                  <th className="p-3">Assessment ID / Date</th>
                  <th className="p-3">Patient Details</th>
                  <th className="p-3">Symptoms Recorded</th>
                  <th className="p-3">Vitals Baseline</th>
                  <th className="p-3">Triage Priority</th>
                  <th className="p-3">Referral Facility</th>
                  <th className="p-3 text-right">EHR Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3">
                      <div className="font-mono font-bold text-slate-900">{item.id}</div>
                      <div className="text-[11px] text-slate-500">{item.date}, {item.timestamp}</div>
                    </td>
                    <td className="p-3">
                      <div className="font-bold text-slate-900">{item.patientName}</div>
                      <div className="text-[11px] text-slate-500">{item.patientVillage} ({item.patientAge} Yrs / {item.patientGender})</div>
                    </td>
                    <td className="p-3">
                      <span className="font-medium text-slate-800">
                        {item.symptoms.map(s => s.name).join(', ')}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-[11px] text-slate-700">
                      T: {item.vitals.temperature || '--'}°F | SpO2: {item.vitals.spo2 || '--'}%
                    </td>
                    <td className="p-3">
                      <TriageBadge level={item.triageLevel} size="sm" />
                    </td>
                    <td className="p-3 text-slate-600">
                      {item.referralDetails?.isReferred ? (
                        <span className="font-bold text-blue-900 text-[11px]">
                          {item.referralDetails.facilityName}
                        </span>
                      ) : (
                        <span className="text-slate-400">Home Care</span>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      <Link
                        to={`/worker/patient/${item.patientId}`}
                        className="inline-flex items-center space-x-1 text-gov-navy font-bold hover:underline"
                      >
                        <span>View EHR</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};
