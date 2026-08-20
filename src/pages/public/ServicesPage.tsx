import React from 'react';
import { TopUtilityBar } from '../../components/layout/TopUtilityBar';
import { EmergencyBanner } from '../../components/layout/EmergencyBanner';
import { HeaderBand } from '../../components/layout/HeaderBand';
import { Footer } from '../../components/layout/Footer';
import { useLanguage } from '../../context/LanguageContext';
import { Stethoscope, Video, FileText, RefreshCw, Smartphone, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ServicesPage: React.FC = () => {
  const { language } = useLanguage();
  const isHindi = language === 'hi';

  const services = [
    {
      icon: Stethoscope,
      title: isHindi ? '6-चरणीय निर्देशित स्वास्थ्य जांच (Guided Assessment)' : '6-Step Guided Clinical Triage',
      desc: isHindi ? 'मरीज के लक्षणों, वाइटल्स एवं रेड-फ्लैग्स का चरणबद्ध एवं सरल मूल्यांकन।' : 'Step-by-step triage wizard designed for mobile tablets with Hindi voice input integration.',
    },
    {
      icon: Video,
      title: isHindi ? 'एम्स गोरखपुर टेलीकंसल्टेशन (Tele-OPD Link)' : 'Apex Teleconsultation Escalation',
      desc: isHindi ? 'रेड (आपातकालीन) मामलों में सीधे ऑन-कॉल बाल रोग या मेडिसिन डॉक्टर से लाइव वीडियो संपर्क।' : 'Instant video escalation connecting frontline workers with hospital medical officers.',
    },
    {
      icon: FileText,
      title: isHindi ? 'डिजिटल रेफरल पर्ची व आभा इंटीग्रेशन' : 'Official Referral Slips & ABHA Integration',
      desc: isHindi ? 'नज़दीकी स्वास्थ्य केंद्र के लिए क्यूआर व आभा आईडी युक्त प्रमाणित रेफरल पर्ची।' : 'Standardized printable summaries with automatic receiving facility distance matching.',
    },
    {
      icon: RefreshCw,
      title: isHindi ? 'दीर्घकालिक फॉलो-अप तुलना (Continuity of Care)' : 'Longitudinal Follow-up Tracker',
      desc: isHindi ? 'पिछली जांच बनाम वर्तमान जांच का साइड-बाय-साइड विश्लेषण।' : 'Side-by-side assessment comparison to ensure continuity of care and symptom resolution.',
    },
    {
      icon: Smartphone,
      title: isHindi ? 'ऑफलाइन-फर्स्ट कैशिंग व सिंक' : 'Offline-First Field Resilience',
      desc: isHindi ? 'बिना इंटरनेट के भी पूर्ण जांच करें; नेटवर्क मिलने पर डेटा स्वतः सिंक होगा।' : 'Full local database caching enabling triage in zero-network rural zones.',
    },
    {
      icon: ShieldCheck,
      title: isHindi ? 'सत्यापित साक्ष्य व आरएजी प्रोटोकॉल' : 'Transparent RAG Medical Evidence',
      desc: isHindi ? 'प्रत्येक निर्णय के पीछे सरकारी दिशानिर्देशों का पारदर्शी उल्लेख।' : 'Tethered strictly to Indian public health guidelines (IMNCI, NVBDCP, RMNCH+A).',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <TopUtilityBar />
      <EmergencyBanner />
      <HeaderBand />

      <main id="main-content" className="flex-1 max-w-5xl mx-auto px-4 sm:px-8 py-10 space-y-8">
        <div className="border-b border-slate-200 pb-4">
          <h1 className="text-3xl font-black text-gov-navy">
            {isHindi ? 'मरीज व कार्यकर्ता स्वास्थ्य सेवाएं' : 'Frontline Patient & Worker Services'}
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            {isHindi ? 'राष्ट्रीय स्वास्थ्य मानकों के अनुरूप डिजिटल स्वास्थ्य उपकरण' : 'Institutional-grade decision-support modules designed for the rural Indian continuum of care.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-gov-navy flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{srv.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{srv.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-gov-navy text-white rounded-2xl p-6 text-center space-y-4 shadow-lg">
          <h3 className="text-lg font-bold">Ready to test the frontline triage workflow?</h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto">
            Log in with demo ASHA credentials to experience the complete 6-step assessment, Hindi voice input, and teleconsultation escalation.
          </p>
          <Link
            to="/login?role=WORKER"
            className="inline-block bg-gov-saffron text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs shadow-md hover:bg-amber-500 transition-colors"
          >
            Launch Health Worker Portal
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};
