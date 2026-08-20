import React, { createContext, useContext, useState, useEffect } from 'react';

interface SyncContextType {
  isOffline: boolean;
  toggleOfflineMode: () => void;
  setOfflineMode: (offline: boolean) => void;
  pendingSyncCount: number;
  incrementPendingSync: () => void;
  isSyncing: boolean;
  lastSyncedTimestamp: string;
  syncNow: () => Promise<boolean>;
  syncMessage: string | null;
}

const SyncContext = createContext<SyncContextType | undefined>(undefined);

export const SyncProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOffline, setIsOffline] = useState<boolean>(() => {
    return localStorage.getItem('swasthyamitra_offline') === 'true';
  });

  const [pendingSyncCount, setPendingSyncCount] = useState<number>(() => {
    const saved = localStorage.getItem('swasthyamitra_pending_sync');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [lastSyncedTimestamp, setLastSyncedTimestamp] = useState<string>(() => {
    return localStorage.getItem('swasthyamitra_last_sync') ?? 'Today, 10:30 AM';
  });

  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('swasthyamitra_offline', String(isOffline));
  }, [isOffline]);

  useEffect(() => {
    localStorage.setItem('swasthyamitra_pending_sync', String(pendingSyncCount));
  }, [pendingSyncCount]);

  const toggleOfflineMode = () => {
    setIsOffline(prev => {
      const next = !prev;
      if (next) {
        setSyncMessage("Offline Mode Activated. Assessments will be stored locally in offline database.");
      } else {
        setSyncMessage("Online Connectivity Restored. Ready to synchronize pending field records.");
      }
      setTimeout(() => setSyncMessage(null), 4000);
      return next;
    });
  };

  const setOfflineMode = (offline: boolean) => {
    setIsOffline(offline);
  };

  const incrementPendingSync = () => {
    setPendingSyncCount(prev => prev + 1);
  };

  const syncNow = async (): Promise<boolean> => {
    if (isOffline) {
      setSyncMessage("Cannot sync while in Offline Mode. Switch to Online first.");
      setTimeout(() => setSyncMessage(null), 3000);
      return false;
    }

    setIsSyncing(true);
    setSyncMessage("Syncing patient assessments with Central ABDM Health Stack...");
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const count = pendingSyncCount;
        setPendingSyncCount(0);
        const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const timeStr = `Today, ${now}`;
        setLastSyncedTimestamp(timeStr);
        localStorage.setItem('swasthyamitra_last_sync', timeStr);
        setIsSyncing(false);
        setSyncMessage(`Synchronization Complete! ${count > 0 ? count : 'All'} field records updated.`);
        setTimeout(() => setSyncMessage(null), 4000);
        resolve(true);
      }, 1500);
    });
  };

  return (
    <SyncContext.Provider
      value={{
        isOffline,
        toggleOfflineMode,
        setOfflineMode,
        pendingSyncCount,
        incrementPendingSync,
        isSyncing,
        lastSyncedTimestamp,
        syncNow,
        syncMessage
      }}
    >
      {children}
    </SyncContext.Provider>
  );
};

export const useSync = () => {
  const context = useContext(SyncContext);
  if (!context) {
    throw new Error('useSync must be used within a SyncProvider');
  }
  return context;
};
