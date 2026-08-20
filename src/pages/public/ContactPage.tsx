import React, { useState } from 'react';
import { TopUtilityBar } from '../../components/layout/TopUtilityBar';
import { EmergencyBanner } from '../../components/layout/EmergencyBanner';
import { HeaderBand } from '../../components/layout/HeaderBand';
import { Footer } from '../../components/layout/Footer';
import { useLanguage } from '../../context/LanguageContext';
import { Phone, Mail, MapPin, Building2, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { language } = useLanguage();
  const isHindi = language === 'hi';
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <TopUtilityBar />
      <EmergencyBanner />
      <HeaderBand />

      <main id="main-content" className="flex-1 max-w-5xl mx-auto px-4 sm:px-8 py-10 space-y-8">
        <div className="border-b border-slate-200 pb-4">
          <h1 className="text-3xl font-black text-gov-navy">
            {isHindi ? 'हेल्पडेस्क एवं संपर्क' : 'Contact & Technical Helpdesk'}
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            {isHindi ? 'प्रतापगढ़ जिला स्वास्थ्य समिति एवं स्वास्थ्या मित्र एआई सहायता केंद्र' : 'District Health Society Pratapgarh & Swasthya Mitra AI Pilot Support.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Institutional Contact Details */}
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
                {isHindi ? 'आधिकारिक संपर्क विवरण' : 'Institutional Contacts'}
              </h3>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="flex items-start space-x-3">
                  <Building2 className="w-4 h-4 text-gov-navy flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">Office of the Chief Medical Officer (CMO):</strong>
                    <span>District Hospital Campus, Pratapgarh - 230001, Uttar Pradesh</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-4 h-4 text-gov-navy flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">Health Worker Toll-Free Helpdesk:</strong>
                    <span className="font-mono">1800-180-1104 / 05342-220145</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-4 h-4 text-gov-navy flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">Official Electronic Mail:</strong>
                    <span className="font-mono">cmo.pratapgarh@nic.in / swasthyamitra.recp@gov.in</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl space-y-2 text-xs text-emerald-900">
              <strong className="font-bold text-sm block">Swasthya Mitra AI Initiative</strong>
              <p className="leading-relaxed">
                Developed by the Student Developer Cell at <strong>Rajkiya Engineering College Pratapgarh (RECP)</strong> in collaboration with District Health Society, Pratapgarh.
              </p>
            </div>
          </div>

          {/* Quick Query Form */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              {isHindi ? 'सहायता अनुरोध भेजें' : 'Send Helpdesk Query'}
            </h3>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2 text-emerald-900">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold">Query Submitted Successfully</h4>
                <p className="text-xs text-slate-600">Your ticket has been logged with the District Health Coordinator.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Your Full Name:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sunita Maurya (ASHA)"
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-gov-navy focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Mobile / ASHA ID:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. +91 98390 12345"
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-gov-navy focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Assigned PHC / Village:</label>
                  <input
                    type="text"
                    placeholder="e.g. PHC Sadar, Pratapgarh"
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-gov-navy focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Description of Issue / Feedback:</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe field sync issue, guideline question, or feedback..."
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-gov-navy focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gov-navy hover:bg-gov-navyDark text-white py-2.5 rounded-lg font-bold text-xs shadow-sm transition-colors"
                >
                  Submit Query to Helpdesk
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
