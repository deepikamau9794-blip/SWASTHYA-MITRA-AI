import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { usePatients } from '../../context/PatientContext';
import { AppHeader } from '../../components/layout/AppHeader';
import { AppSidebar } from '../../components/layout/AppSidebar';
import { ShieldCheck, UserPlus, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export const NewPatientPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { addPatient } = usePatients();
  const navigate = useNavigate();

  const isHindi = language === 'hi';

  const [name, setName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState<'MALE' | 'FEMALE' | 'OTHER'>('FEMALE');
  const [phone, setPhone] = useState('');
  const [village, setVillage] = useState('Purey Pandey, Pratapgarh');
  const [preferredLanguage, setPreferredLanguage] = useState<'hi' | 'en'>('hi');
  const [abhaId, setAbhaId] = useState('');
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyRelation, setEmergencyRelation] = useState('Family');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [allergies, setAllergies] = useState('');
  const [currentMedications, setCurrentMedications] = useState('');
  const [existingConditions, setExistingConditions] = useState('');
  const [notes, setNotes] = useState('');

  const [savedPatientId, setSavedPatientId] = useState<string | null>(null);

  const handleCreateMockAbha = () => {
    const random14 = `91-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
    setAbhaId(random14);
  };

  const handleSubmit = (startAssessmentAfter: boolean) => {
    if (!name || age === '') {
      alert("Please fill in patient name and age.");
      return;
    }

    const created = addPatient({
      name,
      age: Number(age),
      gender,
      phone: phone || '+91 98390 00000',
      village,
      preferredLanguage,
      abhaId: abhaId || undefined,
      emergencyContact: {
        name: emergencyName || 'Primary Family Member',
        relation: emergencyRelation,
        phone: emergencyPhone || phone || '+91 98390 00000'
      },
      allergies: allergies ? allergies.split(',').map(s => s.trim()) : [],
      currentMedications: currentMedications ? currentMedications.split(',').map(s => s.trim()) : [],
      existingConditions: existingConditions ? existingConditions.split(',').map(s => s.trim()) : [],
      notes: notes || undefined
    });

    setSavedPatientId(created.id);

    if (startAssessmentAfter) {
      navigate(`/worker/assessment?patientId=${created.id}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <AppHeader pageTitle={isHindi ? 'नया मरीज पंजीकरण' : 'Register New Patient'} />

      <div className="flex-1 flex overflow-hidden">
        <AppSidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-4xl mx-auto w-full space-y-6">
          {/* Header */}
          <div className="border-b border-slate-200 pb-4">
            <h1 className="text-2xl font-black text-gov-navy flex items-center gap-2">
              <UserPlus className="w-6 h-6 text-gov-saffron" />
              <span>{isHindi ? 'नया ग्रामीण मरीज पंजीकरण' : 'New Rural Patient Registration'}</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {isHindi ? 'आयुष्मान भारत डिजिटल मिशन (ABDM) स्वास्थ्य आईडी व जनसांख्यिकीय विवरण' : 'Generate National Health ID format RH-2026-XXXXX with optional ABHA link'}
            </p>
          </div>

          {savedPatientId && (
            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center justify-between text-emerald-950 text-xs">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Patient registered successfully with ID: <strong>{savedPatientId}</strong></span>
              </div>
              <button
                onClick={() => navigate(`/worker/assessment?patientId=${savedPatientId}`)}
                className="bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs hover:bg-emerald-800"
              >
                Start Assessment Now →
              </button>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6 text-xs">
            {/* Section 1: Demographics */}
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
                1. Patient Demographics & Contact
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh Devi / Baby Aarav"
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-gov-navy focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Age (Years) *</label>
                    <input
                      type="number"
                      required
                      min={0}
                      max={120}
                      value={age}
                      onChange={(e) => setAge(e.target.value === '' ? '' : Number(e.target.value))}
                      placeholder="e.g. 2 or 54"
                      className="w-full border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-gov-navy focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Gender</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value as any)}
                      className="w-full border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-gov-navy focus:outline-none bg-white"
                    >
                      <option value="FEMALE">Female (महिला)</option>
                      <option value="MALE">Male (पुरुष)</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Mobile Contact</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98391 XXXXX"
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-gov-navy focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Village / Location *</label>
                  <input
                    type="text"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    placeholder="e.g. Purey Pandey, Pratapgarh"
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-gov-navy focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: ABHA Linking (Ayushman Bharat) */}
            <div className="space-y-3 p-4 bg-blue-50/60 rounded-2xl border border-blue-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-xs text-blue-950 uppercase tracking-wide">
                    Ayushman Bharat Health Account (ABHA ID)
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleCreateMockAbha}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1 rounded-lg text-[11px] transition-colors"
                >
                  + Generate / Fetch ABHA ID
                </button>
              </div>

              <input
                type="text"
                value={abhaId}
                onChange={(e) => setAbhaId(e.target.value)}
                placeholder="14-Digit Format: 91-XXXX-XXXX-XXXX"
                className="w-full border border-blue-300 rounded-xl p-2.5 text-xs font-mono font-bold focus:ring-1 focus:ring-blue-600 focus:outline-none bg-white"
              />
            </div>

            {/* Section 3: Baseline Clinical Profile */}
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
                2. Baseline Medical History & Allergies
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Known Drug Allergies</label>
                  <input
                    type="text"
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                    placeholder="e.g. Penicillin, Sulfa drugs, None"
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-gov-navy focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Current Regular Medications</label>
                  <input
                    type="text"
                    value={currentMedications}
                    onChange={(e) => setCurrentMedications(e.target.value)}
                    placeholder="e.g. Metformin 500mg, Amlodipine 5mg"
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-gov-navy focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">Existing Conditions / Comorbidities</label>
                  <input
                    type="text"
                    value={existingConditions}
                    onChange={(e) => setExistingConditions(e.target.value)}
                    placeholder="e.g. Type 2 Diabetes (5 yrs), Hypertension, Asthma"
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-gov-navy focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => handleSubmit(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-5 py-2.5 rounded-xl transition-colors"
              >
                Save Patient Profile
              </button>

              <button
                type="button"
                onClick={() => handleSubmit(true)}
                className="bg-gov-navy hover:bg-gov-navyDark text-white font-bold px-6 py-2.5 rounded-xl shadow-md transition-all flex items-center space-x-1.5"
              >
                <span>Save & Start Assessment</span>
                <ArrowRight className="w-4 h-4 text-gov-saffron" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
