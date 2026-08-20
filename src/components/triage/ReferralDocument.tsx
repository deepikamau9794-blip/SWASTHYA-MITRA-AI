import React from 'react';
import type { AssessmentRecord, Facility } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { TriageBadge } from '../common/TriageBadge';
import { ABHABadge } from '../common/ABHABadge';
import { ShieldCheck, Printer, Download, Share2, Building2, MapPin, Phone, UserCheck, AlertCircle } from 'lucide-react';

interface ReferralDocumentProps {
  assessment: AssessmentRecord;
  facility?: Facility;
  onClose?: () => void;
}

export const ReferralDocument: React.FC<ReferralDocumentProps> = ({
  assessment,
  facility,
  onClose,
}) => {
  const { language } = useLanguage();

  const handlePrint = () => {
    window.print();
  };

  const handleMockDownload = () => {
    alert("Official Government Referral Slip (PDF) downloaded to device storage.");
  };

  const handleMockShare = () => {
    alert("Referral slip transmitted securely via Ayushman Bharat Digital Mission (ABDM) Health Information Exchange to Receiving Medical Officer.");
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-300 shadow-xl overflow-hidden max-w-3xl mx-auto my-4 referral-card">
      {/* Top Action Bar for Screen View */}
      <div className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between no-print select-none">
        <div className="flex items-center space-x-2 text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-gov-saffron" />
          <span>Government Health Referral Slip Preview</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleMockDownload}
            className="flex items-center space-x-1 bg-gov-navyLight hover:bg-gov-navy text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center space-x-1 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>
          <button
            onClick={handleMockShare}
            className="flex items-center space-x-1 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share via ABDM</span>
          </button>
        </div>
      </div>

      {/* Printable Institutional Referral Form Body */}
      <div className="p-8 space-y-6 text-slate-900 bg-white">
        {/* Government Letterhead Header */}
        <div className="text-center border-b-2 border-slate-900 pb-4 space-y-1">
          <div className="text-[11px] font-bold tracking-widest text-slate-600 uppercase">
            Ministry of Health & Family Welfare • Government of Uttar Pradesh
          </div>
          <h2 className="text-xl font-black text-gov-navy uppercase tracking-tight">
            BharatGen Rural Health AI — Clinical Referral Slip
          </h2>
          <div className="text-xs text-slate-600 font-semibold">
            District Health Society, Pratapgarh • Frontline Clinical Decision Support System
          </div>
          <div className="flex items-center justify-center gap-4 text-xs font-mono text-slate-500 pt-1">
            <span>Referral ID: <strong className="text-slate-900">REF-{assessment.id.slice(-8)}</strong></span>
            <span>•</span>
            <span>Date/Time: <strong className="text-slate-900">{assessment.date}, {assessment.timestamp}</strong></span>
          </div>
        </div>

        {/* Patient Demographic Block */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-300 text-xs">
          <div>
            <span className="text-slate-500 block text-[11px]">Patient Name:</span>
            <span className="font-extrabold text-slate-900 text-sm">{assessment.patientName}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Patient ID / Age:</span>
            <span className="font-bold text-slate-900">{assessment.patientId} ({assessment.patientAge} Yrs / {assessment.patientGender})</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Village / Location:</span>
            <span className="font-bold text-slate-900">{assessment.patientVillage}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Triage Priority:</span>
            <div className="mt-0.5">
              <TriageBadge level={assessment.triageLevel} size="sm" />
            </div>
          </div>
        </div>

        {/* Clinical Presentation & Vitals */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1">
            1. Clinical Presentation & Symptoms
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="space-y-1">
              <span className="text-slate-500 font-semibold">Reported Symptoms:</span>
              <ul className="list-disc list-inside text-slate-800 font-medium space-y-0.5">
                {assessment.symptoms.map(s => (
                  <li key={s.id}>
                    {s.name} ({s.nameHi}) — <span className="font-bold">{s.severity}</span> for {s.durationDays} days
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-1">
              <span className="text-slate-500 font-semibold">Recorded Vitals Baseline:</span>
              <div className="grid grid-cols-2 gap-1.5 font-mono text-[11px]">
                <div className="bg-slate-100 p-1.5 rounded">Temp: <strong>{assessment.vitals.temperature || 'N/A'}°F</strong></div>
                <div className="bg-slate-100 p-1.5 rounded">SpO2: <strong>{assessment.vitals.spo2 || 'N/A'}%</strong></div>
                <div className="bg-slate-100 p-1.5 rounded">Resp Rate: <strong>{assessment.vitals.respiratoryRate || 'N/A'} bpm</strong></div>
                <div className="bg-slate-100 p-1.5 rounded">Heart Rate: <strong>{assessment.vitals.heartRate || 'N/A'} bpm</strong></div>
              </div>
            </div>
          </div>

          {assessment.generalObservations && (
            <div className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <strong className="text-slate-900">Frontline Observations: </strong>
              <span>{assessment.generalObservations}</span>
            </div>
          )}
        </div>

        {/* Reason for Referral & Triage Rationale */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1">
            2. Reason for Referral & Clinical Triage Rationale
          </h4>
          <div className="bg-amber-50/70 p-3 rounded-lg border border-amber-300 text-xs space-y-1.5 text-amber-950">
            <div className="font-bold">
              {assessment.referralDetails?.reason || assessment.urgencyLabel}
            </div>
            <ul className="list-disc list-inside space-y-0.5 text-[11px] font-medium text-slate-800">
              {assessment.rationaleBullets.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Suggested Receiving Facility */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1">
            3. Designated Receiving Healthcare Facility
          </h4>
          <div className="bg-blue-50/60 p-3.5 rounded-xl border border-blue-200 flex items-start justify-between text-xs">
            <div className="space-y-1">
              <div className="font-extrabold text-gov-navy text-sm">
                {facility?.name || assessment.referralDetails?.facilityName || "Primary Health Centre (PHC) Sadar"}
              </div>
              <div className="text-slate-600 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{facility?.address || "Civil Lines, Pratapgarh"}</span>
              </div>
              <div className="text-slate-600 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-mono">{facility?.phone || "05342-220145"}</span>
              </div>
            </div>
            <div className="text-right font-semibold text-[11px]">
              <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded font-bold uppercase block mb-1">
                Urgency: {assessment.referralDetails?.urgency || 'WITHIN_24H'}
              </span>
              <span className="text-slate-500">Transport: Free 108 Govt Ambulance</span>
            </div>
          </div>
        </div>

        {/* Attending Frontline Worker Signature & Legal Disclaimer */}
        <div className="pt-6 border-t-2 border-slate-900 grid grid-cols-2 gap-4 text-xs">
          <div>
            <div className="text-slate-500 text-[11px]">Referring Health Worker:</div>
            <div className="font-bold text-slate-900 mt-1">Sunita Maurya (Senior ASHA)</div>
            <div className="text-slate-600 font-mono text-[10px]">Badge: ASHA-UP-PRT-8821 • PHC Sadar</div>
          </div>
          <div className="text-right">
            <div className="text-slate-500 text-[11px]">Receiving Medical Officer Sign/Seal:</div>
            <div className="mt-8 border-b border-slate-400 w-48 ml-auto" />
            <div className="text-[10px] text-slate-400 mt-1">Date & Time of Reception</div>
          </div>
        </div>

        <div className="text-[10px] text-slate-500 text-center italic border-t border-slate-200 pt-2">
          * This document is generated for clinical decision support and patient referral tracking under the National Health Stack. No autonomous prescriptions are included.
        </div>
      </div>
    </div>
  );
};
