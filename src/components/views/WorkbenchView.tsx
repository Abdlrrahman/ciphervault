
import React from 'react';
import {
  KeyRound,
  Lock,
  Unlock,
  ShieldCheck,
  Cpu,
  Hash,
  Layers,
  Copy,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WorkbenchView: React.FC = () => {
  const {
    t,
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
    handleDecrypt
  } = useApp();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <KeyRound className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Web Crypto API — AES-256-GCM & PBKDF2 Workbench
          </h2>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Perform live, authenticated symmetric encryption entirely client-side using browser-native SubtleCrypto primitives with PBKDF2 key derivation.
        </p>
      </div>

      {/* Input Controls & Cipher Generation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Card: Plaintext & Key Parameters */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-indigo-600" />
            <span>Encryption Parameters & Plaintext</span>
          </h3>

          {/* Plaintext Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {t('plaintext')}
            </label>
            <textarea
              rows={3}
              value={plaintext}
              onChange={e => setPlaintext(e.target.value)}
              className="w-full text-xs font-mono p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Enter plaintext message to encrypt..."
            />
          </div>

          {/* Passphrase Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {t('passphrase')}
            </label>
            <input
              type="text"
              value={passphrase}
              onChange={e => setPassphrase(e.target.value)}
              className="w-full text-xs font-mono p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Master passphrase for PBKDF2 key derivation..."
            />
          </div>

          {/* Iterations Slider */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">{t('iterations')}:</span>
              <span className="font-mono font-bold text-indigo-600">{iterations.toLocaleString()} rounds</span>
            </div>
            <input
              type="range"
              min="10000"
              max="600000"
              step="10000"
              value={iterations}
              onChange={e => setIterations(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
            <span className="text-[10px] text-slate-400 block">
              OWASP 2026 recommendation: &ge; 100,000 iterations for PBKDF2-HMAC-SHA256.
            </span>
          </div>

          {/* Action Button */}
          <button
            onClick={handleEncrypt}
            disabled={isProcessing || !plaintext}
            className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm active:scale-95"
          >
            <Lock className="w-4 h-4" />
            <span>{isProcessing ? 'Computing...' : t('encryptAction')}</span>
          </button>
        </div>

        {/* Right Card: Encrypted Ciphertext Inspection */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Cryptographic Payload (AES-256-GCM AEAD)</span>
            </h3>

            {encryptedPayload ? (
              <div className="space-y-3 font-mono text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Ciphertext (Base64)</span>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 break-all select-all">
                    {encryptedPayload.ciphertextBase64}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">IV (96-Bit Hex)</span>
                    <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 break-all">
                      {encryptedPayload.ivHex}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Salt (128-Bit Hex)</span>
                    <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 break-all">
                      {encryptedPayload.saltHex}
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>Authenticated ciphertext ready for decryption or transmission.</span>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 text-xs">
                No payload encrypted yet. Click "{t('encryptAction')}" to generate ciphertext.
              </div>
            )}
          </div>

          {/* Decryption Section */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <button
              onClick={handleDecrypt}
              disabled={!encryptedPayload || isProcessing}
              className="w-full py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm active:scale-95"
            >
              <Unlock className="w-4 h-4" />
              <span>{t('decryptAction')}</span>
            </button>

            {decryptedOutput && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60">
                <span className="text-[10px] font-bold uppercase text-emerald-800 dark:text-emerald-300 block mb-1">
                  {t('decryptedText')}
                </span>
                <div className="text-xs font-mono text-emerald-900 dark:text-emerald-100 break-all">
                  {decryptedOutput}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
