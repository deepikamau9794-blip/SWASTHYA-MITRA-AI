import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { usePatients } from '../../context/PatientContext';
import { AppHeader } from '../../components/layout/AppHeader';
import { AppSidebar } from '../../components/layout/AppSidebar';
import {
  BarChart3,
  Building2,
  Bell,
  Users,
  Stethoscope,
  Send,
  Plus,
  Pin,
  CheckCircle2,
  Trash2,
  Edit3,
  ShieldCheck,
  TrendingUp,
  MapPin
} from 'lucide-react';
import type { Facility, NoticeItem } from '../../types';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { language, t } = useLanguage();
  const { facilities, notices, patients, assessments, addFacility, addNotice, toggleNoticePin } = usePatients();

  const isHindi = language === 'hi';

  const [activeTab, setActiveTab] = useState<'ANALYTICS' | 'FACILITIES' | 'NOTICES'>('ANALYTICS');

  // Form states for adding a facility
  const [newFacName, setNewFacName] = useState('');
  const [newFacType, setNewFacType] = useState<Facility['type']>('PHC');
  const [newFacAddress, setNewFacAddress] = useState('');
  const [newFacDist, setNewFacDist] = useState(5.0);
  const [newFacBeds, setNewFacBeds] = useState(10);
  const [facSuccess, setFacSuccess] = useState(false);

  // Form states for adding a notice
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeCategory, setNewNoticeCategory] = useState<NoticeItem['category']>('CIRCULAR');
  const [newNoticeContent, setNewNoticeContent] = useState('');
  const [noticeSuccess, setNoticeSuccess] = useState(false);

  const totalScreenings = assessments.length;
  const redCount = assessments.filter(a => a.triageLevel === 'RED').length;
  const amberCount = assessments.filter(a => a.triageLevel === 'AMBER').length;
  const greenCount = assessments.filter(a => a.triageLevel === 'GREEN').length;

  const redPct = totalScreenings > 0 ? ((redCount / totalScreenings) * 100).toFixed(1) : '0';
  const amberPct = totalScreenings > 0 ? ((amberCount / totalScreenings) * 100).toFixed(1) : '0';
  const greenPct = totalScreenings > 0 ? ((greenCount / totalScreenings) * 100).toFixed(1) : '0';

  const handleAddFacility = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFacName && newFacAddress) {
      addFacility({
        name: newFacName,
        nameHi: newFacName,
        type: newFacType,
        district: 'Pratapgarh, UP',
        distanceKm: Number(newFacDist),
        address: newFacAddress,
        addressHi: newFacAddress,
        phone: '05342-220000',
        emergencyAvailable24x7: true,
        teleconsultLinked: true,
        availableBeds: Number(newFacBeds),
        specialists: ['Medical Officer', 'Staff Nurse'],
        specialistsHi: ['चिकित्सा अधिकारी', 'स्टाफ नर्स']
      });
      setNewFacName('');
      setNewFacAddress('');
      setFacSuccess(true);
      setTimeout(() => setFacSuccess(false), 3000);
    }
  };

  const handleAddNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNoticeTitle && newNoticeContent) {
      addNotice({
        title: newNoticeTitle,
        titleHi: newNoticeTitle,
        category: newNoticeCategory,
        content: newNoticeContent,
        contentHi: newNoticeContent,
        isPinned: true,
        department: 'District Health Society Pratapgarh'
      });
      setNewNoticeTitle('');
      setNewNoticeContent('');
      setNoticeSuccess(true);
      setTimeout(() => setNoticeSuccess(false), 3000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <AppHeader pageTitle={isHindi ? 'जिला स्वास्थ्य प्रशासन पोर्टल' : 'District Health Administration & Analytics'} />

      <div className="flex-1 flex overflow-hidden">
        <AppSidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full space-y-6">
          {/* Admin Banner */}
          <div className="bg-gradient-to-r from-[#0B3C5D] via-[#07253B] to-[#14537D] text-white p-6 rounded-2xl shadow-md flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs text-gov-saffron font-bold uppercase tracking-wider">
                {user?.designation} • Pratapgarh District
              </div>
              <h1 className="text-xl sm:text-2xl font-black">
                {t('adminDashboardTitle')}
              </h1>
              <p className="text-xs text-slate-300">
                Aggregated epidemiological surveillance, facility network management, and public notices
              </p>
            </div>

            <div className="flex items-center space-x-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-mono text-cyan-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>ABDM Privacy Enforced</span>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center space-x-2 border-b border-slate-200 pb-2 text-xs font-bold">
            <button
              onClick={() => setActiveTab('ANALYTICS')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center space-x-1.5 ${
                activeTab === 'ANALYTICS' ? 'bg-gov-navy text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>District Surveillance & Triage Analytics</span>
            </button>

            <button
              onClick={() => setActiveTab('FACILITIES')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center space-x-1.5 ${
                activeTab === 'FACILITIES' ? 'bg-gov-navy text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Facility Directory Management ({facilities.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('NOTICES')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center space-x-1.5 ${
                activeTab === 'NOTICES' ? 'bg-gov-navy text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>Notice Board Publisher ({notices.length})</span>
            </button>
          </div>

          {/* TAB 1: Analytics & Surveillance Charts */}
          {activeTab === 'ANALYTICS' && (
            <div className="space-y-6 animate-fade-in text-xs">
              {/* Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                  <span className="text-slate-500 font-bold block">Onboarded Health Workers</span>
                  <div className="text-2xl font-black text-slate-900">318 ASHAs</div>
                  <div className="text-[11px] text-emerald-700 font-semibold">142 Villages Active</div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                  <span className="text-slate-500 font-bold block">Total Cohort Patients</span>
                  <div className="text-2xl font-black text-slate-900">{patients.length * 128}+</div>
                  <div className="text-[11px] text-slate-400">ABDM Registry</div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                  <span className="text-slate-500 font-bold block">Total Assessments Done</span>
                  <div className="text-2xl font-black text-slate-900">14,890</div>
                  <div className="text-[11px] text-blue-700 font-semibold">+420 this week</div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-red-200 bg-red-50/30 shadow-2xs space-y-1">
                  <span className="text-red-800 font-bold block">Urgent Red Escalations</span>
                  <div className="text-2xl font-black text-red-700">{redCount * 14}</div>
                  <div className="text-[11px] text-red-700 font-semibold">100% Ambulance Linked</div>
                </div>
              </div>

              {/* Triage Distribution Visual Bars */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">
                      Triage Category Distribution (Pratapgarh District)
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Real-time risk stratification of rural primary screenings
                    </p>
                  </div>
                  <span className="text-[11px] font-mono bg-slate-100 px-2 py-0.5 rounded font-bold">
                    Aggregated Population Data
                  </span>
                </div>

                {/* Visual Proportion Bar */}
                <div className="space-y-2">
                  <div className="w-full h-6 rounded-full overflow-hidden flex shadow-inner">
                    <div style={{ width: `${greenPct}%` }} className="bg-emerald-500 h-full transition-all" title="Lower Priority" />
                    <div style={{ width: `${amberPct}%` }} className="bg-amber-500 h-full transition-all" title="Needs Evaluation" />
                    <div style={{ width: `${redPct}%` }} className="bg-red-600 h-full transition-all" title="Urgent" />
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                      <div className="flex items-center space-x-1.5 text-emerald-800 font-bold">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                        <span>Lower Priority (Green)</span>
                      </div>
                      <div className="text-xl font-black text-emerald-950 mt-1">{greenPct}%</div>
                      <div className="text-[10px] text-slate-500">Routine home supportive care</div>
                    </div>

                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                      <div className="flex items-center space-x-1.5 text-amber-800 font-bold">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                        <span>Needs Evaluation (Amber)</span>
                      </div>
                      <div className="text-xl font-black text-amber-950 mt-1">{amberPct}%</div>
                      <div className="text-[10px] text-slate-500">24-hour PHC Doctor OPD review</div>
                    </div>

                    <div className="p-3 bg-red-50 rounded-xl border border-red-200">
                      <div className="flex items-center space-x-1.5 text-red-800 font-bold">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                        <span>Urgent Escalation (Red)</span>
                      </div>
                      <div className="text-xl font-black text-red-950 mt-1">{redPct}%</div>
                      <div className="text-[10px] text-slate-500">Immediate CHC/Ambulance referral</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Village-Level Screening Activity Grid */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                <h3 className="text-sm font-extrabold text-slate-900">
                  Top Active Village Screening Clusters (Pratapgarh Sadar & Sandwa Blocks):
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-900 text-sm">Purey Pandey</span>
                    <div className="text-slate-500">Screenings: <strong>842</strong> | ASHAs: <strong>6</strong></div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">Optimal Coverage</span>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-900 text-sm">Sandwa Chandrika</span>
                    <div className="text-slate-500">Screenings: <strong>1,120</strong> | ASHAs: <strong>9</strong></div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">Monsoon Fever Alert</span>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-900 text-sm">Lalganj Ajhara</span>
                    <div className="text-slate-500">Screenings: <strong>690</strong> | ASHAs: <strong>5</strong></div>
                    <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded font-bold">RMNCH+A Focus</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Facility Directory Management */}
          {activeTab === 'FACILITIES' && (
            <div className="space-y-6 animate-fade-in text-xs">
              {/* Add New Facility Form */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-extrabold text-gov-navy flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    <span>Onboard New Primary / Community Health Facility</span>
                  </h3>
                  {facSuccess && (
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Facility added to directory!</span>
                    </span>
                  )}
                </div>

                <form onSubmit={handleAddFacility} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Facility Name:</label>
                    <input
                      type="text"
                      required
                      value={newFacName}
                      onChange={(e) => setNewFacName(e.target.value)}
                      placeholder="e.g. PHC Mandhata"
                      className="w-full border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-gov-navy"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Facility Type:</label>
                    <select
                      value={newFacType}
                      onChange={(e) => setNewFacType(e.target.value as any)}
                      className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs font-bold"
                    >
                      <option value="PHC">Primary Health Centre (PHC)</option>
                      <option value="CHC">Community Health Centre (CHC)</option>
                      <option value="DISTRICT_HOSPITAL">District Hospital</option>
                      <option value="AIIMS_HUB">AIIMS Referral Hub</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Available Beds:</label>
                    <input
                      type="number"
                      value={newFacBeds}
                      onChange={(e) => setNewFacBeds(Number(e.target.value))}
                      className="w-full border border-slate-300 rounded-xl p-2.5 text-xs font-bold"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-bold text-slate-700 block mb-1">Address & Block:</label>
                    <input
                      type="text"
                      required
                      value={newFacAddress}
                      onChange={(e) => setNewFacAddress(e.target.value)}
                      placeholder="e.g. Block Mandhata, Pratapgarh - 230402"
                      className="w-full border border-slate-300 rounded-xl p-2.5 text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Distance from District HQ (km):</label>
                    <input
                      type="number"
                      step="0.5"
                      value={newFacDist}
                      onChange={(e) => setNewFacDist(Number(e.target.value))}
                      className="w-full border border-slate-300 rounded-xl p-2.5 text-xs font-bold"
                    />
                  </div>

                  <div className="sm:col-span-3 flex justify-end">
                    <button
                      type="submit"
                      className="bg-gov-navy hover:bg-gov-navyDark text-white font-bold px-6 py-2 rounded-xl shadow-md"
                    >
                      + Save Facility to Registry
                    </button>
                  </div>
                </form>
              </div>

              {/* Current Facilities List */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-3">
                <h3 className="font-extrabold text-slate-900 text-sm">Active Registered Facilities ({facilities.length})</h3>
                <div className="divide-y divide-slate-100">
                  {facilities.map((fac) => (
                    <div key={fac.id} className="py-3 flex items-center justify-between text-xs">
                      <div>
                        <strong className="text-slate-900 text-sm block">{fac.name}</strong>
                        <span className="text-slate-500">{fac.address} • {fac.type} • {fac.availableBeds} Beds</span>
                      </div>
                      <span className="font-mono text-slate-600 font-bold bg-slate-100 px-2 py-0.5 rounded">
                        {fac.distanceKm} km
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Notices & Bulletin Manager */}
          {activeTab === 'NOTICES' && (
            <div className="space-y-6 animate-fade-in text-xs">
              {/* Publish New Bulletin Form */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-extrabold text-gov-navy flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    <span>Publish Official Public / Field Worker Notice</span>
                  </h3>
                  {noticeSuccess && (
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Notice published to homepage ticker!</span>
                    </span>
                  )}
                </div>

                <form onSubmit={handleAddNotice} className="space-y-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Notice Headline:</label>
                    <input
                      type="text"
                      required
                      value={newNoticeTitle}
                      onChange={(e) => setNewNoticeTitle(e.target.value)}
                      placeholder="e.g. Special Pediatric Immunization Camp on 28 Aug"
                      className="w-full border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-gov-navy"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Category:</label>
                    <select
                      value={newNoticeCategory}
                      onChange={(e) => setNewNoticeCategory(e.target.value as any)}
                      className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs font-bold"
                    >
                      <option value="URGENT">Urgent Alert</option>
                      <option value="CIRCULAR">Administrative Circular</option>
                      <option value="TRAINING">Training / Webinar</option>
                      <option value="GENERAL">General Notice</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Full Notice Content:</label>
                    <textarea
                      rows={3}
                      required
                      value={newNoticeContent}
                      onChange={(e) => setNewNoticeContent(e.target.value)}
                      placeholder="Enter detailed directives for ASHA/ANM workers..."
                      className="w-full border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-gov-navy"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-gov-navy hover:bg-gov-navyDark text-white font-bold px-6 py-2 rounded-xl shadow-md"
                    >
                      Publish Bulletin
                    </button>
                  </div>
                </form>
              </div>

              {/* Published Notices Table */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-3">
                <h3 className="font-extrabold text-slate-900 text-sm">Published Ticker Notices ({notices.length})</h3>
                <div className="divide-y divide-slate-100">
                  {notices.map((n) => (
                    <div key={n.id} className="py-3 flex items-center justify-between text-xs">
                      <div className="space-y-0.5 max-w-xl">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-slate-900">{n.title}</span>
                          <span className="text-[10px] font-bold bg-blue-50 text-blue-800 px-1.5 py-0.2 rounded">
                            {n.category}
                          </span>
                        </div>
                        <p className="text-slate-500 text-[11px] line-clamp-1">{n.content}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleNoticePin(n.id)}
                          className={`p-1.5 rounded-lg border text-xs ${
                            n.isPinned ? 'bg-amber-50 text-amber-800 border-amber-300 font-bold' : 'text-slate-400 hover:bg-slate-100'
                          }`}
                          title="Pin/Unpin notice on ticker"
                        >
                          <Pin className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
