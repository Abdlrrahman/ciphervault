
import React, { useState } from 'react';
import {
  Lock,
  Globe,
  Sun,
  Moon,
  RotateCcw,
  Sparkles,
  Cpu,
  Printer,
  FileCheck2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AuthUserMenu } from '../auth/AuthUserMenu';
import { AppSwitcher } from './AppSwitcher';
import { AuditTrailModal } from '../audit/AuditTrailModal';
import { CryptoAuditPrintDossier } from '../modals/CryptoAuditPrintDossier';
import { PqcMigrationModal } from '../modals/PqcMigrationModal';
import { ThresholdSignatureModal } from '../modals/ThresholdSignatureModal';
import { ShieldAlert, KeyRound } from 'lucide-react';

export const Header: React.FC = () => {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [isPqcModalOpen, setIsPqcModalOpen] = useState(false);
  const [isFrostModalOpen, setIsFrostModalOpen] = useState(false);
  const {
    t,
    language,
    setLanguage,
    darkMode,
    toggleDarkMode,
    resetAll
  } = useApp();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur">
      {/* Disclaimer Banner */}
      <div className="bg-indigo-500/10 dark:bg-indigo-500/20 border-b border-indigo-500/20 px-4 py-1 text-center text-xs text-indigo-800 dark:text-indigo-300 font-medium flex items-center justify-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
        <span>{t('demoNotice')}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Brand & App Title */}
        <div className="flex items-center gap-3">
          <AppSwitcher />
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-700 flex items-center justify-center shadow-md text-white flex-shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                {t('appTitle')}
              </h1>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 flex items-center gap-1">
                <Cpu className="w-3 h-3" />
                WebCrypto Subsystem
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t('appTagline')}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Post-Quantum Cryptography Migration Assessment */}
          <button
            onClick={() => setIsPqcModalOpen(true)}
            title="NIST Post-Quantum Cryptography (PQC) Migration Readiness Assessment"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-violet-300 dark:border-violet-800 bg-violet-50 dark:bg-violet-950/60 text-xs font-bold text-violet-700 dark:text-violet-300 hover:bg-violet-100 dark:hover:bg-violet-900/60 transition active:scale-95"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
            <span>PQC Audit</span>
          </button>

          {/* Feldman VSS & FROST Threshold Signature Ceremony */}
          <button
            onClick={() => setIsFrostModalOpen(true)}
            title="Feldman Verifiable Secret Sharing (VSS) & FROST Ed25519 Threshold Signature Ceremony"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-indigo-300 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/60 text-xs font-bold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition active:scale-95"
          >
            <KeyRound className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>VSS / FROST</span>
          </button>

          {/* Executive Security Dossier */}
          <button
            onClick={() => setIsDossierOpen(true)}
            title="Cryptographic Security & STRIDE Threat Certificate"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition active:scale-95"
          >
            <Printer className="w-3.5 h-3.5 text-violet-500" />
            <span>Dossier / PDF</span>
          </button>

          {/* Audit Trail Button */}
          <button
            onClick={() => setIsAuditModalOpen(true)}
            title="Institutional Audit Trail"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition active:scale-95"
          >
            <FileCheck2 className="w-3.5 h-3.5 text-blue-500" />
            <span className="hidden sm:inline">Audit</span>
          </button>

          {/* Reset Demo */}
          <button
            onClick={resetAll}
            title={t('resetDemo')}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 dark:hover:text-rose-300 transition active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t('resetDemo')}</span>
          </button>

          {/* Dark Mode */}
          <button
            onClick={toggleDarkMode}
            title={darkMode ? 'Light Mode' : 'Dark Mode'}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition active:scale-95"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition active:scale-95"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'العربية (RTL)' : 'English (LTR)'}</span>
          </button>

          {/* Auth User Menu */}
          <AuthUserMenu />
        </div>
      </div>
      <AuditTrailModal isOpen={isAuditModalOpen} onClose={() => setIsAuditModalOpen(false)} />
      <CryptoAuditPrintDossier isOpen={isDossierOpen} onClose={() => setIsDossierOpen(false)} />
      <PqcMigrationModal isOpen={isPqcModalOpen} onClose={() => setIsPqcModalOpen(false)} />
      <ThresholdSignatureModal isOpen={isFrostModalOpen} onClose={() => setIsFrostModalOpen(false)} />
    </header>
  );
};
