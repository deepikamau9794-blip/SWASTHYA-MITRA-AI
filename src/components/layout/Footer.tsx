import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, HeartHandshake, Phone, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-[#07253B] text-slate-300 border-t border-slate-700 text-xs select-none">
      {/* Tricolor accent bar */}
      <div className="tricolor-strip" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Government Alignment & Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gov-navyLight border border-gov-saffron rounded flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5 text-gov-saffron" />
              </div>
              <span className="text-base font-extrabold text-white">Swasthya Mitra AI</span>
            </div>
            <p className="text-[12px] text-slate-400 leading-relaxed">
              {language === 'hi'
                ? 'राष्ट्रीय स्वास्थ्य मिशन (NHM) एवं आयुष्मान भारत डिजिटल मिशन (ABDM) के सिद्धांतों पर आधारित ग्रामीण फ्रंटलाइन स्वास्थ्य निर्णय-समर्थन प्रणाली।'
                : 'A clinical decision-support ecosystem aligned with the National Health Stack and Ayushman Bharat Digital Mission (ABDM) principles for rural frontline health workers.'}
            </p>
            <div className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 rounded px-2.5 py-1.5 inline-block">
              ✓ Pratapgarh District Healthcare Pilot
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-sm tracking-wide border-b border-slate-700 pb-1">
              {language === 'hi' ? 'महत्वपूर्ण लिंक' : 'Institutional Portals'}
            </h4>
            <ul className="space-y-1.5 text-[12px] text-slate-300">
              <li><a href="https://ors.gov.in" target="_blank" rel="noreferrer" className="hover:text-gov-saffron flex items-center gap-1">ORS Patient Portal (ors.gov.in) <ExternalLink className="w-3 h-3 text-slate-500" /></a></li>
              <li><a href="https://abdm.gov.in" target="_blank" rel="noreferrer" className="hover:text-gov-saffron flex items-center gap-1">Ayushman Bharat Digital Mission <ExternalLink className="w-3 h-3 text-slate-500" /></a></li>
              <li><a href="https://aiimsgorakhpur.edu.in" target="_blank" rel="noreferrer" className="hover:text-gov-saffron flex items-center gap-1">AIIMS Gorakhpur Telemedicine <ExternalLink className="w-3 h-3 text-slate-500" /></a></li>
              <li><a href="https://nhm.gov.in" target="_blank" rel="noreferrer" className="hover:text-gov-saffron flex items-center gap-1">National Health Mission (NHM) <ExternalLink className="w-3 h-3 text-slate-500" /></a></li>
            </ul>
          </div>

          {/* Col 3: Guidelines & Clinical Safety */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-sm tracking-wide border-b border-slate-700 pb-1">
              {language === 'hi' ? 'नैदानिक सुरक्षा व प्रोटोकॉल' : 'Clinical Safety & Protocols'}
            </h4>
            <ul className="space-y-1.5 text-[12px] text-slate-300">
              <li><span className="text-slate-400">IMNCI Pediatric Guidelines (MoHFW)</span></li>
              <li><span className="text-slate-400">NVBDCP Vector-Borne Fever Standard</span></li>
              <li><span className="text-slate-400">RMNCH+A Maternal Danger Signs Standard</span></li>
              <li><span className="text-slate-400">Decision-Support Only — Zero Auto-Prescriptions</span></li>
            </ul>
          </div>

          {/* Col 4: 24x7 Helplines & Credits */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-sm tracking-wide border-b border-slate-700 pb-1">
              {language === 'hi' ? 'आपातकालीन हेल्पलाइन' : '24x7 Emergency Helplines'}
            </h4>
            <div className="space-y-2 text-[12px]">
              <div className="flex items-center space-x-2 text-white">
                <Phone className="w-3.5 h-3.5 text-gov-saffron" />
                <span>Ambulance: <strong className="text-gov-saffron font-bold text-sm">108</strong></span>
              </div>
              <div className="flex items-center space-x-2 text-white">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Health Information: <strong className="text-emerald-400 font-bold text-sm">104</strong></span>
              </div>
              <div className="flex items-center space-x-2 text-white">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>National Teleconsultation: <strong className="text-blue-400 font-bold text-sm">1075</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Attribution Strip */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-400 gap-4">
          <div>
            © 2026 Swasthya Mitra AI • Developed by <strong className="text-slate-200">RECP Pratapgarh &amp; District Health Society</strong>
          </div>
          <div className="flex items-center space-x-4">
            <span className="hover:text-slate-200 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-200 cursor-pointer">Terms of Use</span>
            <span>•</span>
            <span className="hover:text-slate-200 cursor-pointer">RTI</span>
            <span>•</span>
            <span className="hover:text-slate-200 cursor-pointer">Accessibility Statement</span>
            <span>•</span>
            <span className="hover:text-slate-200 cursor-pointer">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
