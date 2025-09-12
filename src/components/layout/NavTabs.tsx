import React from 'react';
import {
  KeyRound,
  Share2,
  Lock,
  Sparkles,
  ShieldAlert,
  Gauge,
  BookOpen
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { TabId } from '../../types/crypto';
import clsx from 'clsx';

export const NavTabs: React.FC = () => {
  const { activeTab, setActiveTab, t } = useApp();

  const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: 'workbench', label: t('tabWorkbench'), icon: <KeyRound className="w-4 h-4" /> },
    { id: 'shamir', label: t('tabShamir'), icon: <Share2 className="w-4 h-4" /> },
    { id: 'diffie_hellman', label: 'Diffie-Hellman', icon: <Lock className="w-4 h-4 text-indigo-400" /> },
    { id: 'ecc', label: 'Elliptic Curves', icon: <Sparkles className="w-4 h-4 text-amber-400" /> },
    { id: 'stride', label: t('tabStride'), icon: <ShieldAlert className="w-4 h-4" /> },
    { id: 'entropy', label: t('tabEntropy'), icon: <Gauge className="w-4 h-4" /> },
    { id: 'storage', label: 'File Vault & Keys', icon: <Lock className="w-4 h-4 text-emerald-400" /> },
    { id: 'methodology', label: t('tabMethodology'), icon: <BookOpen className="w-4 h-4" /> }
  ];

  return (
    <nav className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md overflow-x-auto sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-1.5 py-2 min-w-max">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={clsx(
              'btn-press flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap',
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-sm ring-1 ring-indigo-700/20'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/80'
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};
