import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { usePatients } from '../../context/PatientContext';
import { TopUtilityBar } from '../../components/layout/TopUtilityBar';
import { EmergencyBanner } from '../../components/layout/EmergencyBanner';
import { HeaderBand } from '../../components/layout/HeaderBand';
import { NoticeTicker } from '../../components/common/NoticeTicker';
import { Footer } from '../../components/layout/Footer';
import { FacilityCard } from '../../components/common/FacilityCard';
import {
  Stethoscope,
  Users,
  Video,
  Send,
  ShieldCheck,
  Activity,
  HeartPulse,
  Baby,
  Thermometer,
  Sparkles,
  ArrowRight,
  PhoneCall,
  MapPin,
  CheckCircle2,
  FileText,
  Calendar
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { language, t } = useLanguage();
  const { facilities, loadDemoPersona } = usePatients();

  const isHindi = language === 'hi';

  const quickStats = [
    { label: isHindi ? 'कवर किए गए गांव' : 'Villages Covered', value: '142+', sub: isHindi ? 'प्रतापगढ़ जनपद' : 'Pratapgarh District' },
    { label: isHindi ? 'पंजीकृत आशा कार्यकर्ता' : 'ASHA Workers Onboarded', value: '318', sub: isHindi ? 'सक्रिय स्वास्थ्य साथी' : 'Active Frontline Cohort' },
    { label: isHindi ? 'संपन्न स्वास्थ्य जांचें' : 'Assessments Completed', value: '14,890+', sub: isHindi ? 'प्राथमिक जांच व परामर्श' : 'Preliminary Screenings' },
    { label: isHindi ? 'औसत प्रतिक्रिया समय' : 'Avg. Triage Response', value: '< 2.4 min', sub: isHindi ? 'त्वरित नैदानिक सहायता' : 'Real-time Decision Support' },
  ];

  const quickServices = [
    {
      icon: Stethoscope,
      title: isHindi ? 'प्राथमिक स्वास्थ्य जांच (AI Triage)' : 'AI Clinical Triage',
      desc: isHindi ? 'ग्रामीण मरीजों के लक्षणों की पारदर्शी एवं सुरक्षित प्राथमिक जांच।' : 'Frontline symptom assessment aligned with verified IMNCI & NVBDCP protocols.',
      link: '/login?role=WORKER',
      color: 'bg-blue-600',
    },
    {
      icon: Video,
      title: isHindi ? 'टेलीकंसल्टेशन (e-Sanjeevani)' : 'Apex Teleconsultation',
      desc: isHindi ? 'एम्स गोरखपुर व जिला अस्पताल के विशेषज्ञ चिकित्सकों से सीधा संपर्क।' : 'Direct virtual connection to on-call Medical Officers for urgent cases.',
      link: '/login?role=WORKER',
      color: 'bg-purple-600',
    },
    {
      icon: Send,
      title: isHindi ? 'डिजिटल रेफरल पर्ची' : 'ABDM Linked Referral',
      desc: isHindi ? 'नज़दीकी पीएचसी/सीएचसी हेतु आधिकारिक डिजिटल रेफरल पर्ची।' : 'Standardized clinical summary generated for recipient health facilities.',
      link: '/login?role=WORKER',
      color: 'bg-emerald-600',
    },
    {
      icon: MapPin,
      title: isHindi ? 'स्वास्थ्य केंद्र खोजें (PHC/CHC)' : 'Facility Locator',
      desc: isHindi ? 'प्रतापगढ़ के 24x7 आपातकालीन व बेड उपलब्धता वाले स्वास्थ्य केंद्र।' : 'Interactive directory of nearest PHCs, CHCs, and District Hospitals.',
      link: '/login?role=WORKER',
      color: 'bg-amber-600',
    },
  ];

  const departments = [
    {
      icon: Baby,
      title: isHindi ? 'मातृ एवं शिशु स्वास्थ्य (RMNCH+A)' : 'Maternal & Child Health',
      desc: isHindi ? 'आईएमएनसीआई बाल निमोनिया, तेज बुखार, एएनसी जांच एवं खतरे के संकेतों की पहचान।' : 'Pediatric acute respiratory infections, fast breathing, danger signs & ANC follow-ups.',
      cases: '5,420+ Cases Evaluated',
    },
    {
      icon: Thermometer,
      title: isHindi ? 'मच्छर जनित एवं संक्रामक ज्वर' : 'Vector-Borne & Febrile Illness',
      desc: isHindi ? 'डेंगू, मलेरिया, टाइफाइड एवं मौसमी बुखार की त्वरित जांच व आरडीटी किट सहायता।' : 'Monsoon surveillance for Dengue, Malaria, JE & prolonged febrile episodes.',
      cases: '4,190+ Screenings',
    },
    {
      icon: Activity,
      title: isHindi ? 'गैर-संचारी रोग (NCD Screening)' : 'Chronic Disease & NCD Follow-up',
      desc: isHindi ? 'मधुमेह (शुगर), उच्च रक्तचाप (बीपी) एवं हृदय स्वास्थ्य की नियमित निगरानी।' : 'Hypertension, Type 2 Diabetes, and long-term medication compliance tracking.',
      cases: '3,850+ Records',
    },
    {
      icon: HeartPulse,
      title: isHindi ? 'आपातकालीन खतरे के संकेत' : 'Emergency Triage & Red Flags',
      desc: isHindi ? 'अचेत अवस्था, तीव्र सांस संकट एवं 108 एम्बुलेंस से त्वरित अस्पताल प्रेषण।' : 'Immediate hospital escalation protocols for critical hemodynamic emergencies.',
      cases: '1,430+ Urgent Referrals',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <TopUtilityBar />
      <EmergencyBanner />
      <HeaderBand />
      <NoticeTicker />

      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[#0B3C5D] via-[#07253B] to-[#051a2a] text-white py-14 sm:py-20 px-4 sm:px-8 relative overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FF9933_1px,transparent_1px)] [background-size:20px_20px]" />

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-gov-navyLight/80 border border-cyan-400/40 text-cyan-200 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-inner">
                <Sparkles className="w-3.5 h-3.5 text-gov-saffron animate-pulse" />
                <span>Swasthya Mitra AI • RECP Pratapgarh Pilot</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                {isHindi ? (
                  <>
                    ग्रामीण स्वास्थ्य कार्यकर्ताओं हेतु{' '}
                    <span className="text-gov-saffron">एआई निर्णय-समर्थन</span> प्रणाली
                  </>
                ) : (
                  <>
                    AI-Assisted Clinical Triage for{' '}
                    <span className="text-gov-saffron">Frontline Healthcare</span> Workers
                  </>
                )}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                {isHindi
                  ? 'अग्रिम पंक्ति की आशा (ASHA) व एएनएम (ANM) कार्यकर्ताओं को सटीक प्राथमिक स्वास्थ्य जांच, सत्यापित सरकारी प्रोटोकॉल (IMNCI, NVBDCP), ऑफलाइन सिंक, एवं एम्स गोरखपुर से टेलीकंसल्टेशन जोड़ने वाला राष्ट्रीय डिजिटल स्वास्थ्य मंच।'
                  : 'Empowering ASHA and ANM frontline workers in rural India with evidence-based preliminary triage, transparent clinical explainability, offline-first sync, and direct teleconsultation escalation to district hospital medical officers.'}
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  to="/login?role=WORKER"
                  className="bg-gov-saffron hover:bg-amber-500 text-slate-950 px-6 py-3.5 rounded-xl font-black text-sm shadow-lg shadow-amber-950/40 flex items-center space-x-2 transition-all transform hover:scale-105"
                >
                  <Users className="w-4 h-4 text-slate-950" />
                  <span>{isHindi ? 'आशा / स्वास्थ्य कार्यकर्ता पोर्टल' : 'ASHA Worker Portal Login'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/login?role=DOCTOR"
                  className="bg-slate-800/80 hover:bg-slate-800 text-white border border-slate-600 px-5 py-3.5 rounded-xl font-bold text-sm shadow-sm transition-all flex items-center space-x-2"
                >
                  <Stethoscope className="w-4 h-4 text-gov-saffron" />
                  <span>{isHindi ? 'चिकित्सक / एडमिन लॉगिन' : 'Doctor / Admin Portal'}</span>
                </Link>
              </div>

              {/* Trust signals strip */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-3 border-t border-slate-700/80">
                <span className="flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  {isHindi ? 'हिंदी व अवधी वॉयस इनपुट' : 'Hindi & Voice Input Beta'}
                </span>
                <span className="flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  {isHindi ? 'जीरो-इंटरनेट ऑफलाइन सिंक' : 'Offline-First Resilience'}
                </span>
                <span className="flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  {isHindi ? 'शून्य ऑटोनॉमस प्रिस्क्रिप्शन' : 'Zero Autonomous Prescriptions'}
                </span>
              </div>
            </div>

            {/* Hero Right Visual: Live Interactive Triage Simulation Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-2xl p-5 text-slate-900 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-600 animate-ping" />
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Live Triage Simulation Case
                    </span>
                  </div>
                  <span className="text-[10px] bg-red-100 text-red-800 font-extrabold px-2 py-0.5 rounded-full">
                    Urgent (Red)
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Patient:</span>
                    <strong className="text-slate-900">Baby Aarav (Age: 2 Yrs)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Symptoms:</span>
                    <span className="font-semibold text-slate-800">Fever (103.2°F), Fast Breathing</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Danger Sign:</span>
                    <span className="font-bold text-red-600">Subcostal Chest Indrawing</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Protocol Match:</span>
                    <span className="font-semibold text-gov-navy">IMNCI Module 3 (MoHFW)</span>
                  </div>
                </div>

                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs space-y-1">
                  <div className="text-red-900 font-bold">Preliminary Triage Recommendation:</div>
                  <div className="text-slate-700 text-[11px] leading-relaxed">
                    Immediate escalation to CHC Sandwa Chandrika pediatric ward. Teleconsultation initiated with AIIMS Hub.
                  </div>
                </div>

                <Link
                  to="/login?role=WORKER"
                  className="block text-center w-full bg-gov-navy hover:bg-gov-navyDark text-white py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm"
                >
                  {isHindi ? 'पूर्ण फील्ड वर्कफ्लो देखें →' : 'Launch Full Interactive Field Assessment →'}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Strip */}
        <section className="bg-white border-b border-slate-200 py-8 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {quickStats.map((st, i) => (
              <div key={i} className="text-center p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="text-2xl sm:text-4xl font-black text-gov-navy tracking-tight">{st.value}</div>
                <div className="text-xs font-bold text-slate-800 mt-1">{st.label}</div>
                <div className="text-[11px] text-slate-500">{st.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ORS-Style Quick Services Grid */}
        <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-gov-navy">
              {isHindi ? 'राष्ट्रीय स्वास्थ्य सेवाओं के साथ समन्वित मॉड्यूल' : 'Frontline Clinical Workflow Modules'}
            </h2>
            <p className="text-xs text-slate-500 max-w-xl mx-auto">
              {isHindi
                ? 'अग्रिम पंक्ति के कार्यकर्ताओं के लिए डिज़ाइन किए गए सरल, तेज और सुरक्षित स्वास्थ्य उपकरण।'
                : 'Engineered specifically for rural ASHA workers operating in variable connectivity field environments.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {quickServices.map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <Link
                  key={idx}
                  to={srv.link}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-gov-navy transition-all group flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className={`w-12 h-12 rounded-xl ${srv.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-gov-navy transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {srv.desc}
                    </p>
                  </div>
                  <div className="text-xs font-bold text-gov-navy flex items-center gap-1 group-hover:text-gov-saffron transition-colors pt-2 border-t border-slate-100">
                    <span>{isHindi ? 'मॉड्यूल खोलें' : 'Access Module'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Condition & Department Coverage Section (AIIMS-Style) */}
        <section className="bg-slate-100/70 border-y border-slate-200 py-12 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <div className="text-xs font-bold text-gov-navy uppercase tracking-wider">
                {isHindi ? 'समर्थित स्वास्थ्य श्रेणियां' : 'Supported Clinical Categories'}
              </div>
              <h2 className="text-2xl font-black text-slate-900">
                {isHindi ? 'राष्ट्रीय स्वास्थ्य प्रोटोकॉल पर आधारित दायरा' : 'Evidence-Based Condition Coverage'}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {departments.map((dept, i) => {
                const Icon = dept.icon;
                return (
                  <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-gov-navy flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">{dept.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{dept.desc}</p>
                    <div className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
                      {dept.cases}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Nearby Facilities Locator Preview */}
        <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-gov-navy">
                {isHindi ? 'संबद्ध स्वास्थ्य केंद्र नेटवर्क — प्रतापगढ़' : 'Linked Healthcare Facilities — Pratapgarh Network'}
              </h2>
              <p className="text-xs text-slate-500">
                {isHindi ? 'रेफरल एवं टेलीकंसल्टेशन हेतु निकटवर्ती अस्पताल व प्राथमिक स्वास्थ्य केंद्र' : 'Designated referral receiving facilities linked to Swasthya Mitra AI ecosystem'}
              </p>
            </div>
            <Link
              to="/login?role=WORKER"
              className="text-xs font-bold text-gov-navy hover:text-gov-saffron flex items-center gap-1"
            >
              <span>{isHindi ? 'सभी केंद्र देखें' : 'View Full Facility Directory'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {facilities.slice(0, 3).map((fac) => (
              <FacilityCard key={fac.id} facility={fac} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
