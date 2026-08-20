import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Check, X, Sparkles, Volume2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface VoiceInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplySymptoms: (transcript: string, detectedSymptoms: string[]) => void;
}

const SAMPLE_VOICE_SCRIPTS = [
  {
    title: "Pediatric Emergency (बच्चे को तेज बुखार व सांस में तकलीफ)",
    hindi: "मरीज दो साल का बच्चा है, तीन दिन से 103 डिग्री तेज बुखार है, सांस बहुत तेज चल रही है और सीना धंस रहा है। बच्चा दूध नहीं पी रहा और बहुत सुस्त है।",
    detected: ["Fever (तेज़ बुखार)", "Breathing Difficulty (सांस लेने में कठिनाई)", "Lethargy (सुस्ती)", "Poor Oral Intake"]
  },
  {
    title: "Adult Febrile Illness (लंबे समय से बुखार व बदन दर्द)",
    hindi: "मरीज को चार दिनों से रुक-रुक कर तेज बुखार आ रहा है, कंपकंपी लगती है और सिर में भयंकर दर्द है। मरीज को पहले से शुगर की बीमारी है।",
    detected: ["Fever (बुखार 4 दिन)", "Headache (सिरदर्द)", "Chills (कंपकंपी)", "Diabetes History"]
  },
  {
    title: "Seasonal Mild Cold (सामान्य मौसमी जुकाम)",
    hindi: "दो दिन से हल्की खांसी और नाक बह रही है, हल्का सिरदर्द है लेकिन बुखार नहीं है। खाना पीना सामान्य है।",
    detected: ["Cough (हल्की खांसी)", "Runny Nose (जुकाम)", "Mild Headache"]
  }
];

export const VoiceInputModal: React.FC<VoiceInputModalProps> = ({
  isOpen,
  onClose,
  onApplySymptoms,
}) => {
  const { language } = useLanguage();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [selectedScriptIndex, setSelectedScriptIndex] = useState(0);
  const [recognizedText, setRecognizedText] = useState("");
  const [extractedSymptoms, setExtractedSymptoms] = useState<string[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRecording) {
      timer = setInterval(() => {
        setRecordingSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  if (!isOpen) return null;

  const handleStartSimulation = (index: number) => {
    setSelectedScriptIndex(index);
    setIsRecording(true);
    setRecordingSeconds(0);
    setRecognizedText("");
    setExtractedSymptoms([]);

    setTimeout(() => {
      setRecognizedText(SAMPLE_VOICE_SCRIPTS[index].hindi);
      setExtractedSymptoms(SAMPLE_VOICE_SCRIPTS[index].detected);
      setIsRecording(false);
    }, 2500);
  };

  const handleApply = () => {
    if (recognizedText) {
      onApplySymptoms(recognizedText, extractedSymptoms);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="bg-[#07253B] text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center animate-pulse">
              <Mic className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base">
                {language === 'hi' ? 'हिंदी व स्थानीय बोली वॉयस इनपुट' : 'Hindi & Dialect Voice Input'}
              </h3>
              <p className="text-xs text-slate-300">
                {language === 'hi' ? 'मरीज के लक्षण बोलकर दर्ज करें (BharatGen Speech AI)' : 'Speak symptoms in natural rural Hindi / Awadhi'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Quick Audio Script Simulator Options */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">
              {language === 'hi' ? 'नमूना ग्रामीण आवाज परिदृश्य चुनें:' : 'Select Sample Rural Speech Scenario:'}
            </label>
            <div className="grid grid-cols-1 gap-2">
              {SAMPLE_VOICE_SCRIPTS.map((script, idx) => (
                <button
                  key={idx}
                  onClick={() => handleStartSimulation(idx)}
                  disabled={isRecording}
                  className={`text-left p-2.5 rounded-xl border text-xs transition-all flex items-center justify-between ${
                    selectedScriptIndex === idx
                      ? 'border-gov-navy bg-blue-50/80 ring-1 ring-gov-navy'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className="font-semibold text-slate-800">{script.title}</span>
                  <span className="text-[10px] bg-gov-navy text-white px-2 py-0.5 rounded font-bold">
                    {isRecording && selectedScriptIndex === idx ? `Recording... (${recordingSeconds}s)` : 'Speak / Test'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Live Audio Visualizer Wave */}
          <div className="bg-slate-900 rounded-xl p-4 text-center text-white space-y-3">
            <div className="flex items-center justify-center space-x-1.5 h-10">
              {isRecording ? (
                <>
                  <span className="w-1 bg-red-500 rounded-full h-8 animate-pulse" />
                  <span className="w-1 bg-amber-400 rounded-full h-10 animate-pulse delay-75" />
                  <span className="w-1 bg-emerald-400 rounded-full h-6 animate-pulse delay-100" />
                  <span className="w-1 bg-cyan-400 rounded-full h-9 animate-pulse delay-150" />
                  <span className="w-1 bg-red-400 rounded-full h-4 animate-pulse delay-200" />
                </>
              ) : (
                <span className="text-xs text-slate-400">
                  {recognizedText ? '✓ Audio processing complete' : 'Tap a scenario above to simulate speech input'}
                </span>
              )}
            </div>

            {recognizedText && (
              <div className="text-left bg-slate-800/90 p-3.5 rounded-lg border border-slate-700 space-y-2 text-xs">
                <div className="text-gov-saffron font-bold flex items-center gap-1.5 text-[11px]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Transcribed Hindi Speech:</span>
                </div>
                <p className="text-slate-100 font-hindi italic leading-relaxed">
                  "{recognizedText}"
                </p>
              </div>
            )}
          </div>

          {/* Extracted Clinical Markers */}
          {extractedSymptoms.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                {language === 'hi' ? 'पहचाने गए नैदानिक लक्षण (Auto-Extracted):' : 'Automatically Extracted Symptoms:'}
              </label>
              <div className="flex flex-wrap gap-2">
                {extractedSymptoms.map((sym, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center space-x-1 bg-emerald-50 text-emerald-900 border border-emerald-300 text-xs font-bold px-2.5 py-1 rounded-full shadow-2xs"
                  >
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>{sym}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-200">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              disabled={!recognizedText || isRecording}
              className="bg-gov-navy hover:bg-gov-navyDark disabled:bg-slate-300 text-white px-5 py-2 rounded-lg text-xs font-bold shadow-sm flex items-center space-x-1.5 transition-all"
            >
              <Check className="w-4 h-4" />
              <span>
                {language === 'hi' ? 'लक्षण फॉर्म में जोड़ें' : 'Apply to Assessment Form'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
