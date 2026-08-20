export type TriageLevel = 'GREEN' | 'AMBER' | 'RED';

export type UserRole = 'WORKER' | 'DOCTOR' | 'ADMIN';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  phone: string;
  email?: string;
  designation: string;
  assignedFacility: string;
  village?: string;
  badgeNumber: string;
}

export interface Patient {
  id: string; // format: RH-2026-XXXXX
  name: string;
  age: number;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  phone: string;
  village: string;
  preferredLanguage: 'hi' | 'en';
  abhaId?: string; // 14-digit ABHA ID format: XX-XXXX-XXXX-XXXX
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  allergies: string[];
  currentMedications: string[];
  existingConditions: string[];
  notes?: string;
  registeredAt: string;
  lastAssessmentDate?: string;
  lastTriageLevel?: TriageLevel;
}

export interface SymptomEntry {
  id: string;
  name: string;
  nameHi: string;
  severity: 'mild' | 'moderate' | 'severe';
  durationDays: number;
  isPrimary?: boolean;
}

export interface VitalsData {
  temperature?: number; // in °F
  systolicBP?: number;
  diastolicBP?: number;
  heartRate?: number; // bpm
  spo2?: number; // percentage
  respiratoryRate?: number; // breaths/min
}

export interface SupportiveCareAdvice {
  general: string[];
  generalHi: string[];
  hydration: string[];
  hydrationHi: string[];
  diet: string[];
  dietHi: string[];
  activity: string[];
  activityHi: string[];
  avoid: string[];
  avoidHi: string[];
  warningSigns: string[];
  warningSignsHi: string[];
}

export interface MedicalEvidence {
  guideline: string;
  sourceModule: string;
  ruleTriggered: string;
  confidenceScore: number;
  matchedKeywords: string[];
}

export interface AssessmentRecord {
  id: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  patientGender: 'MALE' | 'FEMALE' | 'OTHER';
  patientVillage: string;
  date: string;
  timestamp: string;
  symptoms: SymptomEntry[];
  vitals: VitalsData;
  generalObservations: string;
  redFlagsIdentified: string[];
  triageLevel: TriageLevel;
  urgencyLabel: string;
  urgencyLabelHi: string;
  rationaleBullets: string[];
  rationaleBulletsHi: string[];
  recommendedAction: string;
  recommendedActionHi: string;
  supportiveCare: SupportiveCareAdvice;
  explainability: MedicalEvidence[];
  referralDetails?: {
    isReferred: boolean;
    suggestedFacilityId: string;
    facilityName: string;
    reason: string;
    urgency: 'ROUTINE' | 'WITHIN_24H' | 'IMMEDIATE';
    transportAdvised: string;
    referredByWorker: string;
    referredAt: string;
    status: 'PENDING_REVIEW' | 'ACCEPTED' | 'ADMITTED' | 'DISCHARGED';
  };
  teleconsult?: {
    requested: boolean;
    status: 'PENDING' | 'CONNECTED' | 'COMPLETED' | 'REJECTED';
    doctorName?: string;
    consultationNotes?: string;
    scheduledAt?: string;
  };
  followUp: {
    needed: boolean;
    dueDate?: string;
    status: 'SCHEDULED' | 'COMPLETED' | 'OVERDUE';
    previousAssessmentId?: string;
    clinicalProgression?: 'IMPROVING' | 'STABLE' | 'DETERIORATING';
    notes?: string;
  };
  syncStatus: 'SYNCED' | 'PENDING_SYNC' | 'LOCAL_OFFLINE';
}

export interface Facility {
  id: string;
  name: string;
  nameHi: string;
  type: 'PHC' | 'CHC' | 'DISTRICT_HOSPITAL' | 'AIIMS_HUB' | 'SUB_CENTRE';
  district: string;
  distanceKm: number;
  address: string;
  addressHi: string;
  phone: string;
  emergencyAvailable24x7: boolean;
  teleconsultLinked: boolean;
  availableBeds: number;
  specialists: string[];
  specialistsHi: string[];
}

export interface NoticeItem {
  id: string;
  title: string;
  titleHi: string;
  date: string;
  category: 'URGENT' | 'CIRCULAR' | 'TRAINING' | 'GENERAL';
  content: string;
  contentHi: string;
  isPinned: boolean;
  department: string;
}

export interface WorkerReminder {
  id: string;
  patientId: string;
  patientName: string;
  village: string;
  title: string;
  titleHi: string;
  category: 'VACCINATION' | 'ANC_CHECKUP' | 'NCD_FOLLOWUP' | 'POST_NATAL' | 'MED_REFILL';
  dueDate: string;
  isOverdue: boolean;
  completed: boolean;
}
