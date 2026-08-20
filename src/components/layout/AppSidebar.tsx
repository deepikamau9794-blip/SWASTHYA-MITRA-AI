import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useSync } from '../../context/SyncContext';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Stethoscope,
  Clock,
  Send,
  Video,
  MapPin,
  RefreshCw,
  FileText,
  Building2,
  BellRing,
  BarChart3,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const AppSidebar: React.FC = () => {
  const { role, user } = useAuth();
  const { language, t } = useLanguage();
  const { pendingSyncCount, isOffline } = useSync();

  // Navigation Items per Role
  const workerNav = [
    { to: '/worker/dashboard', icon: LayoutDashboard, label: language === 'hi' ? 'डैशबोर्ड' : 'Dashboard' },
    { to: '/worker/patients', icon: Users, label: language === 'hi' ? 'मरीज सूची' : 'Patients List' },
    { to: '/worker/new-patient', icon: UserPlus, label: language === 'hi' ? 'नया मरीज जोड़ें' : '+ New Patient' },
    { to: '/worker/assessment', icon: Stethoscope, label: language === 'hi' ? 'स्वास्थ्य जांच शुरू करें' : 'Start Assessment' },
    { to: '/worker/history', icon: Clock, label: language === 'hi' ? 'मरीज इतिहास' : 'Patient History' },
    { to: '/worker/followups', icon: RefreshCw, label: language === 'hi' ? 'फॉलो-अप्स' : 'Follow-ups' },
    { to: '/worker/referrals', icon: Send, label: language === 'hi' ? 'रेफरल पर्ची' : 'Referrals' },
    { to: '/worker/teleconsult', icon: Video, label: language === 'hi' ? 'टेलीकंसल्टेशन' : 'Teleconsultation' },
    { to: '/worker/facilities', icon: MapPin, label: language === 'hi' ? 'स्वास्थ्य केंद्र खोजें' : 'Nearby Facilities' },
    { to: '/worker/sync', icon: RefreshCw, label: language === 'hi' ? 'सिंक केंद्र' : 'Sync Center', badge: pendingSyncCount > 0 ? `${pendingSyncCount}` : undefined },
  ];

  const doctorNav = [
    { to: '/doctor/dashboard', icon: LayoutDashboard, label: language === 'hi' ? 'डॉक्टर डैशबोर्ड' : 'Dashboard' },
    { to: '/doctor/referrals', icon: Send, label: language === 'hi' ? 'रेफरल कतार (Urgent)' : 'Referral Queue', badge: 'Active' },
    { to: '/doctor/teleconsult', icon: Video, label: language === 'hi' ? 'टेलीकंसल्टेशन कतार' : 'Teleconsult Queue' },
    { to: '/doctor/patients', icon: Users, label: language === 'hi' ? 'मरीज रिकॉर्ड्स' : 'Patient EHRs' },
    { to: '/doctor/notes', icon: FileText, label: language === 'hi' ? 'क्लिनिकल नोट्स' : 'Clinical Notes' },
  ];

  const adminNav = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: language === 'hi' ? 'एडमिन डैशबोर्ड' : 'Dashboard' },
    { to: '/admin/analytics', icon: BarChart3, label: language === 'hi' ? 'स्वास्थ्य विश्लेषण' : 'Analytics & Trends' },
    { to: '/admin/facilities', icon: Building2, label: language === 'hi' ? 'स्वास्थ्य केंद्र प्रबंधन' : 'Facility Directory' },
    { to: '/admin/notices', icon: BellRing, label: language === 'hi' ? 'सूचनाएं व परिपत्र' : 'Notices & Bulletins' },
  ];

  const currentNav = role === 'WORKER' ? workerNav : role === 'DOCTOR' ? doctorNav : adminNav;

  return (
    <aside className="w-64 bg-[#07253B] text-slate-200 flex flex-col flex-shrink-0 min-h-[calc(100vh-60px)] border-r border-slate-800 select-none">
      {/* Role Profile Badge in Sidebar */}
      <div className="p-4 border-b border-slate-800 bg-[#061e30]">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gov-navyLight border border-cyan-500/40 flex items-center justify-center text-white font-bold text-base shadow-sm">
            {role === 'WORKER' ? 'ASHA' : role === 'DOCTOR' ? 'Dr.' : 'ADM'}
          </div>
          <div className="overflow-hidden">
            <div className="text-xs font-bold text-white truncate">{user?.name}</div>
            <div className="text-[11px] text-emerald-400 font-medium truncate">{user?.assignedFacility}</div>
            <div className="text-[10px] text-slate-400 truncate">{user?.badgeNumber}</div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-3 mb-2">
          {role === 'WORKER' ? 'Frontline Worker Portal' : role === 'DOCTOR' ? 'Medical Officer Portal' : 'Health Admin Portal'}
        </div>

        {currentNav.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-gov-saffron text-slate-950 font-bold shadow-md shadow-amber-950/20'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400 group-hover:text-gov-saffron'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-slate-950 text-white' : 'bg-red-600 text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Institutional Info & Connectivity indicator */}
      <div className="p-3 border-t border-slate-800 bg-[#051a2a] text-xs">
        <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
          <span>{language === 'hi' ? 'सिस्टम स्थिति:' : 'System Status:'}</span>
          <span className={isOffline ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold'}>
            {isOffline ? 'Local DB' : 'ABDM Connected'}
          </span>
        </div>
        <div className="text-[10px] text-slate-400 leading-tight">
          RECP Pratapgarh • Swasthya Mitra v1.0
        </div>
      </div>
    </aside>
  );
};
