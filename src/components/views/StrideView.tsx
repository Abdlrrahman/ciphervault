
import React from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Layers,
  Filter
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { StrideCategory } from '../../types/crypto';

export const StrideView: React.FC = () => {
  const {
    t,
    language,
    threats,
    selectedCategory,
    setSelectedCategory
  } = useApp();

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: t('allCategories') },
    { id: 'Spoofing', label: 'Spoofing' },
    { id: 'Tampering', label: 'Tampering' },
    { id: 'Repudiation', label: 'Repudiation' },
    { id: 'Information_Disclosure', label: 'Info Disclosure' },
    { id: 'Denial_of_Service', label: 'Denial of Service' },
    { id: 'Elevation_of_Privilege', label: 'Privilege Escalation' }
  ];

  const filteredThreats = selectedCategory === 'all'
    ? threats
    : threats.filter(t => t.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                STRIDE Threat Modeling Canvas & Mitigation Architecture
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Comprehensive threat analysis covering Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, and Elevation of Privilege.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl overflow-x-auto max-w-full">
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={'px-3 py-1 rounded-lg text-xs font-bold transition whitespace-nowrap ' + (
                  selectedCategory === c.id
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Threat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredThreats.map((threat) => (
          <div
            key={threat.id}
            className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                  {threat.category.replace('_', ' ')}
                </span>
                <span className={'px-2 py-0.5 rounded text-[10px] font-bold uppercase ' + (
                  threat.impactTier === 'Critical' ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' :
                  threat.impactTier === 'High' ? 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300' :
                  'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                )}>
                  {threat.impactTier} Impact
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                {threat.title[language]}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                {threat.description[language]}
              </p>

              <div className="text-[11px] font-mono text-slate-500 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg border border-slate-200/80 dark:border-slate-800">
                Target: {threat.targetComponent}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block">
                Cryptographic Mitigation:
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {threat.mitigationStrategy[language]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
