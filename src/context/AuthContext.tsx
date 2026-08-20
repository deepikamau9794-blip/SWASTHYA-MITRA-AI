import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserProfile, UserRole } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  isAuthenticated: boolean;
  loginAsRole: (role: UserRole, details?: Partial<UserProfile>) => void;
  loginWithAbha: (abhaId: string) => boolean;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const DEFAULT_WORKER: UserProfile = {
  id: "USR-ASHA-08821",
  name: "Sunita Maurya",
  role: "WORKER",
  phone: "+91 98390 12345",
  designation: "Senior ASHA Worker",
  assignedFacility: "PHC Sadar, Pratapgarh",
  village: "Purey Pandey, Block Pratapgarh Sadar",
  badgeNumber: "ASHA-UP-PRT-8821"
};

const DEFAULT_DOCTOR: UserProfile = {
  id: "USR-DOC-04412",
  name: "Dr. Arvind Shrivastava, MD",
  role: "DOCTOR",
  phone: "+91 94150 99881",
  email: "dr.arvind.pratapgarh@gov.in",
  designation: "Medical Officer / In-Charge",
  assignedFacility: "CHC Sandwa Chandrika & AIIMS Tele-Hub",
  badgeNumber: "UPMC-67219-MCI"
};

const DEFAULT_ADMIN: UserProfile = {
  id: "USR-ADM-00109",
  name: "Rajeev Ranjan Pandey, IAS",
  role: "ADMIN",
  phone: "+91 94511 00021",
  email: "cmo.pratapgarh@nic.in",
  designation: "Chief Medical Officer (CMO) Office",
  assignedFacility: "District Health Society Pratapgarh",
  badgeNumber: "NHM-UP-DIST-01"
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('swasthyamitra_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_WORKER;
      }
    }
    return DEFAULT_WORKER; // Pre-authenticated for quick exploration, or user can switch/logout
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('swasthyamitra_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('swasthyamitra_user');
    }
  }, [user]);

  const loginAsRole = (role: UserRole, details?: Partial<UserProfile>) => {
    let base: UserProfile;
    if (role === 'WORKER') base = { ...DEFAULT_WORKER };
    else if (role === 'DOCTOR') base = { ...DEFAULT_DOCTOR };
    else base = { ...DEFAULT_ADMIN };

    if (details) {
      base = { ...base, ...details };
    }
    setUser(base);
  };

  const loginWithAbha = (abhaId: string): boolean => {
    // ABHA format validation simulation: XX-XXXX-XXXX-XXXX or 14 digits
    const cleaned = abhaId.replace(/[^0-9]/g, '');
    if (cleaned.length >= 10) {
      setUser({
        ...DEFAULT_WORKER,
        name: "Sunita Maurya (ABHA Linked)",
        badgeNumber: `ABHA-${cleaned.slice(-4)}`
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (newRole: UserRole) => {
    loginAsRole(newRole);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || 'WORKER',
        isAuthenticated: !!user,
        loginAsRole,
        loginWithAbha,
        logout,
        switchRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
