import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { usePatients } from '../../context/PatientContext';
import { AppHeader } from '../../components/layout/AppHeader';
import { AppSidebar } from '../../components/layout/AppSidebar';
import { ABHABadge } from '../../components/common/ABHABadge';
import { TriageBadge } from '../../components/common/TriageBadge';
import { Users, UserPlus, Search, Stethoscope, ChevronRight } from 'lucide-react';

export const PatientsListPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { patients } = usePatients();
  const isHindi = language === 'hi';
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.village.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.abhaId && p.abhaId.includes(searchQuery))
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <AppHeader pageTitle={isHindi ? 'मरीज सूची व रिकॉर्ड्स' : 'Patient Registry & EHRs'} />

      <div className="flex-1 flex overflow-hidden">
        <AppSidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h1 className="text-2xl font-black text-gov-navy flex items-center gap-2">
                <Users className="w-6 h-6 text-gov-saffron" />
                <span>{isHindi ? 'पंजीकृत ग्रामीण मरीज सूची' : 'Rural Patient Registry'}</span>
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                {isHindi ? `कुल पंजीकृत: ${patients.length} मरीज` : `Total Cohort: ${patients.length} registered patients`}
              </p>
            </div>

            <Link
              to="/worker/new-patient"
              className="bg-gov-saffron hover:bg-amber-500 text-slate-950 px-4 py-2.5 rounded-xl font-bold text-xs shadow-sm flex items-center space-x-1.5 transition-all"
            >
              <UserPlus className="w-4 h-4" />
              <span>{t('actionNewPatient')}</span>
            </Link>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Name, Patient ID (RH-2026-XXXXX), Village, or ABHA ID..."
              className="w-full pl-9 pr-4 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-1 focus:ring-gov-navy focus:outline-none bg-white shadow-2xs"
            />
          </div>

          {/* Patient Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:shadow-md hover:border-gov-navy transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-mono text-[11px] font-bold text-slate-500 block">
                        {patient.id}
                      </span>
                      <h3 className="text-sm font-extrabold text-slate-900 leading-tight">
                        {patient.name}
                      </h3>
                    </div>
                    {patient.lastTriageLevel && (
                      <TriageBadge level={patient.lastTriageLevel} size="sm" />
                    )}
                  </div>

                  <div className="text-xs text-slate-600 space-y-1">
                    <div>
                      <span className="text-slate-400 font-semibold">Age / Gender:</span>{' '}
                      <strong>{patient.age} Yrs / {patient.gender}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold">Village:</span>{' '}
                      <strong>{patient.village}</strong>
                    </div>
                    <div className="pt-1">
                      <ABHABadge abhaId={patient.abhaId} size="sm" />
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs gap-2">
                  <Link
                    to={`/worker/patient/${patient.id}`}
                    className="text-slate-700 hover:text-gov-navy font-bold py-1 px-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                  >
                    View History
                  </Link>
                  <Link
                    to={`/worker/assessment?patientId=${patient.id}`}
                    className="bg-gov-navy hover:bg-gov-navyDark text-white font-bold py-1.5 px-3 rounded-lg flex items-center space-x-1 transition-all shadow-2xs"
                  >
                    <Stethoscope className="w-3.5 h-3.5 text-gov-saffron" />
                    <span>New Assessment</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};
