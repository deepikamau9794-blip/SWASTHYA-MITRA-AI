import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { usePatients } from '../../context/PatientContext';
import { AppHeader } from '../../components/layout/AppHeader';
import { AppSidebar } from '../../components/layout/AppSidebar';
import { FacilityCard } from '../../components/common/FacilityCard';
import { Building2, Search, MapPin, Filter } from 'lucide-react';

export const FacilitiesPage: React.FC = () => {
  const { language } = useLanguage();
  const { facilities } = usePatients();
  const isHindi = language === 'hi';

  const [filterType, setFilterType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = facilities.filter(f => {
    const matchesType = filterType === 'ALL' || f.type === filterType;
    const matchesSearch =
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.specialists.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <AppHeader pageTitle={isHindi ? 'स्वास्थ्य केंद्र निर्देशिका' : 'Pratapgarh Healthcare Facility Directory'} />

      <div className="flex-1 flex overflow-hidden">
        <AppSidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h1 className="text-2xl font-black text-gov-navy flex items-center gap-2">
                <Building2 className="w-6 h-6 text-gov-saffron" />
                <span>{isHindi ? 'संबद्ध स्वास्थ्य केंद्र निर्देशिका' : 'Linked Facility Directory'}</span>
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Directory of Primary Health Centres (PHC), Community Health Centres (CHC), District Hospital, and AIIMS Gorakhpur
              </p>
            </div>

            {/* Type filter */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <button
                onClick={() => setFilterType('ALL')}
                className={`px-3 py-1.5 rounded-lg font-bold ${filterType === 'ALL' ? 'bg-gov-navy text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                All Facilities ({facilities.length})
              </button>
              <button
                onClick={() => setFilterType('PHC')}
                className={`px-3 py-1.5 rounded-lg font-bold ${filterType === 'PHC' ? 'bg-gov-navy text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                PHC
              </button>
              <button
                onClick={() => setFilterType('CHC')}
                className={`px-3 py-1.5 rounded-lg font-bold ${filterType === 'CHC' ? 'bg-gov-navy text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                CHC
              </button>
              <button
                onClick={() => setFilterType('DISTRICT_HOSPITAL')}
                className={`px-3 py-1.5 rounded-lg font-bold ${filterType === 'DISTRICT_HOSPITAL' ? 'bg-gov-navy text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                District Hospital
              </button>
              <button
                onClick={() => setFilterType('AIIMS_HUB')}
                className={`px-3 py-1.5 rounded-lg font-bold ${filterType === 'AIIMS_HUB' ? 'bg-gov-navy text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                AIIMS Super-Hub
              </button>
            </div>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by facility name, block, address, or specialist..."
              className="w-full pl-9 pr-4 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-1 focus:ring-gov-navy bg-white shadow-2xs"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((facility) => (
              <FacilityCard key={facility.id} facility={facility} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};
