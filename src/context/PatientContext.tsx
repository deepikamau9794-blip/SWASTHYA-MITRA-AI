import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Patient, AssessmentRecord, WorkerReminder, Facility, NoticeItem, TriageLevel } from '../types';
import { mockPatients, mockInitialAssessments } from '../data/mockPatients';
import { mockFacilities } from '../data/mockFacilities';
import { mockNotices, mockReminders } from '../data/mockNotices';

interface PatientContextType {
  patients: Patient[];
  assessments: AssessmentRecord[];
  reminders: WorkerReminder[];
  facilities: Facility[];
  notices: NoticeItem[];
  addPatient: (patient: Omit<Patient, 'id' | 'registeredAt'>) => Patient;
  getPatientById: (id: string) => Patient | undefined;
  getAssessmentsForPatient: (patientId: string) => AssessmentRecord[];
  getAssessmentById: (assessmentId: string) => AssessmentRecord | undefined;
  addAssessment: (assessment: Omit<AssessmentRecord, 'id' | 'timestamp'>) => AssessmentRecord;
  updateAssessment: (id: string, updates: Partial<AssessmentRecord>) => void;
  updateReferralStatus: (assessmentId: string, status: AssessmentRecord['referralDetails']['status']) => void;
  updateTeleconsult: (assessmentId: string, status: 'PENDING' | 'CONNECTED' | 'COMPLETED', doctorNotes?: string) => void;
  completeReminder: (reminderId: string) => void;
  addFacility: (facility: Omit<Facility, 'id'>) => Facility;
  updateFacility: (id: string, updates: Partial<Facility>) => void;
  addNotice: (notice: Omit<NoticeItem, 'id' | 'date'>) => NoticeItem;
  toggleNoticePin: (noticeId: string) => void;
  resetToDemoData: () => void;
  loadDemoPersona: (personaKey: 'red' | 'amber' | 'green') => { patient: Patient; assessment?: AssessmentRecord };
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export const PatientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [patients, setPatients] = useState<Patient[]>(() => {
    const saved = localStorage.getItem('swasthyamitra_patients');
    return saved ? JSON.parse(saved) : mockPatients;
  });

  const [assessments, setAssessments] = useState<AssessmentRecord[]>(() => {
    const saved = localStorage.getItem('swasthyamitra_assessments');
    return saved ? JSON.parse(saved) : mockInitialAssessments;
  });

  const [reminders, setReminders] = useState<WorkerReminder[]>(() => {
    const saved = localStorage.getItem('swasthyamitra_reminders');
    return saved ? JSON.parse(saved) : mockReminders;
  });

  const [facilities, setFacilities] = useState<Facility[]>(() => {
    const saved = localStorage.getItem('swasthyamitra_facilities');
    return saved ? JSON.parse(saved) : mockFacilities;
  });

  const [notices, setNotices] = useState<NoticeItem[]>(() => {
    const saved = localStorage.getItem('swasthyamitra_notices');
    return saved ? JSON.parse(saved) : mockNotices;
  });

