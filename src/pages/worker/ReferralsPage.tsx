import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { usePatients } from '../../context/PatientContext';
import { AppHeader } from '../../components/layout/AppHeader';
import { AppSidebar } from '../../components/layout/AppSidebar';
import { ReferralDocument } from '../../components/triage/ReferralDocument';
import { TriageBadge } from '../../components/common/TriageBadge';
import { Send, FileText, Download, Printer, Eye, X } from 'lucide-react';
import type { AssessmentRecord } from '../../types';

export const ReferralsPage: React.FC = () => {
  const { language } = useLanguage();
  const { assessments, facilities } = usePatients();
  const isHindi = language === 'hi';

  const [selectedRecord, setSelectedRecord] = useState<AssessmentRecord | null>(null);

  const referralRecords = assessments.filter(a => a.referralDetails?.isReferred);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <AppHeader pageTitle={isHindi ? 'रेफरल पर्चियां व ट्रैकिंग' : 'Clinical Referral Slips & Tracking'} />

      <div className="flex-1 flex overflow-hidden">
        <AppSidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h1 className="text-2xl font-black text-gov-navy flex items-center gap-2">
              <Send className="w-6 h-6 text-gov-saffron" />
              <span>{isHindi ? 'आधिकारिक नैदानिक रेफरल पर्चियां' : 'Official Clinical Referral Slips'}</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Generated government referral documentation dispatched to CHC/PHC receiving centers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {referralRecords.map((item) => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-slate-500 text-[11px]">{item.patientId}</span>
                    <TriageBadge level={item.triageLevel} size="sm" />
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-900">{item.patientName}</h3>
                  <div className="text-slate-600">
                    Receiving Facility: <strong className="text-gov-navy">{item.referralDetails?.facilityName}</strong>
                  </div>
                  <div className="text-slate-500 text-[11px]">
                    Reason: {item.referralDetails?.reason}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded uppercase">
                    {item.referralDetails?.urgency}
                  </span>
                  <button
                    onClick={() => setSelectedRecord(item)}
                    className="bg-gov-navy text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-gov-navyDark flex items-center space-x-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Slip</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Modal / Overlay for Full Printable Document */}
          {selectedRecord && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
              <div className="relative max-w-4xl w-full my-8">
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="absolute -top-10 right-0 text-white bg-slate-800 hover:bg-slate-700 p-2 rounded-full no-print"
                >
                  <X className="w-5 h-5" />
                </button>
                <ReferralDocument
                  assessment={selectedRecord}
                  facility={facilities.find(f => f.id === selectedRecord.referralDetails?.suggestedFacilityId)}
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
