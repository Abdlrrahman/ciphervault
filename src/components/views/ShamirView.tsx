
import React from 'react';
import {
  Share2,
  Users,
  CheckCircle2,
  AlertOctagon,
  Sparkles,
  Key,
  ShieldCheck,
  RotateCcw,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ShamirView: React.FC = () => {
  const {
    t,
    secretNumber,
    setSecretNumber,
    totalSharesN,
    setTotalSharesN,
    thresholdK,
    setThresholdK,
    generatedShares,
    selectedShareIndexes,
    toggleShareSelection,
    handleSplitSecret,
    handleReconstructSecret,
    reconstructedSecret
  } = useApp();

  const isQuorumMet = selectedShareIndexes.length >= thresholdK;
  const isMatch = reconstructedSecret !== null && reconstructedSecret === secretNumber;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Share2 className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Shamir's Secret Sharing Scheme (SSSS)
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Distribute emergency treasury passkeys and master secrets across $N$ custodians such that any $K$ shares reconstruct the secret, but $K-1$ reveals zero information.
            </p>
          </div>

          <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 rounded-xl text-center flex-shrink-0">
            <span className="text-[10px] uppercase font-bold text-indigo-700 dark:text-indigo-400 block">
              Quorum Policy
            </span>
            <div className="text-xl font-black text-indigo-900 dark:text-indigo-200">
              {thresholdK} of {totalSharesN} Custodians
            </div>
          </div>
        </div>
      </div>

      {/* Secret Input & Parameters */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Key className="w-4 h-4 text-indigo-600" />
          <span>Master Secret Configuration & Threshold Controls</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Secret Number Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {t('secretNumber')}:
            </label>
            <input
              type="number"
              min="1000"
              max="2000000000"
              value={secretNumber}
              onChange={e => setSecretNumber(Number(e.target.value))}
              className="w-full text-xs font-mono p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          {/* Total Shares N */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">{t('totalShares')}:</span>
              <span className="font-mono font-bold text-indigo-600">{totalSharesN} Shares</span>
            </div>
            <input
              type="range"
              min="3"
              max="9"
              value={totalSharesN}
              onChange={e => {
                const n = Number(e.target.value);
                setTotalSharesN(n);
                if (thresholdK > n) setThresholdK(n);
              }}
              className="w-full accent-indigo-600"
            />
          </div>

          {/* Threshold K */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">{t('threshold')}:</span>
              <span className="font-mono font-bold text-emerald-600">{thresholdK} Quorum</span>
            </div>
            <input
              type="range"
              min="2"
              max={totalSharesN}
              value={thresholdK}
              onChange={e => setThresholdK(Number(e.target.value))}
              className="w-full accent-emerald-600"
            />
          </div>
        </div>

        <button
          onClick={handleSplitSecret}
          className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition shadow-sm active:scale-95 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>{t('splitAction')}</span>
        </button>
      </div>

      {/* Generated Shares List & Interactive Quorum Reconstructor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Custodian Shares List */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-600" />
              <span>{t('sharesList')} (Select &ge; {thresholdK} to Reconstruct)</span>
            </h3>
            <span className="text-xs font-mono font-bold text-indigo-600">
              {selectedShareIndexes.length} / {thresholdK} Selected
            </span>
          </div>

          <div className="space-y-2">
            {generatedShares.map((s) => {
              const isSelected = selectedShareIndexes.includes(s.index);
              return (
                <div
                  key={s.index}
                  onClick={() => toggleShareSelection(s.index)}
                  className={'p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ' + (
                    isSelected
                      ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}}
                      className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        Custodian Share #{s.index}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono block">
                        Coordinate (x={s.x}, y={s.y})
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-semibold px-2 py-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                    {s.hex}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Secret Reconstruction Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Lagrange Polynomial Reconstruction</span>
            </h3>

            <div className={'p-4 rounded-xl text-xs space-y-2 ' + (
              isQuorumMet
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 text-emerald-900 dark:text-emerald-200'
                : 'bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-amber-900 dark:text-amber-200'
            )}>
              <div className="font-bold flex items-center gap-1.5">
                {isQuorumMet ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertOctagon className="w-4 h-4 text-amber-600" />}
                <span>{isQuorumMet ? 'Quorum Threshold Satisfied' : 'Quorum Incomplete'}</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                {isQuorumMet
                  ? 'Selected ' + selectedShareIndexes.length + ' shares meets or exceeds the required threshold K=' + thresholdK + '. Lagrange polynomial interpolation will compute the secret P(0).'
                  : 'You have selected ' + selectedShareIndexes.length + ' shares. At least ' + thresholdK + ' shares are mathematically required to reconstruct.'}
              </p>
            </div>

            {reconstructedSecret !== null && (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  {t('reconstructedOutput')}
                </span>
                <div className="text-2xl font-mono font-black text-indigo-600 dark:text-indigo-400">
                  {reconstructedSecret}
                </div>
                {isMatch && (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Exact match with original master secret!
                  </span>
                )}
              </div>
            )}
          </div>

          <button
            onClick={handleReconstructSecret}
            disabled={!isQuorumMet}
            className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold transition shadow-sm active:scale-95 flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{t('reconstructAction')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