  useEffect(() => {
    localStorage.setItem('swasthyamitra_patients', JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem('swasthyamitra_assessments', JSON.stringify(assessments));
  }, [assessments]);

  useEffect(() => {
    localStorage.setItem('swasthyamitra_reminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem('swasthyamitra_facilities', JSON.stringify(facilities));
  }, [facilities]);

  useEffect(() => {
    localStorage.setItem('swasthyamitra_notices', JSON.stringify(notices));
  }, [notices]);

  const addPatient = (patientData: Omit<Patient, 'id' | 'registeredAt'>): Patient => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newId = `RH-2026-${randomNum}`;
    const today = new Date().toISOString().split('T')[0];

    const newPatient: Patient = {
      ...patientData,
      id: newId,
      registeredAt: today
    };

    setPatients(prev => [newPatient, ...prev]);
    return newPatient;
  };

  const getPatientById = (id: string) => patients.find(p => p.id === id);

  const getAssessmentsForPatient = (patientId: string) => 
    assessments.filter(a => a.patientId === patientId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const getAssessmentById = (assessmentId: string) => 
    assessments.find(a => a.id === assessmentId);

  const addAssessment = (assessmentData: Omit<AssessmentRecord, 'id' | 'timestamp'>): AssessmentRecord => {
    const newId = `ASS-2026-${Date.now().toString().slice(-6)}`;
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newAssessment: AssessmentRecord = {
      ...assessmentData,
      id: newId,
      timestamp: nowTime
    };

    setAssessments(prev => [newAssessment, ...prev]);

    // Update patient's last assessment info
    setPatients(prev => prev.map(p => {
      if (p.id === assessmentData.patientId) {
        return {
          ...p,
          lastAssessmentDate: assessmentData.date,
          lastTriageLevel: assessmentData.triageLevel
        };
      }
      return p;
    }));

    return newAssessment;
  };

  const updateAssessment = (id: string, updates: Partial<AssessmentRecord>) => {
    setAssessments(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
  };

  const updateReferralStatus = (assessmentId: string, status: AssessmentRecord['referralDetails']['status']) => {
    setAssessments(prev => prev.map(a => {
      if (a.id === assessmentId && a.referralDetails) {
        return {
          ...a,
          referralDetails: {
            ...a.referralDetails,
            status
          }
        };
      }
      return a;
    }));
  };

  const updateTeleconsult = (assessmentId: string, status: 'PENDING' | 'CONNECTED' | 'COMPLETED', doctorNotes?: string) => {
    setAssessments(prev => prev.map(a => {
      if (a.id === assessmentId && a.teleconsult) {
        return {
          ...a,
          teleconsult: {
            ...a.teleconsult,
            status,
            consultationNotes: doctorNotes || a.teleconsult.consultationNotes
          }
        };
      }
      return a;
    }));
  };

  const completeReminder = (reminderId: string) => {
    setReminders(prev => prev.map(r => r.id === reminderId ? { ...r, completed: true } : r));
  };

  const addFacility = (facData: Omit<Facility, 'id'>): Facility => {
    const newId = `FAC-PRATAP-${Date.now().toString().slice(-3)}`;
    const newFacility: Facility = {
      ...facData,
      id: newId
    };
    setFacilities(prev => [...prev, newFacility]);
    return newFacility;
  };

  const updateFacility = (id: string, updates: Partial<Facility>) => {
    setFacilities(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const addNotice = (noticeData: Omit<NoticeItem, 'id' | 'date'>): NoticeItem => {
    const newId = `NOT-2026-${Date.now().toString().slice(-4)}`;
    const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const newNotice: NoticeItem = {
      ...noticeData,
      id: newId,
      date: today
    };
    setNotices(prev => [newNotice, ...prev]);
    return newNotice;
  };

  const toggleNoticePin = (noticeId: string) => {
    setNotices(prev => prev.map(n => n.id === noticeId ? { ...n, isPinned: !n.isPinned } : n));
  };

  const resetToDemoData = () => {
    setPatients(mockPatients);
    setAssessments(mockInitialAssessments);
    setReminders(mockReminders);
    setFacilities(mockFacilities);
    setNotices(mockNotices);
    localStorage.removeItem('swasthyamitra_patients');
    localStorage.removeItem('swasthyamitra_assessments');
    localStorage.removeItem('swasthyamitra_reminders');
    localStorage.removeItem('swasthyamitra_facilities');
    localStorage.removeItem('swasthyamitra_notices');
  };

  const loadDemoPersona = (personaKey: 'red' | 'amber' | 'green') => {
    let patientId = 'RH-2026-00102'; // Baby Aarav (RED)
    if (personaKey === 'amber') patientId = 'RH-2026-00089'; // Ramesh Devi (AMBER)
    if (personaKey === 'green') patientId = 'RH-2026-00144'; // Sunita Patel (GREEN)

    const patient = patients.find(p => p.id === patientId) || mockPatients[0];
    const assessment = assessments.find(a => a.patientId === patientId);
    return { patient, assessment };
  };

  return (
    <PatientContext.Provider
      value={{
        patients,
        assessments,
        reminders,
        facilities,
        notices,
        addPatient,
        getPatientById,
        getAssessmentsForPatient,
        getAssessmentById,
        addAssessment,
        updateAssessment,
        updateReferralStatus,
        updateTeleconsult,
        completeReminder,
        addFacility,
        updateFacility,
        addNotice,
        toggleNoticePin,
        resetToDemoData,
        loadDemoPersona
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};

export const usePatients = () => {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error('usePatients must be used within a PatientProvider');
  }
  return context;
};
