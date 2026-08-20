import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, Menu, X, UserCircle2, ArrowRight } from 'lucide-react';

export const HeaderBand: React.FC = () => {
  const { t, language } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: t('navHome') },
    { path: '/about', label: t('navAbout') },
    { path: '/services', label: t('navServices') },
    { path: '/resources', label: t('navResources') },
    { path: '/contact', label: t('navContact') },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
      {/* Tricolor Top Accent Line */}
      <div className="tricolor-strip" />

      {/* Main Institutional Header Lockup */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
        {/* Left: National Emblem & Swasthya Mitra Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          {/* Government Emblem Styled Mark */}
          <div className="w-11 h-11 bg-gov-navy rounded-lg flex items-center justify-center text-white shadow-md border-2 border-gov-saffron group-hover:scale-105 transition-transform flex-shrink-0">
            <ShieldCheck className="w-7 h-7 text-gov-saffron" />
          </div>
          <div>
            <div className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
              {t('govtLockupSub')}
            </div>
            <div className="text-xl sm:text-2xl font-black text-gov-navy tracking-tight flex items-center gap-1.5 font-sans">
              <span>Swasthya Mitra</span>
              <span className="text-gov-saffron font-bold text-lg sm:text-xl">AI</span>
            </div>
            <div className="text-[11px] text-slate-600 hidden sm:block font-medium">
              {t('tagline')} — <span className="text-slate-500">Pratapgarh, Uttar Pradesh</span>
            </div>
          </div>
        </Link>

        {/* Right: Quick Action / Portal Entry Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          {isAuthenticated && user ? (
            <Link
              to={user.role === 'WORKER' ? '/worker/dashboard' : user.role === 'DOCTOR' ? '/doctor/dashboard' : '/admin/dashboard'}
              className="flex items-center space-x-2 bg-gov-navy hover:bg-gov-navyDark text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-md transition-all border-b-2 border-gov-saffron"
            >
              <UserCircle2 className="w-4 h-4 text-gov-saffron" />
              <span>{user.name} ({user.role === 'WORKER' ? 'ASHA' : user.role === 'DOCTOR' ? 'Doctor' : 'Admin'})</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          ) : (
            <div className="flex items-center space-x-2.5">
              <Link
                to="/login"
                className="bg-gov-navy hover:bg-gov-navyDark text-white px-4 py-2 rounded-lg font-bold text-sm shadow-sm transition-all border border-gov-navyLight flex items-center space-x-1.5"
              >
                <span>{language === 'hi' ? 'स्वास्थ्य कार्यकर्ता लॉगिन' : 'ASHA / Health Worker Login'}</span>
              </Link>
              <Link
                to="/login?role=DOCTOR"
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-3.5 py-2 rounded-lg font-semibold text-sm border border-slate-300 transition-colors"
              >
                <span>{language === 'hi' ? 'चिकित्सक / एडमिन' : 'Doctor / Admin'}</span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-700 hover:text-gov-navy rounded-lg focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Navigation Bar (AIIMS style institutional secondary bar) */}
      <nav className="bg-slate-900 text-white hidden lg:block border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 text-xs font-semibold tracking-wide transition-colors ${
                    isActive
                      ? 'bg-gov-saffron text-slate-950 font-bold'
                      : 'text-slate-200 hover:bg-slate-800 hover:text-gov-saffron'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center text-xs space-x-3 text-slate-300 py-1.5">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-emerald-400 font-medium">ABDM Digital Stack v2.6 Connected</span>
            </span>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 text-white border-t border-slate-800 px-4 py-3 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-3 rounded text-sm font-medium hover:bg-slate-800 text-slate-200"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-700 flex flex-col gap-2">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-gov-saffron text-slate-950 font-bold py-2 rounded-lg text-sm"
            >
              {t('loginTitle')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
