import React, { useState } from 'react';
import { usePatients } from '../../context/PatientContext';
import { useLanguage } from '../../context/LanguageContext';
import { Bell, ChevronRight, X, Sparkles } from 'lucide-react';
import type { NoticeItem } from '../../types';

export const NoticeTicker: React.FC = () => {
  const { notices } = usePatients();
  const { language } = useLanguage();
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);

  const activeNotices = notices.slice(0, 4);

  return (
    <>
      <div className="bg-slate-900 text-slate-200 border-y border-slate-800 py-2 px-4 sm:px-8 text-xs flex items-center gap-3 overflow-hidden shadow-inner select-none">
        <div className="flex items-center space-x-2 bg-gov-saffron text-slate-950 px-2.5 py-0.5 rounded font-extrabold flex-shrink-0 tracking-wider uppercase text-[10px]">
          <Bell className="w-3 h-3 text-slate-950" />
          <span>{language === 'hi' ? 'सूचनाएं व बुलेटिन' : 'Official Notices'}</span>
        </div>

        <div className="flex-1 overflow-x-auto no-scrollbar whitespace-nowrap flex items-center space-x-6">
          {activeNotices.map((notice) => (
            <button
              key={notice.id}
              onClick={() => setSelectedNotice(notice)}
              className="inline-flex items-center space-x-1.5 hover:text-gov-saffron transition-colors group text-left"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="font-semibold text-slate-200 group-hover:underline truncate max-w-[320px] sm:max-w-none">
                {language === 'hi' ? notice.titleHi : notice.title}
              </span>
              <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.2 rounded font-mono">
                {notice.date}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Notice Detail Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
            <div className="bg-[#07253B] text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xs bg-gov-saffron text-slate-950 font-bold px-2 py-0.5 rounded">
                  {selectedNotice.category}
                </span>
                <span className="text-xs text-slate-300">{selectedNotice.department}</span>
              </div>
              <button
                onClick={() => setSelectedNotice(null)}
                className="text-slate-400 hover:text-white p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <h3 className="text-base font-bold text-slate-900">
                {language === 'hi' ? selectedNotice.titleHi : selectedNotice.title}
              </h3>
              <div className="text-xs text-slate-500 font-mono">
                Issued Date: {selectedNotice.date}
              </div>
              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-200">
                {language === 'hi' ? selectedNotice.contentHi : selectedNotice.content}
              </p>
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setSelectedNotice(null)}
                  className="bg-gov-navy text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-gov-navyDark"
                >
                  {language === 'hi' ? 'बंद करें' : 'Close Notice'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
