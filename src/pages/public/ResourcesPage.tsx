import React from 'react';
import { TopUtilityBar } from '../../components/layout/TopUtilityBar';
import { EmergencyBanner } from '../../components/layout/EmergencyBanner';
import { HeaderBand } from '../../components/layout/HeaderBand';
import { Footer } from '../../components/layout/Footer';
import { useLanguage } from '../../context/LanguageContext';
import { BookOpen, FileText, Download, ExternalLink } from 'lucide-react';

export const ResourcesPage: React.FC = () => {
  const { language } = useLanguage();
  const isHindi = language === 'hi';

  const protocols = [
    {
      title: "IMNCI Guidelines — Integrated Management of Neonatal and Childhood Illness",
      org: "Ministry of Health & Family Welfare (MoHFW), Govt of India",
      desc: "Standard algorithmic protocols for identifying pediatric fast breathing, chest indrawing, stridor, diarrhea, and fever danger signs.",
      docType: "Clinical Standard",
    },
    {
      title: "National Vector Borne Disease Control Programme (NVBDCP) Protocol 2025",
      org: "Directorate General of Health Services (DGHS)",
      desc: "Guidelines for monsoon fever surveillance, rapid diagnostic testing (RDT) for Malaria & Dengue, and early clinical referral.",
      docType: "Surveillance Standard",
    },
    {
      title: "RMNCH+A Frontline Health Worker Training Manual",
      org: "National Health Mission (NHM) Uttar Pradesh",
      desc: "Comprehensive antenatal care, post-natal danger signs, and infant nutritional assessment standards for ASHA and ANM cohorts.",
      docType: "Operational Manual",
    },
    {
      title: "Ayushman Bharat Digital Mission (ABDM) Health Data Privacy Architecture",
      org: "National Health Authority (NHA)",
      desc: "Security, encryption, and consent management frameworks for frontline health records and ABHA linking.",
      docType: "Technical Standard",
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
            {isHindi ? 'संसाधन, नैदानिक दिशानिर्देश व दस्तावेज' : 'Clinical Resources & Verified Protocols'}
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            {isHindi ? 'भारतजेन एआई द्वारा उपयोग किए जाने वाले आधिकारिक सरकारी स्वास्थ्य प्रोटोकॉल' : 'Authoritative public health guidelines integrated into the BharatGen AI knowledge base.'}
          </p>
        </div>

        <div className="space-y-4">
          {protocols.map((proto, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gov-navy bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                  {proto.docType}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">Verified MoHFW Standard</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">{proto.title}</h3>
              <div className="text-xs text-slate-500 font-semibold">{proto.org}</div>
              <p className="text-xs text-slate-600 leading-relaxed">{proto.desc}</p>
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => alert(`Downloading reference protocol document: ${proto.title}`)}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-gov-navy hover:text-gov-navyDark"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Protocol Reference (PDF)</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};
