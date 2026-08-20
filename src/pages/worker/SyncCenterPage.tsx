import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useSync } from '../../context/SyncContext';
import { usePatients } from '../../context/PatientContext';
import { AppHeader } from '../../components/layout/AppHeader';
import { AppSidebar } from '../../components/layout/AppSidebar';
import {
  RefreshCw,
  Wifi,
  WifiOff,
  Database,
  CheckCircle2,
  AlertCircle,
  HardDrive,
  CloudUpload,
  Clock
} from 'lucide-react';

export const SyncCenterPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { isOffline, toggleOfflineMode, pendingSyncCount, isSyncing, syncNow, lastSyncedTimestamp, syncMessage } = useSync();
  const { assessments, patients } = usePatients();

  const isHindi = language === 'hi';

  const syncedCount = assessments.filter(a => a.syncStatus === 'SYNCED').length;
  const offlineRecordsCount = assessments.filter(a => a.syncStatus === 'LOCAL_OFFLINE' || a.syncStatus === 'PENDING_SYNC').length;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <AppHeader pageTitle={isHindi ? 'डेटा सिंक केंद्र' : 'Offline Data & Sync Center'} />

      <div className="flex-1 flex overflow-hidden">
        <AppSidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-5xl mx-auto w-full space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h1 className="text-2xl font-black text-gov-navy flex items-center gap-2">
              <RefreshCw className={`w-6 h-6 text-gov-saffron ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{t('syncCenter')}</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Offline-first resilience engine: synchronizes local IndexedDB records with the National Health Stack
            </p>
          </div>

          {/* Sync Status Banner */}
          <div
            className={`p-6 rounded-2xl border flex flex-wrap items-center justify-between gap-4 text-xs ${
              isOffline
                ? 'bg-amber-50 border-amber-300 text-amber-950'
                : 'bg-emerald-50 border-emerald-300 text-emerald-950'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                {isOffline ? <WifiOff className="w-5 h-5 text-amber-700" /> : <Wifi className="w-5 h-5 text-emerald-700" />}
                <h3 className="text-base font-extrabold">
                  {isOffline ? t('offlineStatus') : t('onlineStatus')}
                </h3>
              </div>
              <p className="text-slate-600">
                {isOffline
                  ? 'Device is operating in Zero-Network Field Mode. All triage assessments and patient records are saved locally.'
                  : 'Connected to Central ABDM Gateway. Records automatically synchronize upon transmission.'}
              </p>
              <div className="text-[11px] text-slate-500 font-mono pt-1">
                Last Successful Sync: <strong>{lastSyncedTimestamp}</strong>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={toggleOfflineMode}
                className="bg-white hover:bg-slate-50 text-slate-800 font-bold px-4 py-2 rounded-xl border border-slate-300 shadow-2xs transition-colors"
              >
                {isOffline ? 'Switch to Online Mode' : 'Simulate Offline Mode'}
              </button>

              <button
                onClick={() => syncNow()}
                disabled={isOffline || isSyncing}
                className="bg-gov-navy hover:bg-gov-navyDark disabled:bg-slate-300 text-white font-bold px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center space-x-2"
              >
                <RefreshCw className={`w-4 h-4 text-gov-saffron ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Syncing...' : t('syncNow')}</span>
              </button>
            </div>
          </div>

          {/* Sync Statistics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span className="font-bold">Total Patient Records</span>
                <HardDrive className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">{patients.length}</div>
              <div className="text-[11px] text-slate-400">Locally Cached</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-emerald-700 text-xs">
                <span className="font-bold">Synchronized EHRs</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-emerald-700">{syncedCount}</div>
              <div className="text-[11px] text-slate-400">Verified in ABDM Cloud</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-amber-200 bg-amber-50/40 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-amber-800 text-xs">
                <span className="font-bold">Pending Field Sync</span>
                <CloudUpload className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-2xl font-black text-amber-800">{pendingSyncCount}</div>
              <div className="text-[11px] text-amber-700 font-semibold">Queued for upload</div>
            </div>
          </div>

          {/* Technical Note on PWA & Prototype */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-2 text-xs">
            <div className="text-gov-saffron font-bold uppercase tracking-wider text-[11px]">
              Prototype Synchronization Architecture
            </div>
            <p className="text-slate-300 leading-relaxed">
              BharatGen Health AI utilizes local storage caching paired with service workers to support seamless offline field work by ASHA/ANM workers. In full production deployment, background sync triggers automatically when network telemetry detects a 4G/Wi-Fi connection.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};
