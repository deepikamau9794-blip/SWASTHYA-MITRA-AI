import React from 'react';
import type { TriageLevel } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { AlertCircle, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface TriageBadgeProps {
  level: TriageLevel;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const TriageBadge: React.FC<TriageBadgeProps> = ({ level, size = 'md', showIcon = true }) => {
  const { language, t } = useLanguage();

  const configs = {
    RED: {
      bg: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-950/60 dark:text-red-300 dark:border-red-800',
      dot: 'bg-red-600',
      icon: AlertCircle,
      label: language === 'hi' ? 'तत्काल ध्यान आवश्यक (Urgent)' : 'Urgent Escalation',
      shortLabel: language === 'hi' ? 'तत्काल' : 'Urgent',
    },
    AMBER: {
      bg: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
      dot: 'bg-amber-500',
      icon: AlertTriangle,
      label: language === 'hi' ? 'चिकित्सकीय जांच आवश्यक (Eval)' : 'Needs Clinical Evaluation',
      shortLabel: language === 'hi' ? 'जांच आवश्यक' : 'Needs Eval',
    },
    GREEN: {
      bg: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
      dot: 'bg-emerald-600',
      icon: CheckCircle2,
      label: language === 'hi' ? 'कम प्राथमिकता (Routine)' : 'Lower Priority',
      shortLabel: language === 'hi' ? 'सामान्य' : 'Lower Priority',
    },
  };

  const config = configs[level] || configs.GREEN;
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 font-bold',
    md: 'text-xs px-2.5 py-1 font-bold',
    lg: 'text-sm px-3.5 py-1.5 font-extrabold',
  };

  return (
    <span
      className={`inline-flex items-center space-x-1.5 rounded-full border shadow-2xs ${config.bg} ${sizeClasses[size]}`}
    >
      <span className={`w-2 h-2 rounded-full ${config.dot} animate-pulse`} />
      {showIcon && <Icon className="w-3.5 h-3.5 flex-shrink-0" />}
      <span>{size === 'sm' ? config.shortLabel : config.label}</span>
    </span>
  );
};
