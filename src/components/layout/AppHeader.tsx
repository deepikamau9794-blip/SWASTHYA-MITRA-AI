import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useSync } from '../../context/SyncContext';
import { usePatients } from '../../context/PatientContext';
import {
  Wifi,
  WifiOff,
  Bell,
  User,
  LogOut,
  RefreshCw,
  Sparkles,
  Shield,
  ChevronDown,
  Building2,
  Stethoscope,
  Users
} from 'lucide-react';

export const AppHeader: React.FC<{ pageTitle?: string }> = ({ pageTitle }) => {
  const { user, role, logout, switchRole } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const { isOffline, toggleOfflineMode, pendingSyncCount, isSyncing, syncNow, syncMessage } = useSync();
  const { reminders, loadDemoPersona } = usePatients();
  const navigate = useNavigate();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [demoMenuOpen, setDemoMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const activeReminders = reminders.filter(r => !r.completed);

  const handleDemoSelect = (personaKey: 'red' | 'amber' | 'green') => {
    const { patient } = loadDemoPersona(personaKey);
    setDemoMenuOpen(false);
    navigate(`/worker/assessment?patientId=${patient.id}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs select-none">
      {/* Tricolor accent bar */}
      <div className="tricolor-strip" />

      {/* Sync toast notification if any */}
      {syncMessage && (
        <div className="bg-amber-500 text-slate-950 text-xs font-semibold py-1 px-4 text-center transition-all animate-fade-in shadow-xs flex items-center justify-center gap-2">
          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{syncMessage}</span>
        </div>
      )}

      <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Left: Brand / Logo + Breadcrumb Title */}
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gov-navy rounded-md flex items-center justify-center text-white font-bold text-sm shadow-xs border border-gov-saffron">
              SM
            </div>
            <span className="font-extrabold text-gov-navy text-base hidden sm:inline tracking-tight">
              Swasthya Mitra <span className="text-gov-saffron font-bold text-sm">AI</span>
            </span>
          </Link>

          {pageTitle && (
            <>
              <span className="text-slate-300 hidden md:inline">/</span>
              <span className="text-sm font-bold text-slate-700 hidden md:inline truncate max-w-[240px]">
                {pageTitle}
              </span>
            </>
          )}
        </div>

        {/* Right: Controls & Profile */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Interactive Demo Persona Launcher */}
          <div className="relative">
            <button
              onClick={() => setDemoMenuOpen(!demoMenuOpen)}
              className="hidden sm:flex items-center space-x-1.5 bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-bold px-2.5 py-1.5 rounded-lg border border-purple-200 transition-colors shadow-2xs"
              title="Quickly test with pre-built SIH demo personas"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
              <span>Demo Persona</span>
              <ChevronDown className="w-3 h-3 text-purple-500" />
            </button>

            {demoMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-1.5 border-b border-slate-100">
                  <div className="text-xs font-bold text-slate-800">Select SIH Demo Case:</div>
                  <div className="text-[11px] text-slate-500">Loads instant clinical dataset</div>
                </div>
                <button
                  onClick={() => handleDemoSelect('red')}
                  className="w-full text-left px-3 py-2 hover:bg-red-50 flex items-start space-x-2 transition-colors"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-red-900">Baby Aarav (Red - Urgent)</div>
                    <div className="text-[11px] text-slate-600">Pneumonia, chest indrawing, high fever 103.2°F</div>
                  </div>
                </button>
                <button
                  onClick={() => handleDemoSelect('amber')}
                  className="w-full text-left px-3 py-2 hover:bg-amber-50 flex items-start space-x-2 transition-colors"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-amber-900">Ramesh Devi (Amber - Needs Eval)</div>
                    <div className="text-[11px] text-slate-600">4-day fever, diabetic, vector-borne screen</div>
                  </div>
                </button>
                <button
                  onClick={() => handleDemoSelect('green')}
                  className="w-full text-left px-3 py-2 hover:bg-emerald-50 flex items-start space-x-2 transition-colors"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-emerald-900">Sunita Patel (Green - Low Priority)</div>
                    <div className="text-[11px] text-slate-600">Mild seasonal coryza, normal vitals</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Online / Offline Sync Pill */}
          <div className="flex items-center">
            <button
              onClick={toggleOfflineMode}
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all shadow-2xs border ${
                isOffline
                  ? 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200'
                  : 'bg-emerald-100 text-emerald-900 border-emerald-300 hover:bg-emerald-200'
              }`}
              title="Click to toggle Online/Offline simulation"
            >
              {isOffline ? (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-700" />
                  <span>OFFLINE</span>
                </>
              ) : (
                <>
                  <Wifi className="w-3.5 h-3.5 text-emerald-700" />
                  <span className="hidden sm:inline">ONLINE</span>
                </>
              )}
            </button>

            {/* Sync Now Action */}
            {!isOffline && pendingSyncCount > 0 && (
              <button
                onClick={() => syncNow()}
                disabled={isSyncing}
                className="ml-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1 transition-all shadow-xs"
                title="Sync pending records"
              >
                <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>Sync ({pendingSyncCount})</span>
              </button>
            )}
          </div>

          {/* Language Toggle Button */}
          <button
            onClick={toggleLanguage}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-2 py-1 rounded-md border border-slate-300 transition-colors"
          >
            {language === 'hi' ? 'EN' : 'हिन्दी'}
          </button>

          {/* Notifications / Reminders Bell */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg relative transition-colors"
              title="View today's health worker reminders"
            >
              <Bell className="w-4 h-4" />
              {activeReminders.length > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-600 text-white text-[9px] font-extrabold rounded-full flex items-center justify-center">
                  {activeReminders.length}
                </span>
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">
                    {language === 'hi' ? 'आज के आवश्यक रिमाइंडर' : "Today's Field Reminders"}
                  </span>
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-semibold">
                    {activeReminders.length} Due
                  </span>
                </div>
                <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                  {activeReminders.map(rem => (
                    <div key={rem.id} className="p-2.5 hover:bg-slate-50 text-xs">
                      <div className="font-bold text-slate-800">
                        {language === 'hi' ? rem.titleHi : rem.title}
                      </div>
                      <div className="text-slate-500 text-[11px] flex justify-between mt-1">
                        <span>{rem.patientName}</span>
                        <span className="text-amber-700 font-semibold">{rem.dueDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Dropdown & Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 py-1 px-2.5 rounded-lg border border-slate-300 transition-colors text-xs font-semibold"
            >
              <div className="w-5 h-5 bg-gov-navy text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                {user?.name.charAt(0) || 'U'}
              </div>
              <span className="hidden md:inline max-w-[100px] truncate">{user?.name}</span>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-2 border-b border-slate-100">
                  <div className="text-xs font-bold text-slate-900">{user?.name}</div>
                  <div className="text-[11px] text-slate-500">{user?.designation}</div>
                  <div className="text-[10px] text-emerald-700 font-semibold mt-0.5 flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    <span>{user?.badgeNumber}</span>
                  </div>
                </div>

                {/* Role Switcher for Hackathon Testing */}
                <div className="px-3 py-2 border-b border-slate-100">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Switch Role (Demo):
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <button
                      onClick={() => { switchRole('WORKER'); setProfileDropdownOpen(false); navigate('/worker/dashboard'); }}
                      className={`text-[11px] py-1 px-1.5 rounded font-bold transition-colors ${role === 'WORKER' ? 'bg-gov-navy text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                    >
                      ASHA
                    </button>
                    <button
                      onClick={() => { switchRole('DOCTOR'); setProfileDropdownOpen(false); navigate('/doctor/dashboard'); }}
                      className={`text-[11px] py-1 px-1.5 rounded font-bold transition-colors ${role === 'DOCTOR' ? 'bg-gov-navy text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                    >
                      Doctor
                    </button>
                    <button
                      onClick={() => { switchRole('ADMIN'); setProfileDropdownOpen(false); navigate('/admin/dashboard'); }}
                      className={`text-[11px] py-1 px-1.5 rounded font-bold transition-colors ${role === 'ADMIN' ? 'bg-gov-navy text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                    >
                      Admin
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center space-x-2 font-semibold transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{language === 'hi' ? 'लॉगआउट करें' : 'Log Out'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
