import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { NavTabs } from './components/layout/NavTabs';
import { WorkbenchView } from './components/views/WorkbenchView';
import { ShamirView } from './components/views/ShamirView';
import { DiffieHellmanView } from './components/views/DiffieHellmanView';
import { EccVisualizerView } from './components/views/EccVisualizerView';
import { StrideView } from './components/views/StrideView';
import { EntropyView } from './components/views/EntropyView';
import { FileVaultView } from './components/views/FileVaultView';
import { MethodologyView } from './components/views/MethodologyView';
import { AuthLockModal } from './components/auth/AuthLockModal';
import { Lock } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {activeTab === 'workbench' && <WorkbenchView />}
      {activeTab === 'shamir' && <ShamirView />}
      {activeTab === 'diffie_hellman' && <DiffieHellmanView />}
      {activeTab === 'ecc' && <EccVisualizerView />}
      {activeTab === 'stride' && <StrideView />}
      {activeTab === 'entropy' && <EntropyView />}
      {activeTab === 'storage' && <FileVaultView />}
      {activeTab === 'methodology' && <MethodologyView />}
    </main>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <NavTabs />
        <div className="flex-1">
          <MainContent />
        </div>

        {/* Global Footer */}
        <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-indigo-600" />
              <span className="font-semibold text-slate-800 dark:text-slate-200">CipherVault v1.0.0</span>
              <span>— Applied Cryptography, Local-First Browser Security & Threat Modeling Lab</span>
            </div>
            <div>
              Built by <strong className="text-slate-800 dark:text-slate-200">Abdlrrahman Shibani</strong>
            </div>
          </div>
        </footer>
      </div>
      <AuthLockModal />
    </AppProvider>
  );
};

export default App;
