import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import type {
  Language,
  TabId,
  EncryptedPayload,
  ShamirShare,
  StrideThreat,
  EntropyAnalysis
} from '../types/crypto';
import { seedThreats } from '../data/seedSecurity';
import {
  encryptTextAesGcm,
  decryptTextAesGcm,
  splitSecret,
  reconstructSecret,
  analyzeEntropy
} from '../engine/cryptoEngine';
import { translations } from '../i18n/translations';

interface AppContextValue {
  language: Language;
  setLanguage: (l: Language) => void;
  t: (key: keyof typeof translations.en) => string;
  darkMode: boolean;
  toggleDarkMode: () => void;
  activeTab: TabId;
  setActiveTab: (t: TabId) => void;

  // Workbench State
  plaintext: string;
  setPlaintext: (t: string) => void;
  passphrase: string;
  setPassphrase: (p: string) => void;
  iterations: number;
  setIterations: (i: number) => void;
  encryptedPayload: EncryptedPayload | null;
  decryptedOutput: string | null;
  isProcessing: boolean;
  handleEncrypt: () => Promise<void>;
  handleDecrypt: () => Promise<void>;

  // Shamir State
  secretNumber: number;
  setSecretNumber: (n: number) => void;
  totalSharesN: number;
  setTotalSharesN: (n: number) => void;
  thresholdK: number;
  setThresholdK: (k: number) => void;
  generatedShares: ShamirShare[];
  selectedShareIndexes: number[];
  reconstructedSecret: number | null;
  handleSplitSecret: () => void;
  toggleShareSelection: (idx: number) => void;
  handleReconstructSecret: () => void;

  // STRIDE State
  threats: StrideThreat[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;

  // Entropy State
  testPassword: string;
  setTestPassword: (pwd: string) => void;
  entropyResult: EntropyAnalysis;

  resetAll: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const THEME_STORAGE_KEY = 'ciphervault_theme_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, darkMode ? 'dark' : 'light');
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      console.error('Failed to sync theme classes:', e);
    }
  }, [darkMode]);

  const [activeTab, setActiveTab] = useState<TabId>('workbench');

  // Workbench
  const [plaintext, setPlaintext] = useState<string>('CONFIDENTIAL_TREASURY_TRANSFER_AUTH_TOKEN: 8892-4410-9921');
  const [passphrase, setPassphrase] = useState<string>('Sovereign#Vault$2026!Secure');
  const [iterations, setIterations] = useState<number>(100000);
  const [encryptedPayload, setEncryptedPayload] = useState<EncryptedPayload | null>(null);
  const [decryptedOutput, setDecryptedOutput] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Shamir Secret Sharing
  const [secretNumber, setSecretNumber] = useState<number>(9482715);
  const [totalSharesN, setTotalSharesN] = useState<number>(5);
  const [thresholdK, setThresholdK] = useState<number>(3);
  const [generatedShares, setGeneratedShares] = useState<ShamirShare[]>([]);
  const [selectedShareIndexes, setSelectedShareIndexes] = useState<number[]>([1, 2, 3]);
  const [reconstructedSecret, setReconstructedSecret] = useState<number | null>(null);

  // STRIDE
  const [threats] = useState<StrideThreat[]>(seedThreats);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Entropy
  const [testPassword, setTestPassword] = useState<string>('CorrectHorseBatteryStaple!2026');

  const toggleDarkMode = useCallback(() => setDarkMode(d => !d), []);

  const t = useCallback((key: keyof typeof translations.en): string => {
    return translations[language][key] || key;
  }, [language]);

  const handleEncrypt = useCallback(async () => {
    setIsProcessing(true);
    try {
      const payload = await encryptTextAesGcm(plaintext, passphrase, iterations);
      setEncryptedPayload(payload);
      setDecryptedOutput(null);
    } finally {
      setIsProcessing(false);
    }
  }, [plaintext, passphrase, iterations]);

  const handleDecrypt = useCallback(async () => {
    if (!encryptedPayload) return;
    setIsProcessing(true);
    try {
      const decrypted = await decryptTextAesGcm(encryptedPayload, passphrase);
      setDecryptedOutput(decrypted);
    } finally {
      setIsProcessing(false);
    }
  }, [encryptedPayload, passphrase]);

  const handleSplitSecret = useCallback(() => {
    const shares = splitSecret(secretNumber, totalSharesN, thresholdK);
    setGeneratedShares(shares);
    setSelectedShareIndexes(shares.slice(0, thresholdK).map(s => s.index));
    setReconstructedSecret(null);
  }, [secretNumber, totalSharesN, thresholdK]);

  const toggleShareSelection = useCallback((idx: number) => {
    setSelectedShareIndexes(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  }, []);

  const handleReconstructSecret = useCallback(() => {
    const subset = generatedShares.filter(s => selectedShareIndexes.includes(s.index));
    if (subset.length < thresholdK) {
      setReconstructedSecret(null);
      return;
    }
    const rec = reconstructSecret(subset);
    setReconstructedSecret(rec);
  }, [generatedShares, selectedShareIndexes, thresholdK]);

  // Initial split generation on load
  React.useEffect(() => {
    handleSplitSecret();
  }, []);

  const entropyResult = useMemo(() => {
    return analyzeEntropy(testPassword);
  }, [testPassword]);

  const resetAll = useCallback(() => {
    setPlaintext('CONFIDENTIAL_TREASURY_TRANSFER_AUTH_TOKEN: 8892-4410-9921');
    setPassphrase('Sovereign#Vault$2026!Secure');
    setIterations(100000);
    setEncryptedPayload(null);
    setDecryptedOutput(null);
    setSecretNumber(9482715);
    setTotalSharesN(5);
    setThresholdK(3);
    setTestPassword('CorrectHorseBatteryStaple!2026');
    handleSplitSecret();
  }, [handleSplitSecret]);

  const value: AppContextValue = {
    language,
    setLanguage,
    t,
    darkMode,
    toggleDarkMode,
    activeTab,
    setActiveTab,
    plaintext,
    setPlaintext,
    passphrase,
    setPassphrase,
    iterations,
    setIterations,
    encryptedPayload,
    decryptedOutput,
    isProcessing,
    handleEncrypt,
    handleDecrypt,
    secretNumber,
    setSecretNumber,
    totalSharesN,
    setTotalSharesN,
    thresholdK,
    setThresholdK,
    generatedShares,
    selectedShareIndexes,
    reconstructedSecret,
    handleSplitSecret,
    toggleShareSelection,
    handleReconstructSecret,
    threats,
    selectedCategory,
    setSelectedCategory,
    testPassword,
    setTestPassword,
    entropyResult,
    resetAll
  };

  return (
    <AppContext.Provider value={value}>
      <div className={darkMode ? 'dark' : ''} dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors font-sans">
          {children}
        </div>
      </div>
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextValue => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
};
