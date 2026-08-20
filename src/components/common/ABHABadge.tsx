import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface ABHABadgeProps {
  abhaId?: string;
  size?: 'sm' | 'md';
}

export const ABHABadge: React.FC<ABHABadgeProps> = ({ abhaId, size = 'md' }) => {
  if (!abhaId) {
    return (
      <span className="inline-flex items-center text-slate-400 text-xs italic">
        ABHA Not Linked
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center space-x-1.5 bg-blue-50 text-blue-900 border border-blue-200 rounded-full font-mono font-semibold shadow-2xs ${
        size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1'
      }`}
      title="Ayushman Bharat Health Account (ABDM Verified)"
    >
      <ShieldCheck className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
      <span className="font-bold tracking-tight">{abhaId}</span>
      <span className="bg-blue-200 text-blue-800 text-[9px] font-bold px-1 rounded uppercase">ABHA</span>
    </span>
  );
};
