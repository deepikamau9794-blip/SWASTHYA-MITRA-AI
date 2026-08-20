import React from 'react';
import { TopUtilityBar } from '../../components/layout/TopUtilityBar';
import { EmergencyBanner } from '../../components/layout/EmergencyBanner';
import { HeaderBand } from '../../components/layout/HeaderBand';
import { Footer } from '../../components/layout/Footer';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, HeartHandshake, Award, Cpu, CheckCircle2, Lock, FileCheck } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { language } = useLanguage();
  const isHindi = language === 'hi';

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <TopUtilityBar />
      <EmergencyBanner />
      <HeaderBand />

      <main id="main-content" className="flex-1 max-w-5xl mx-auto px-4 sm:px-8 py-10 space-y-10">
        {/* Page Header */}
        <div className="border-b border-slate-200 pb-6 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-gov-saffron">
            BharatGen Rural Health Initiative • RECP Pratapgarh
          </div>
          <h1 className="text-3xl font-black text-gov-navy">
            {isHindi ? 'भारतजेन ग्रामीण स्वास्थ्य एआई पहल के बारे में' : 'About BharatGen Rural Health AI'}
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            {isHindi
              ? 'राष्ट्रीय स्वास्थ्य मिशन (NHM) एवं आयुष्मान भारत डिजिटल मिशन (ABDM) के सिद्धांतों पर आधारित ग्रामीण अग्रिम पंक्ति के स्वास्थ्य कार्यकर्ताओं के लिए नैदानिक निर्णय-समर्थन प्रणाली।'
              : 'A clinical decision-support ecosystem purpose-built for ASHA and ANM frontline workers in rural India.'}
          </p>
        </div>

        {/* Mission & Problem Statement */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-gov-navy flex items-center justify-center">
              <HeartHandshake className="w-5 h-5 text-gov-navy" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {isHindi ? 'ग्रामीण स्वास्थ्य की प्रमुख चुनौतियां' : 'The Rural Healthcare Challenge'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isHindi
                ? 'ग्रामीण क्षेत्रों में विशेषज्ञ डॉक्टरों की कमी, प्राथमिक स्वास्थ्य केंद्रों की दूरी, और मौसमी बुखार व बाल संक्रमण के दौरान समय पर सही निर्णय न हो पाना कई बार गंभीर जटिलताओं का कारण बनता है।'
                : 'Frontline ASHA workers are the primary point of contact for millions of rural citizens. However, lack of standardized decision-support and delayed referral triage can turn manageable infections into life-threatening emergencies.'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-emerald-700" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {isHindi ? 'हमारा समाधान: निर्णय-समर्थन' : 'The BharatGen Decision Support Approach'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isHindi
                ? 'भारतजेन एआई सरकारी प्रोटोकॉल (IMNCI, NVBDCP) के आधार पर प्राथमिक जांच करता है, पारदर्शी कारण बताता है, और आपातकालीन मामलों को सीधे एम्स गोरखपुर से टेलीकंसल्टेशन द्वारा जोड़ता है।'
                : 'BharatGen AI synthesizes input symptoms against verified Indian public health protocols, calculates transparent triage urgency, and links critical cases to apex tele-specialists.'}
            </p>
          </div>
        </div>

        {/* Medical Safety Guardrails (Strict Non-Negotiables) */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center space-x-2 text-gov-saffron font-bold text-sm uppercase tracking-wide">
            <ShieldCheck className="w-5 h-5" />
            <span>Strict Medical Safety & Ethical AI Guardrails</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            BharatGen Rural Health AI operates strictly as a <strong>decision-support and triage assistance tool</strong> for trained community health personnel.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="flex items-start space-x-2 bg-slate-800 p-3 rounded-xl border border-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span><strong>Zero Autonomous Prescriptions:</strong> The system NEVER autonomously dispenses drug dosages or prescriptions.</span>
            </div>
            <div className="flex items-start space-x-2 bg-slate-800 p-3 rounded-xl border border-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span><strong>Preliminary Triage Only:</strong> Results are explicitly labeled preliminary decision-support, not definitive diagnostic outcomes.</span>
            </div>
            <div className="flex items-start space-x-2 bg-slate-800 p-3 rounded-xl border border-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span><strong>No Fabricated Evidence:</strong> All explainability matches are tethered to documented public guidelines (IMNCI, NVBDCP, RMNCH+A).</span>
            </div>
            <div className="flex items-start space-x-2 bg-slate-800 p-3 rounded-xl border border-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span><strong>ABDM Data Privacy:</strong> Patient records adhere to Ayushman Bharat Digital Mission privacy principles with role-based access.</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
