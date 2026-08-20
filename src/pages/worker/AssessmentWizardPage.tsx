import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { usePatients } from '../../context/PatientContext';
import { useSync } from '../../context/SyncContext';
import { AppHeader } from '../../components/layout/AppHeader';
import { AppSidebar } from '../../components/layout/AppSidebar';
import { VoiceInputModal } from '../../components/assessment/VoiceInputModal';
import { AIPipelineVisualizer } from '../../components/assessment/AIPipelineVisualizer';
import { TriageResultCard } from '../../components/triage/TriageResultCard';
import { ExplainabilityPanel } from '../../components/triage/ExplainabilityPanel';
import { SupportiveCareGuide } from '../../components/triage/SupportiveCareGuide';
import { ReferralDocument } from '../../components/triage/ReferralDocument';
import { TeleconsultationModal } from '../../components/teleconsult/TeleconsultationModal';
import { evaluateClinicalTriage } from '../../data/medicalKnowledge';
import {
  Stethoscope,
  Mic,
  Plus,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Video,
  FileText,
  Activity,
  HeartPulse,
  Sparkles,
  ShieldCheck,
  Building2,
  Calendar
} from 'lucide-react';
import type { Patient, SymptomEntry, AssessmentRecord, TriageLevel } from '../../types';

export const AssessmentWizardPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { patients, addAssessment, facilities, getPatientById } = usePatients();
  const { isOffline, incrementPendingSync } = useSync();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const isHindi = language === 'hi';

  // Step state (1: Patient -> 2: Symptoms -> 3: Vitals -> 4: AI Visualizer -> 5: Result & Guide -> 6: Referral/Completed)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Step 1: Patient Selection
  const initialPatientId = searchParams.get('patientId') || (patients[0]?.id ?? '');
  const [selectedPatientId, setSelectedPatientId] = useState<string>(initialPatientId);
  const selectedPatient = getPatientById(selectedPatientId) || patients[0];

  // Step 2: Symptoms
  const [symptoms, setSymptoms] = useState<SymptomEntry[]>([
    { id: 'sym-1', name: 'Fever', nameHi: 'तेज़ बुखार', severity: 'moderate', durationDays: 3, isPrimary: true }
  ]);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);

  // Step 3: Vitals & Observations
  const [temperature, setTemperature] = useState<number | ''>(102.4);
  const [spo2, setSpo2] = useState<number | ''>(94);
  const [respiratoryRate, setRespiratoryRate] = useState<number | ''>(32);
  const [heartRate, setHeartRate] = useState<number | ''>(98);
  const [systolicBP, setSystolicBP] = useState<number | ''>(120);
  const [diastolicBP, setDiastolicBP] = useState<number | ''>(80);
  const [generalObservations, setGeneralObservations] = useState(
    'Patient has warm extremities, moderate shivering, and slight fatigue.'
  );

  // Red Flags Checklist
  const [chestIndrawing, setChestIndrawing] = useState(false);
  const [lethargy, setLethargy] = useState(false);
  const [inabilityToDrink, setInabilityToDrink] = useState(false);
  const [convulsions, setConvulsions] = useState(false);

  // Result & Generated Assessment
  const [generatedAssessment, setGeneratedAssessment] = useState<AssessmentRecord | null>(null);
  const [selectedReferralFacilityId, setSelectedReferralFacilityId] = useState('FAC-PRATAP-02');
  const [teleconsultOpen, setTeleconsultOpen] = useState(false);
  const [showSupportiveCareView, setShowSupportiveCareView] = useState(false);

  // Synchronize when query param changes (e.g. from Demo Selector)
  useEffect(() => {
    const pId = searchParams.get('patientId');
    if (pId) {
      setSelectedPatientId(pId);
      const p = getPatientById(pId);
      if (p) {
        if (p.id === 'RH-2026-00102') { // Baby Aarav (Red Case)
          setSymptoms([
            { id: 'sym-1', name: 'High Fever', nameHi: 'तेज़ बुखार', severity: 'severe', durationDays: 3, isPrimary: true },
            { id: 'sym-2', name: 'Breathing Difficulty', nameHi: 'सांस लेने में कठिनाई', severity: 'severe', durationDays: 2 }
          ]);
          setTemperature(103.2);
          setSpo2(91);
          setRespiratoryRate(54);
          setChestIndrawing(true);
          setLethargy(true);
          setGeneralObservations('Child has visible subcostal chest indrawing and refusal to breastfeed.');
        } else if (p.id === 'RH-2026-00089') { // Ramesh Devi (Amber Case)
          setSymptoms([
            { id: 'sym-1', name: 'Persistent Fever', nameHi: 'लगातार बुखार', severity: 'moderate', durationDays: 4, isPrimary: true },
            { id: 'sym-2', name: 'Severe Headache & Body Ache', nameHi: 'तेज सिरदर्द व बदन दर्द', severity: 'moderate', durationDays: 4 }
          ]);
          setTemperature(101.4);
          setSpo2(97);
          setRespiratoryRate(20);
          setChestIndrawing(false);
          setLethargy(false);
          setGeneralObservations('Intermittent fever with chills, myalgia and history of diabetes.');
        } else if (p.id === 'RH-2026-00144') { // Sunita Patel (Green Case)
          setSymptoms([
            { id: 'sym-1', name: 'Mild Cough & Cold', nameHi: 'हल्की खांसी व जुकाम', severity: 'mild', durationDays: 2, isPrimary: true }
          ]);
          setTemperature(98.6);
          setSpo2(99);
          setRespiratoryRate(18);
          setChestIndrawing(false);
          setLethargy(false);
          setGeneralObservations('Mild runny nose and clear chest.');
        }
      }
    }
  }, [searchParams]);

  // Common quick symptom chips
  const quickSymptomChips = [
    { name: 'Fever', nameHi: 'तेज़ बुखार' },
    { name: 'Cough', nameHi: 'खांसी' },
    { name: 'Breathing Difficulty', nameHi: 'सांस लेने में कठिनाई' },
    { name: 'Headache', nameHi: 'सिरदर्द' },
    { name: 'Weakness / Fatigue', nameHi: 'कमजोरी / थकान' },
    { name: 'Vomiting', nameHi: 'उल्टी' },
    { name: 'Diarrhea', nameHi: 'दस्त' },
    { name: 'Chest Pain', nameHi: 'सीने में दर्द' },
    { name: 'Chills / Shivering', nameHi: 'कंपकंपी / ठंड' },
    { name: 'Skin Rash', nameHi: 'त्वचा पर चकत्ते' }
  ];

  const handleAddQuickSymptom = (chip: { name: string; nameHi: string }) => {
    if (!symptoms.some(s => s.name === chip.name)) {
      setSymptoms(prev => [
        ...prev,
        { id: `sym-${Date.now()}`, name: chip.name, nameHi: chip.nameHi, severity: 'moderate', durationDays: 2 }
      ]);
    }
  };

  const handleRemoveSymptom = (id: string) => {
    setSymptoms(prev => prev.filter(s => s.id !== id));
  };

  const handleVoiceSymptomsApplied = (transcript: string, detected: string[]) => {
    detected.forEach((d) => {
      const clean = d.split('(')[0].trim();
      const hi = d.includes('(') ? d.split('(')[1].replace(')', '').trim() : clean;
      if (!symptoms.some(s => s.name.toLowerCase().includes(clean.toLowerCase()))) {
        setSymptoms(prev => [
          ...prev,
          { id: `sym-${Date.now()}-${Math.random()}`, name: clean, nameHi: hi, severity: 'moderate', durationDays: 3 }
        ]);
      }
    });
    setGeneralObservations(prev => `${prev ? prev + ' ' : ''}Transcribed Speech: "${transcript}"`);
  };

  // Run Clinical Decision-Support Evaluation and Generate Record
  const handleGenerateTriageAssessment = () => {
    if (!selectedPatient) return;

    const hasBreathing = symptoms.some(s => s.name.toLowerCase().includes('breath') || s.name.toLowerCase().includes('सांस'));
    const hasRedFlagActive = chestIndrawing || lethargy || inabilityToDrink || convulsions;

    const evalResult = evaluateClinicalTriage(
      symptoms.map(s => s.name),
      selectedPatient.age,
      temperature === '' ? undefined : Number(temperature),
      hasBreathing,
      hasRedFlagActive
    );

    const activeRule = evalResult.protocol.triggerRules[evalResult.ruleIndex];
    const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    const redFlagsList: string[] = [];
    if (chestIndrawing) redFlagsList.push('Subcostal Chest Indrawing');
    if (lethargy) redFlagsList.push('Severe Lethargy / Reduced Consciousness');
    if (inabilityToDrink) redFlagsList.push('Inability to Drink / Breastfeed');
    if (convulsions) redFlagsList.push('Convulsions / Seizures');

    const createdRecord: AssessmentRecord = {
      id: `ASS-2026-${Date.now().toString().slice(-6)}`,
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      patientAge: selectedPatient.age,
      patientGender: selectedPatient.gender,
      patientVillage: selectedPatient.village,
      date: today,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      symptoms,
      vitals: {
        temperature: temperature === '' ? undefined : Number(temperature),
        spo2: spo2 === '' ? undefined : Number(spo2),
        respiratoryRate: respiratoryRate === '' ? undefined : Number(respiratoryRate),
        heartRate: heartRate === '' ? undefined : Number(heartRate),
        systolicBP: systolicBP === '' ? undefined : Number(systolicBP),
        diastolicBP: diastolicBP === '' ? undefined : Number(diastolicBP),
      },
      generalObservations,
      redFlagsIdentified: redFlagsList,
      triageLevel: evalResult.level,
      urgencyLabel: evalResult.level === 'RED' ? 'Urgent Clinical Escalation Required' : evalResult.level === 'AMBER' ? 'Needs Clinical Evaluation within 24 Hours' : 'Lower Priority — Routine Home Care & Monitoring',
      urgencyLabelHi: evalResult.level === 'RED' ? 'तत्काल अस्पताल रेफरल व चिकित्सा आवश्यक' : evalResult.level === 'AMBER' ? '24 घंटे के भीतर चिकित्सकीय जांच आवश्यक' : 'कम प्राथमिकता — सामान्य घरेलू देखभाल व निगरानी',
      rationaleBullets: activeRule.rationaleBullets,
      rationaleBulletsHi: activeRule.rationaleBulletsHi,
      recommendedAction: activeRule.recommendedAction,
      recommendedActionHi: activeRule.recommendedActionHi,
      supportiveCare: activeRule.supportiveCare,
      explainability: [
        {
          guideline: activeRule.guidelineRef,
          sourceModule: activeRule.guidelineModule,
          ruleTriggered: activeRule.ruleDescription,
          confidenceScore: activeRule.confidenceScore,
          matchedKeywords: symptoms.map(s => s.name)
        }
      ],
      referralDetails: evalResult.level !== 'GREEN' ? {
        isReferred: true,
        suggestedFacilityId: selectedReferralFacilityId,
        facilityName: facilities.find(f => f.id === selectedReferralFacilityId)?.name || 'Primary Health Centre (PHC) Sadar',
        reason: `${evalResult.protocol.conditionName} (${evalResult.level} Triage)`,
        urgency: evalResult.level === 'RED' ? 'IMMEDIATE' : 'WITHIN_24H',
        transportAdvised: evalResult.level === 'RED' ? 'Dial 108 Free Govt Ambulance' : 'Accompanied Standard Transport',
        referredByWorker: 'Sunita Maurya (Senior ASHA - Badge #PRT-8821)',
        referredAt: `${today}, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        status: 'PENDING_REVIEW'
      } : undefined,
      followUp: {
        needed: true,
        dueDate: '22 Aug 2026',
        status: 'SCHEDULED'
      },
      syncStatus: isOffline ? 'LOCAL_OFFLINE' : 'SYNCED'
    };

    setGeneratedAssessment(createdRecord);
    addAssessment(createdRecord);

    if (isOffline) {
      incrementPendingSync();
    }
  };

  const stepsHeader = [
    { num: 1, label: t('step1') },
    { num: 2, label: t('step2') },
    { num: 3, label: t('step3') },
    { num: 4, label: t('step4') },
    { num: 5, label: t('step5') },
    { num: 6, label: t('step6') },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <AppHeader pageTitle={isHindi ? '6-चरणीय स्वास्थ्य जांच विज़ार्ड' : 'Guided Clinical Triage Assessment Wizard'} />

      <div className="flex-1 flex overflow-hidden">
        <AppSidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-5xl mx-auto w-full space-y-6">
          {/* Top Step Progress Indicator */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-4 sm:p-5 select-none">
            <div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-2 sm:gap-4 pb-1">
              {stepsHeader.map((st) => {
                const isActive = currentStep === st.num;
                const isCompleted = currentStep > st.num;
                return (
                  <div key={st.num} className="flex items-center space-x-2 flex-shrink-0">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                        isActive
                          ? 'bg-gov-navy text-white ring-2 ring-gov-saffron ring-offset-2'
                          : isCompleted
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 text-slate-500 border border-slate-300'
                      }`}
                    >
                      {isCompleted ? '✓' : st.num}
                    </div>
                    <span className={`text-xs font-bold whitespace-nowrap ${isActive ? 'text-gov-navy' : isCompleted ? 'text-emerald-800' : 'text-slate-400'}`}>
                      {st.label}
                    </span>
                    {st.num < 6 && <span className="text-slate-300 hidden md:inline ml-2">→</span>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 1: Patient Selection & Baseline */}
          {currentStep === 1 && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6 animate-fade-in text-xs">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black text-gov-navy">
                    {isHindi ? 'चरण 1: मरीज चयन व मूल विवरण' : 'Step 1: Patient Selection & Baseline Profile'}
                  </h2>
                  <p className="text-slate-500">Select registered patient from village cohort or quick enter</p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/worker/new-patient')}
                  className="text-xs font-bold text-gov-navy hover:underline"
                >
                  + Register New Patient
                </button>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-2">Select Patient Record:</label>
                <select
                  value={selectedPatientId}
                  onChange={(e) => setSelectedPatientId(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-3 text-xs bg-white font-bold text-slate-900 focus:ring-1 focus:ring-gov-navy shadow-2xs"
                >
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.id}) — Age: {p.age} Yrs | {p.village}
                    </option>
                  ))}
                </select>
              </div>

              {selectedPatient && (
                <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-gov-navy">{selectedPatient.name}</span>
                    <span className="font-mono text-xs text-slate-600">{selectedPatient.id}</span>
                  </div>
                  <div className="text-slate-600 space-y-1">
                    <div>Age/Gender: <strong>{selectedPatient.age} Yrs / {selectedPatient.gender}</strong></div>
                    <div>Location: <strong>{selectedPatient.village}</strong></div>
                    <div>Known Comorbidities: <strong>{selectedPatient.existingConditions.join(', ') || 'None'}</strong></div>
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="bg-gov-navy hover:bg-gov-navyDark text-white px-6 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-1.5 shadow-md transition-all"
                >
                  <span>Continue to Symptoms</span>
                  <ArrowRight className="w-4 h-4 text-gov-saffron" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Symptoms & Hindi Voice Input */}
          {currentStep === 2 && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6 animate-fade-in text-xs">
              <div className="border-b border-slate-100 pb-3 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="text-lg font-black text-gov-navy">
                    {isHindi ? 'चरण 2: लक्षण एवं हिंदी वॉयस इनपुट' : 'Step 2: Symptoms & Hindi Voice Input'}
                  </h2>
                  <p className="text-slate-500">Record patient complaints via text or speech transcription</p>
                </div>

                {/* Speak in Hindi CTA */}
                <button
                  type="button"
                  onClick={() => setVoiceModalOpen(true)}
                  className="bg-red-700 hover:bg-red-800 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md flex items-center space-x-2 transition-all transform hover:scale-105"
                >
                  <Mic className="w-4 h-4 text-gov-saffron animate-pulse" />
                  <span>{t('speakInHindi')}</span>
                </button>
              </div>

              {/* Quick Symptom Selector Chips */}
              <div className="space-y-2">
                <label className="font-bold text-slate-700 block">
                  {t('commonSymptoms')}
                </label>
                <div className="flex flex-wrap gap-2">
                  {quickSymptomChips.map((chip, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAddQuickSymptom(chip)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold px-3 py-1.5 rounded-full text-xs border border-slate-300 transition-colors flex items-center space-x-1"
                    >
                      <Plus className="w-3 h-3 text-gov-navy" />
                      <span>{isHindi ? chip.nameHi : chip.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Symptoms Table / List */}
              <div className="space-y-3 pt-2">
                <label className="font-bold text-slate-800 block">
                  Active Reported Symptoms for this Assessment ({symptoms.length}):
                </label>

                {symptoms.map((sym, index) => (
                  <div key={sym.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                    <div className="sm:col-span-5">
                      <span className="font-bold text-slate-900 text-sm block">
                        {sym.name} ({sym.nameHi})
                      </span>
                    </div>

                    <div className="sm:col-span-3">
                      <label className="text-[10px] font-semibold text-slate-500 block mb-0.5">Severity:</label>
                      <select
                        value={sym.severity}
                        onChange={(e) => {
                          const val = e.target.value as any;
                          setSymptoms(prev => prev.map((s, i) => i === index ? { ...s, severity: val } : s));
                        }}
                        className="w-full bg-white border border-slate-300 rounded-lg p-1.5 text-xs font-semibold focus:outline-none"
                      >
                        <option value="mild">Mild (हल्का)</option>
                        <option value="moderate">Moderate (मध्यम)</option>
                        <option value="severe">Severe (गंभीर)</option>
                      </select>
                    </div>

                    <div className="sm:col-span-3">
                      <label className="text-[10px] font-semibold text-slate-500 block mb-0.5">Duration (Days):</label>
                      <input
                        type="number"
                        min={1}
                        max={30}
                        value={sym.durationDays}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setSymptoms(prev => prev.map((s, i) => i === index ? { ...s, durationDays: val } : s));
                        }}
                        className="w-full bg-white border border-slate-300 rounded-lg p-1.5 text-xs font-mono font-bold focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-1 text-right">
                      <button
                        type="button"
                        onClick={() => handleRemoveSymptom(sym.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                        title="Remove symptom"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-bold"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  disabled={symptoms.length === 0}
                  className="bg-gov-navy hover:bg-gov-navyDark disabled:bg-slate-300 text-white px-6 py-2.5 rounded-xl font-bold flex items-center space-x-1.5 shadow-md"
                >
                  <span>Continue to Vitals</span>
                  <ArrowRight className="w-4 h-4 text-gov-saffron" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Observations & Vitals */}
          {currentStep === 3 && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6 animate-fade-in text-xs">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-lg font-black text-gov-navy">
                  {isHindi ? 'चरण 3: नैदानिक संकेत, वाइटल्स व रेड-फ्लैग्स' : 'Step 3: Clinical Observations & Red Flags'}
                </h2>
                <p className="text-slate-500">Record measured parameters and emergency danger sign indicators</p>
              </div>

              {/* Vitals Input Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <label className="font-bold text-slate-700 block">Temperature (°F)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="98.6"
                    className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm font-mono font-black focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-400">Fever alert &gt; 100.5°F</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <label className="font-bold text-slate-700 block">SpO2 (%)</label>
                  <input
                    type="number"
                    value={spo2}
                    onChange={(e) => setSpo2(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="98"
                    className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm font-mono font-black focus:outline-none"
                  />
                  <span className="text-[10px] text-red-600 font-semibold">Hypoxia &lt; 94%</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <label className="font-bold text-slate-700 block">Resp Rate (bpm)</label>
                  <input
                    type="number"
                    value={respiratoryRate}
                    onChange={(e) => setRespiratoryRate(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="20"
                    className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm font-mono font-black focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-400">Fast breathing &gt; 50 (Infant)</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <label className="font-bold text-slate-700 block">Heart Rate (bpm)</label>
                  <input
                    type="number"
                    value={heartRate}
                    onChange={(e) => setHeartRate(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="80"
                    className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm font-mono font-black focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-400">Normal: 60 - 100</span>
                </div>
              </div>

              {/* Red Flags / Emergency Danger Signs Checklist */}
              <div className="p-4 bg-red-50/70 border-2 border-red-300 rounded-2xl space-y-3">
                <div className="flex items-center space-x-2 text-red-950 font-bold text-xs uppercase tracking-wide">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span>IMNCI & RMNCH+A Red Flags Checklist (खतरे के संकेत):</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <label className="flex items-center space-x-2 p-2 bg-white rounded-lg border border-red-200 cursor-pointer hover:bg-red-50 font-semibold text-slate-800">
                    <input
                      type="checkbox"
                      checked={chestIndrawing}
                      onChange={(e) => setChestIndrawing(e.target.checked)}
                      className="w-4 h-4 text-red-600 rounded"
                    />
                    <span>Subcostal Chest Indrawing (छाती का धंसना)</span>
                  </label>

                  <label className="flex items-center space-x-2 p-2 bg-white rounded-lg border border-red-200 cursor-pointer hover:bg-red-50 font-semibold text-slate-800">
                    <input
                      type="checkbox"
                      checked={lethargy}
                      onChange={(e) => setLethargy(e.target.checked)}
                      className="w-4 h-4 text-red-600 rounded"
                    />
                    <span>Abnormal Lethargy / Drowsiness (अत्यधिक सुस्ती)</span>
                  </label>

                  <label className="flex items-center space-x-2 p-2 bg-white rounded-lg border border-red-200 cursor-pointer hover:bg-red-50 font-semibold text-slate-800">
                    <input
                      type="checkbox"
                      checked={inabilityToDrink}
                      onChange={(e) => setInabilityToDrink(e.target.checked)}
                      className="w-4 h-4 text-red-600 rounded"
                    />
                    <span>Inability to Drink / Breastfeed (दूध न पी पाना)</span>
                  </label>

                  <label className="flex items-center space-x-2 p-2 bg-white rounded-lg border border-red-200 cursor-pointer hover:bg-red-50 font-semibold text-slate-800">
                    <input
                      type="checkbox"
                      checked={convulsions}
                      onChange={(e) => setConvulsions(e.target.checked)}
                      className="w-4 h-4 text-red-600 rounded"
                    />
                    <span>Convulsions / Seizures (झटके या दौरे आना)</span>
                  </label>
                </div>
              </div>

              {/* Frontline General Observations */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Frontline Worker Clinical Notes & Observations:
                </label>
                <textarea
                  rows={2}
                  value={generalObservations}
                  onChange={(e) => setGeneralObservations(e.target.value)}
                  placeholder="Record general demeanor, rash location, hydration status, etc."
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-gov-navy focus:outline-none"
                />
              </div>

              <div className="flex justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-bold"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleGenerateTriageAssessment();
                    setCurrentStep(4);
                  }}
                  className="bg-gov-navy hover:bg-gov-navyDark text-white px-7 py-3 rounded-xl font-black text-xs flex items-center space-x-2 shadow-lg transform hover:scale-105"
                >
                  <Sparkles className="w-4 h-4 text-gov-saffron animate-spin" />
                  <span>Run Swasthya Mitra AI Triage Decision Support</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Animated AI Pipeline Visualizer */}
          {currentStep === 4 && (
            <AIPipelineVisualizer onComplete={() => setCurrentStep(5)} />
          )}

          {/* STEP 5: Preliminary Triage Result & Explainability */}
          {currentStep === 5 && generatedAssessment && (
            <div className="space-y-6 animate-fade-in">
              {showSupportiveCareView ? (
                <SupportiveCareGuide
                  advice={generatedAssessment.supportiveCare}
                  onBack={() => setShowSupportiveCareView(false)}
                />
              ) : (
                <>
                  <TriageResultCard
                    assessment={generatedAssessment}
                    onGenerateReferral={() => setCurrentStep(6)}
                    onInitiateTeleconsult={() => setTeleconsultOpen(true)}
                    onViewSupportiveCare={() => setShowSupportiveCareView(true)}
                  />

                  <ExplainabilityPanel
                    evidenceList={generatedAssessment.explainability}
                    patientParameters={{
                      age: generatedAssessment.patientAge,
                      symptoms: generatedAssessment.symptoms.map(s => `${s.name} (${s.severity})`),
                      vitals: [
                        `Temp: ${generatedAssessment.vitals.temperature || 'N/A'}°F`,
                        `SpO2: ${generatedAssessment.vitals.spo2 || 'N/A'}%`,
                        `RR: ${generatedAssessment.vitals.respiratoryRate || 'N/A'} bpm`
                      ],
                      redFlags: generatedAssessment.redFlagsIdentified
                    }}
                  />

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-bold text-xs"
                    >
                      ← Re-evaluate Inputs
                    </button>

                    <button
                      type="button"
                      onClick={() => setCurrentStep(6)}
                      className="bg-gov-navy hover:bg-gov-navyDark text-white px-6 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-1.5 shadow-md"
                    >
                      <span>Proceed to Official Referral & Action</span>
                      <ArrowRight className="w-4 h-4 text-gov-saffron" />
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* STEP 6: Referral Summary & Actions */}
          {currentStep === 6 && generatedAssessment && (
            <div className="space-y-6 animate-fade-in">
              <ReferralDocument
                assessment={generatedAssessment}
                facility={facilities.find(f => f.id === selectedReferralFacilityId)}
              />

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1 text-xs">
                  <div className="font-bold text-slate-900">Assessment Saved to Longitudinal EHR</div>
                  <div className="text-slate-500">
                    {isOffline ? 'Record stored locally in offline sync database' : 'Record synced with ABDM Health Stack'}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => navigate('/worker/dashboard')}
                    className="bg-gov-navy hover:bg-gov-navyDark text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-md"
                  >
                    Return to Worker Dashboard
                  </button>
                  <button
                    onClick={() => {
                      setCurrentStep(1);
                      setGeneratedAssessment(null);
                    }}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-4 py-2.5 rounded-xl text-xs"
                  >
                    + Assess Next Patient
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Voice Input Modal */}
      <VoiceInputModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
        onApplySymptoms={handleVoiceSymptomsApplied}
      />

      {/* Teleconsultation Modal */}
      {generatedAssessment && (
        <TeleconsultationModal
          isOpen={teleconsultOpen}
          onClose={() => setTeleconsultOpen(false)}
          assessment={generatedAssessment}
        />
      )}
    </div>
  );
};
