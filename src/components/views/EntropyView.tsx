
import React from 'react';
import {
  Gauge,
  Key,
  ShieldCheck,
  AlertTriangle,
  Clock,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const EntropyView: React.FC = () => {
  const {
    t,
    testPassword,
    setTestPassword,
    entropyResult
  } = useApp();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Gauge className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Entropy Diagnostics & Key Hygiene Lab
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Analyze cryptographic strength, Shannon information entropy, and brute-force search space under NIST SP 800-63B standards.
            </p>
          </div>

          <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 rounded-xl text-center flex-shrink-0">
            <span className="text-[10px] uppercase font-bold text-indigo-700 dark:text-indigo-400 block">
              Information Entropy
            </span>
            <div className="text-2xl font-black text-indigo-900 dark:text-indigo-200">
              {entropyResult.entropyBits} Bits
            </div>
          </div>
        </div>
      </div>

      {/* Input & Evaluation */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            {t('passwordInput')}:
          </label>
          <input
            type="text"
            value={testPassword}
            onChange={e => setTestPassword(e.target.value)}
            className="w-full text-xs font-mono p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Type a passphrase to calculate Shannon entropy..."
          />
        </div>

        {/* Entropy Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-slate-500">Cryptographic Bit Strength (0 to 128 Bits)</span>
            <span className="text-indigo-600 font-mono">{entropyResult.entropyBits} / 128 Bits</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-3.5 rounded-full overflow-hidden p-0.5">
            <div
              className={'h-full rounded-full transition-all duration-300 ' + (
                entropyResult.entropyBits < 45 ? 'bg-rose-500' :
                entropyResult.entropyBits < 64 ? 'bg-amber-500' :
                'bg-emerald-500'
              )}
              style={{ width: Math.min(100, (entropyResult.entropyBits / 128) * 100) + '%' }}
            />
          </div>
        </div>

        {/* Character Set Indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center gap-2">
            {entropyResult.hasLower ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-slate-400" />}
            <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">Lowercase (a-z)</span>
          </div>

          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center gap-2">
            {entropyResult.hasUpper ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-slate-400" />}
            <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">Uppercase (A-Z)</span>
          </div>

          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center gap-2">
            {entropyResult.hasDigits ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-slate-400" />}
            <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">Digits (0-9)</span>
          </div>

          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center gap-2">
            {entropyResult.hasSymbols ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-slate-400" />}
            <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">Special Symbols</span>
          </div>
        </div>

        {/* 3 Outcome Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
            <span className="text-xs text-slate-500 block">Search Space Pool (R^L)</span>
            <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-1">
              {entropyResult.charsetSize}^{entropyResult.length}
            </div>
            <span className="text-[11px] text-slate-400">Total permutation space</span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
            <span className="text-xs text-slate-500 block">{t('crackTime')}</span>
            <div className="text-base font-bold text-indigo-600 mt-1">
              {entropyResult.crackTimeEstimate}
            </div>
            <span className="text-[11px] text-slate-400">At 10 Billion H/s ASIC cluster</span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
            <span className="text-xs text-slate-500 block">{t('nistStatus')}</span>
            <div className={'text-xl font-bold mt-1 ' + (
              entropyResult.nistStatus === 'Exceeds' ? 'text-emerald-600' :
              entropyResult.nistStatus === 'Compliant' ? 'text-amber-600' : 'text-rose-600'
            )}>
              {entropyResult.nistStatus}
            </div>
            <span className="text-[11px] text-slate-400">NIST SP 800-63B standard</span>
          </div>
        </div>
      </div>
    </div>
  );
};
