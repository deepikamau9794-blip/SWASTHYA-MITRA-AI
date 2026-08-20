import React, { useState, useEffect } from 'react';
import type { AssessmentRecord } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { usePatients } from '../../context/PatientContext';
import { TriageBadge } from '../common/TriageBadge';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  User,
  ShieldCheck,
  Stethoscope,
  Activity,
  FileText,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface TeleconsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  assessment: AssessmentRecord;
}

export const TeleconsultationModal: React.FC<TeleconsultationModalProps> = ({
  isOpen,
  onClose,
  assessment,
}) => {
  const { language, t } = useLanguage();
  const { updateTeleconsult } = usePatients();

  const [callStatus, setCallStatus] = useState<'CONNECTING' | 'CONNECTED' | 'ENDED'>('CONNECTING');
  const [callSeconds, setCallSeconds] = useState(0);
  const [micMuted, setMicMuted] = useState(false);
  const [videoDisabled, setVideoDisabled] = useState(false);
  const [doctorNotes, setDoctorNotes] = useState(
    "Patient presented with pediatric febrile illness. Advised immediate oxygenation stabilization at CHC and IV fluids. Admission initiated."
  );

  useEffect(() => {
    let connectTimeout: NodeJS.Timeout;
    let timer: NodeJS.Timeout;

    if (isOpen) {
      setCallStatus('CONNECTING');
      setCallSeconds(0);

      // Simulate connection to AIIMS on-call pediatrician / Medical Officer in 2.5s
      connectTimeout = setTimeout(() => {
        setCallStatus('CONNECTED');
        updateTeleconsult(assessment.id, 'CONNECTED');
      }, 2500);
    }

    return () => {
      clearTimeout(connectTimeout);
      clearInterval(timer);
    };
  }, [isOpen]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (callStatus === 'CONNECTED') {
      timer = setInterval(() => {
        setCallSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [callStatus]);

  if (!isOpen) return null;

  const formatDuration = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    setCallStatus('ENDED');
    updateTeleconsult(assessment.id, 'COMPLETED', doctorNotes);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50 animate-fade-in">
      <div className="bg-slate-900 rounded-2xl max-w-5xl w-full h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-slate-700 text-white">
        {/* Top Header */}
        <div className="bg-[#07253B] px-6 py-3 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center font-bold">
              <Video className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>{t('videoCallConnected')}</span>
                {callStatus === 'CONNECTED' && (
                  <span className="flex items-center gap-1 text-[10px] bg-red-600/80 text-white px-2 py-0.5 rounded-full font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    {formatDuration(callSeconds)}
                  </span>
                )}
              </h3>
              <p className="text-[11px] text-slate-400">
                Dr. Arvind Shrivastava (Senior MO, AIIMS Telemedicine Hub) • ASHA Sunita Maurya
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <TriageBadge level={assessment.triageLevel} size="sm" />
          </div>
        </div>

        {/* Main Split Layout: Left Video Grid / Right Patient Context Drawer */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 overflow-hidden bg-slate-950">
          {/* Left: Video Consult Mockup (2 Cols) */}
          <div className="lg:col-span-2 p-4 flex flex-col justify-between relative bg-gradient-to-b from-slate-900 to-slate-950">
            {/* Connecting State or Video Feed */}
            {callStatus === 'CONNECTING' ? (
              <div className="flex-1 flex flex-col items-center justify-center space-y-4 text-center">
                <div className="w-20 h-20 rounded-full bg-gov-navyLight border-4 border-gov-saffron flex items-center justify-center animate-pulse">
                  <Stethoscope className="w-10 h-10 text-gov-saffron" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white">{t('connectingDoctor')}</h4>
                  <p className="text-xs text-slate-400">
                    Routing call to AIIMS Super-Specialty Tele-Triage Desk...
                  </p>
                </div>
              </div>
            ) : callStatus === 'CONNECTED' ? (
              <div className="flex-1 grid grid-rows-1 relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
                {/* Doctor Main Feed */}
                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800/80 relative">
                  <div className="w-24 h-24 rounded-full bg-gov-navy border-4 border-emerald-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    Dr. A
                  </div>
                  <div className="mt-3 text-center">
                    <div className="text-sm font-bold text-white">Dr. Arvind Shrivastava, MD (Pediatrics)</div>
                    <div className="text-xs text-emerald-400 font-semibold">AIIMS Gorakhpur Tele-OPD Hub</div>
                  </div>

                  {/* Doctor Speaking Wave Simulation */}
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center space-x-2 text-xs font-mono text-emerald-400 border border-emerald-500/30">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Doctor Feed Live (Encrypted ABDM Stream)</span>
                  </div>

                  {/* PIP: Frontline Worker Feed */}
                  <div className="absolute bottom-4 right-4 w-36 sm:w-44 h-28 sm:h-32 bg-slate-950 rounded-xl border-2 border-slate-600 overflow-hidden shadow-2xl flex flex-col items-center justify-center p-2">
                    <div className="w-10 h-10 rounded-full bg-gov-saffron text-slate-950 font-bold flex items-center justify-center text-xs">
                      ASHA
                    </div>
                    <div className="text-[10px] text-white font-bold mt-1 text-center truncate">
                      ASHA Sunita (Field)
                    </div>
                    <div className="text-[9px] text-slate-400">Purey Pandey</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center space-y-3 text-center">
                <CheckCircle2 className="w-14 h-14 text-emerald-400" />
                <h4 className="text-base font-bold text-white">Consultation Completed Successfully</h4>
                <p className="text-xs text-slate-400">Doctor's clinical instructions attached to patient EHR.</p>
              </div>
            )}

            {/* Bottom Call Controls Bar */}
            <div className="mt-4 bg-slate-900/90 backdrop-blur-md rounded-2xl p-3 flex items-center justify-center space-x-4 border border-slate-800">
              <button
                onClick={() => setMicMuted(!micMuted)}
                className={`p-3 rounded-full transition-colors ${
                  micMuted ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                }`}
                title={micMuted ? 'Unmute' : 'Mute'}
              >
                {micMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setVideoDisabled(!videoDisabled)}
                className={`p-3 rounded-full transition-colors ${
                  videoDisabled ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                }`}
                title={videoDisabled ? 'Turn video on' : 'Turn video off'}
              >
                {videoDisabled ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
              </button>

              <button
                onClick={handleEndCall}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-bold text-xs flex items-center space-x-2 transition-all shadow-lg transform hover:scale-105"
              >
                <PhoneOff className="w-4 h-4" />
                <span>{t('endConsultation')}</span>
              </button>
            </div>
          </div>

          {/* Right: Live Patient Context & Clinical Notes Drawer (1 Col) */}
          <div className="border-l border-slate-800 bg-[#072033] p-4 sm:p-5 flex flex-col justify-between overflow-y-auto space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                <span className="text-xs font-bold text-gov-saffron uppercase tracking-wider">
                  Live Patient EHR Context
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                  {assessment.patientId}
                </span>
              </div>

              {/* Patient Basic Info */}
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-1 text-xs">
                <div className="text-sm font-extrabold text-white">{assessment.patientName}</div>
                <div className="text-slate-400">{assessment.patientAge} Yrs • {assessment.patientGender} • {assessment.patientVillage}</div>
              </div>

              {/* Live Vitals Grid */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-300">Measured Vitals:</span>
                <div className="grid grid-cols-2 gap-1.5 font-mono text-[11px]">
                  <div className="bg-slate-900 p-2 rounded border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Temp:</span>
                    <strong className="text-white text-xs">{assessment.vitals.temperature || 'N/A'}°F</strong>
                  </div>
                  <div className="bg-slate-900 p-2 rounded border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">SpO2:</span>
                    <strong className="text-red-400 text-xs">{assessment.vitals.spo2 || 'N/A'}%</strong>
                  </div>
                  <div className="bg-slate-900 p-2 rounded border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Resp Rate:</span>
                    <strong className="text-amber-400 text-xs">{assessment.vitals.respiratoryRate || 'N/A'} bpm</strong>
                  </div>
                  <div className="bg-slate-900 p-2 rounded border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Heart Rate:</span>
                    <strong className="text-white text-xs">{assessment.vitals.heartRate || 'N/A'} bpm</strong>
                  </div>
                </div>
              </div>

              {/* Identified Red Flags */}
              {assessment.redFlagsIdentified.length > 0 && (
                <div className="bg-red-950/70 border border-red-800 p-3 rounded-xl text-xs space-y-1">
                  <span className="text-red-400 font-bold flex items-center gap-1 text-[11px]">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Danger Signs Triggered:</span>
                  </span>
                  <ul className="list-disc list-inside text-red-200 text-[11px] space-y-0.5 font-medium">
                    {assessment.redFlagsIdentified.map((flag, i) => (
                      <li key={i}>{flag}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Doctor Consultation Notes Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-200 block">
                  Attending Doctor's Clinical Note:
                </label>
                <textarea
                  rows={4}
                  value={doctorNotes}
                  onChange={(e) => setDoctorNotes(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:ring-1 focus:ring-gov-saffron focus:outline-none leading-relaxed"
                  placeholder="Record immediate clinical triage remarks and referral instructions..."
                />
                <div className="text-[10px] text-slate-400 italic">
                  * Clinical decision-support: notes are saved directly to patient longitudinal record.
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <button
                onClick={handleEndCall}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-xl text-xs shadow-md transition-colors"
              >
                Save Clinical Note & Complete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
