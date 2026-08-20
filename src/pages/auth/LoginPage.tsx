import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { TopUtilityBar } from '../../components/layout/TopUtilityBar';
import { EmergencyBanner } from '../../components/layout/EmergencyBanner';
import {
  ShieldCheck,
  Smartphone,
  KeyRound,
  CheckCircle2,
  Sparkles,
  WifiOff,
  UserPlus,
  ArrowRight,
  Stethoscope,
  Users,
  Shield,
  X
} from 'lucide-react';
import type { UserRole } from '../../types';

export const LoginPage: React.FC = () => {
  const { loginAsRole, loginWithAbha } = useAuth();
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialRole = (searchParams.get('role') as UserRole) || 'WORKER';
  const [activeRole, setActiveRole] = useState<UserRole>(initialRole);

  const [mobileNumber, setMobileNumber] = useState('9839012345');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [empId, setEmpId] = useState('');
  const [empPassword, setEmpPassword] = useState('');
  const [loginMethod, setLoginMethod] = useState<'OTP' | 'EMP' | 'ABHA'>('OTP');

  // ABHA Modal State
  const [abhaModalOpen, setAbhaModalOpen] = useState(false);
  const [abhaInput, setAbhaInput] = useState('91-4521-8890-1123');

  // New ASHA Registration Modal State
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [newAshaName, setNewAshaName] = useState('');
  const [newAshaBadge, setNewAshaBadge] = useState('');
  const [newAshaPhone, setNewAshaPhone] = useState('');

  const isHindi = language === 'hi';

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileNumber.length >= 10) {
      setOtpSent(true);
      setOtpCode('123456'); // Simulated prefilled OTP for effortless hackathon demo
    }
  };

  const handleVerifyLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsRole(activeRole);
    if (activeRole === 'WORKER') navigate('/worker/dashboard');
    else if (activeRole === 'DOCTOR') navigate('/doctor/dashboard');
    else navigate('/admin/dashboard');
  };

  const handleAbhaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (abhaInput) {
      loginWithAbha(abhaInput);
      setAbhaModalOpen(false);
      navigate('/worker/dashboard');
    }
  };

  const handleRegisterAsha = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAshaName && newAshaBadge) {
      loginAsRole('WORKER', {
        name: newAshaName,
        badgeNumber: newAshaBadge,
        phone: newAshaPhone || '+91 98390 00000',
      });
      setRegisterModalOpen(false);
      navigate('/worker/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <TopUtilityBar />
      <EmergencyBanner />

      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[560px]">
          {/* Left Panel: Government Portal Brand & Mission (5 Cols) */}
          <div className="md:col-span-5 bg-gradient-to-br from-[#0B3C5D] via-[#07253B] to-[#051a2a] text-white p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FF9933_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="space-y-4 relative z-10">
              <Link to="/" className="flex items-center space-x-2.5">
                <div className="w-10 h-10 bg-gov-navyLight border border-gov-saffron rounded-lg flex items-center justify-center shadow-md">
                  <ShieldCheck className="w-6 h-6 text-gov-saffron" />
                </div>
                <div>
                  <h2 className="text-lg font-black tracking-tight text-white leading-none">
                    Swasthya Mitra
                  </h2>
                  <span className="text-xs text-gov-saffron font-bold">AI</span>
                </div>
              </Link>

              <div className="pt-6 space-y-3">
                <div className="text-[10px] uppercase font-bold tracking-widest text-cyan-300">
                  National Health Mission UP
                </div>
                <h3 className="text-lg sm:text-xl font-bold leading-tight text-slate-100">
                  {isHindi
                    ? 'ग्रामीण स्वास्थ्य कार्यकर्ताओं हेतु त्वरित व सुरक्षित नैदानिक सहायता'
                    : 'Evidence-Based Triage for Rural Frontline Health Workers'}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {isHindi
                    ? 'आशा कार्यकर्ताओं द्वारा दर्ज किए गए लक्षणों का त्वरित विश्लेषण, बाल निमोनिया व मौसमी बुखार के खतरे के संकेतों की पहचान।'
                    : 'Enabling rapid pediatric & fever triage under IMNCI standards with zero-network offline sync capabilities.'}
                </p>
              </div>
            </div>

            {/* Offline Resilience Note */}
            <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700 space-y-1 relative z-10 text-xs mt-6">
              <div className="flex items-center space-x-2 text-gov-saffron font-bold text-[11px]">
                <WifiOff className="w-3.5 h-3.5" />
                <span>{isHindi ? 'ऑफलाइन डेटा उपलब्धता' : 'Offline Data Access'}</span>
              </div>
              <p className="text-[11px] text-slate-300">
                {t('offlineAccessNote')}
              </p>
            </div>
          </div>

          {/* Right Panel: The Institutional Login Card (7 Cols) */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-white space-y-6">
            <div className="space-y-5">
              {/* Header Title */}
              <div>
                <h3 className="text-xl font-black text-gov-navy">
                  {t('loginTitle')}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isHindi
                    ? 'कृपया अपनी निर्धारित भूमिका और मोबाइल नंबर दर्ज करें'
                    : 'Authenticate via OTP or Ayushman Bharat Health Account (ABHA)'}
                </p>
              </div>

              {/* Role Selection Tabs */}
              <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
                <button
                  type="button"
                  onClick={() => { setActiveRole('WORKER'); setOtpSent(false); }}
                  className={`py-2 px-1.5 rounded-lg font-bold transition-all flex items-center justify-center space-x-1 ${
                    activeRole === 'WORKER'
                      ? 'bg-gov-navy text-white shadow-sm'
                      : 'text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span className="truncate">{isHindi ? 'आशा कार्यकर्ता' : 'ASHA Worker'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveRole('DOCTOR'); setOtpSent(false); }}
                  className={`py-2 px-1.5 rounded-lg font-bold transition-all flex items-center justify-center space-x-1 ${
                    activeRole === 'DOCTOR'
                      ? 'bg-gov-navy text-white shadow-sm'
                      : 'text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Stethoscope className="w-3.5 h-3.5" />
                  <span className="truncate">{isHindi ? 'चिकित्सक' : 'Doctor / MO'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveRole('ADMIN'); setOtpSent(false); }}
                  className={`py-2 px-1.5 rounded-lg font-bold transition-all flex items-center justify-center space-x-1 ${
                    activeRole === 'ADMIN'
                      ? 'bg-gov-navy text-white shadow-sm'
                      : 'text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span className="truncate">{isHindi ? 'प्रशासक' : 'Admin'}</span>
                </button>
              </div>

              {/* Role Context Pill */}
              <div className="text-[11px] bg-blue-50 border border-blue-200 text-blue-900 p-2 rounded-lg flex items-center justify-between">
                <span>Logging in as: <strong>{activeRole === 'WORKER' ? 'ASHA / ANM Frontline Worker' : activeRole === 'DOCTOR' ? 'Medical Officer (AIIMS / CHC)' : 'District Health Administrator'}</strong></span>
                <span className="font-mono text-[10px] bg-blue-200 px-1.5 py-0.2 rounded font-bold">PRATAPGARH</span>
              </div>

              {/* Primary Mobile + OTP Login Form */}
              {loginMethod === 'OTP' && (
                <form onSubmit={otpSent ? handleVerifyLogin : handleSendOtp} className="space-y-3.5 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      {t('mobileNumber')}:
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 font-semibold text-xs">
                        +91
                      </div>
                      <input
                        type="tel"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        placeholder="98390 12345"
                        disabled={otpSent}
                        className="w-full pl-12 pr-4 py-2.5 border border-slate-300 rounded-xl focus:ring-1 focus:ring-gov-navy focus:outline-none text-xs font-mono font-bold"
                      />
                    </div>
                  </div>

                  {otpSent && (
                    <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2">
                      <div className="flex justify-between items-center">
                        <label className="font-bold text-slate-700">{t('enterOtp')}:</label>
                        <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded">
                          OTP Sent (Mock: 123456)
                        </span>
                      </div>
                      <input
                        type="text"
                        maxLength={6}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder="123456"
                        className="w-full tracking-widest text-center py-2.5 border border-slate-300 rounded-xl focus:ring-1 focus:ring-gov-navy focus:outline-none text-base font-mono font-black"
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-gov-navy hover:bg-gov-navyDark text-white py-3 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-1.5"
                  >
                    <span>{otpSent ? t('verifyLogin') : t('sendOtp')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}

              {/* Secondary Option: Login with ABHA ID */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setAbhaModalOpen(true)}
                  className="w-full bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-300 py-2.5 rounded-xl font-bold text-xs shadow-2xs transition-colors flex items-center justify-center space-x-2"
                >
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>{t('loginWithAbha')}</span>
                </button>

                {activeRole === 'WORKER' && (
                  <button
                    type="button"
                    onClick={() => setRegisterModalOpen(true)}
                    className="w-full text-center text-xs font-semibold text-slate-600 hover:text-gov-navy py-1"
                  >
                    {t('newAshaRegister')}
                  </button>
                )}
              </div>
            </div>

            {/* Login footer helpdesk note */}
            <div className="text-[11px] text-slate-400 border-t border-slate-100 pt-3 text-center">
              {t('loginHelpNote')}
            </div>
          </div>
        </div>
      </div>

      {/* ABHA ID Login Modal */}
      {abhaModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <h4 className="font-bold text-sm text-slate-900">Ayushman Bharat Health Account (ABHA)</h4>
              </div>
              <button onClick={() => setAbhaModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Enter your 14-digit ABHA ID or linked Ayushman mobile number to authenticate directly with the National Health Stack.
            </p>

            <form onSubmit={handleAbhaSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">14-Digit ABHA ID:</label>
                <input
                  type="text"
                  value={abhaInput}
                  onChange={(e) => setAbhaInput(e.target.value)}
                  placeholder="91-4521-8890-1123"
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-xs font-mono font-bold focus:ring-1 focus:ring-gov-navy"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2.5 rounded-xl text-xs shadow-md transition-colors"
              >
                Verify ABHA & Enter Portal
              </button>
            </form>
          </div>
        </div>
      )}

      {/* New ASHA Registration Modal */}
      {registerModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <UserPlus className="w-5 h-5 text-gov-navy" />
                <h4 className="font-bold text-sm text-slate-900">Register New ASHA / Frontline Worker</h4>
              </div>
              <button onClick={() => setRegisterModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRegisterAsha} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">ASHA Worker Full Name:</label>
                <input
                  type="text"
                  required
                  value={newAshaName}
                  onChange={(e) => setNewAshaName(e.target.value)}
                  placeholder="e.g. Geeta Devi"
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-gov-navy"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">ASHA Badge Number / ID:</label>
                <input
                  type="text"
                  required
                  value={newAshaBadge}
                  onChange={(e) => setNewAshaBadge(e.target.value)}
                  placeholder="e.g. ASHA-UP-PRT-9942"
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-xs font-mono font-bold focus:ring-1 focus:ring-gov-navy"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Mobile Number:</label>
                <input
                  type="tel"
                  value={newAshaPhone}
                  onChange={(e) => setNewAshaPhone(e.target.value)}
                  placeholder="+91 98391 XXXXX"
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-gov-navy"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gov-navy hover:bg-gov-navyDark text-white font-bold py-2.5 rounded-xl text-xs shadow-md transition-colors"
              >
                Register & Enter Portal
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
