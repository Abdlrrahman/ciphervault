import React, { useState } from 'react';
import {
  FileText,
  Upload,
  Lock,
  Unlock,
  Key,
  Download,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Hash,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { encryptRawFile, decryptRawFile, computeFileSha256 } from '../../engine/cryptoEngine';

export const FileVaultView: React.FC = () => {
  // Encrypt State
  const [encryptFile, setEncryptFile] = useState<File | null>(null);
  const [encryptPassphrase, setEncryptPassphrase] = useState<string>('Enterprise#Vault$2026');
  const [encryptHash, setEncryptHash] = useState<string>('');
  const [isEncrypting, setIsEncrypting] = useState<boolean>(false);
  const [encryptSuccess, setEncryptSuccess] = useState<string | null>(null);

  // Decrypt State
  const [decryptFile, setDecryptFile] = useState<File | null>(null);
  const [decryptPassphrase, setDecryptPassphrase] = useState<string>('');
  const [isDecrypting, setIsDecrypting] = useState<boolean>(false);
  const [decryptError, setDecryptError] = useState<string | null>(null);
  const [decryptSuccess, setDecryptSuccess] = useState<string | null>(null);

  // Keygen State
  const [generatedKeyType, setGeneratedKeyType] = useState<'ECDSA' | 'RSA'>('ECDSA');
  const [keyPair, setKeyPair] = useState<{ publicJwk: string; privateJwk: string } | null>(null);
  const [isGeneratingKey, setIsGeneratingKey] = useState<boolean>(false);

  // Handle Encrypt File Select
  const handleSelectEncryptFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setEncryptFile(f);
      setEncryptSuccess(null);
      try {
        const hash = await computeFileSha256(f);
        setEncryptHash(hash);
      } catch {
        setEncryptHash('Hash calculation unavailable');
      }
    }
  };

  // Perform Encryption & Download
  const handleExecuteEncrypt = async () => {
    if (!encryptFile || !encryptPassphrase) return;
    setIsEncrypting(true);
    setEncryptSuccess(null);
    try {
      const result = await encryptRawFile(encryptFile, encryptPassphrase, 100000);
      const url = URL.createObjectURL(result.encryptedBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = result.downloadName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setEncryptSuccess(`Successfully encrypted "${encryptFile.name}" as AES-GCM 256-bit blob.`);
    } catch (err: any) {
      alert('Encryption failed: ' + err.message);
    } finally {
      setIsEncrypting(false);
    }
  };

  // Handle Decrypt File Select
  const handleSelectDecryptFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDecryptFile(e.target.files[0]);
      setDecryptError(null);
      setDecryptSuccess(null);
    }
  };

  // Perform Decryption & Download Restored File
  const handleExecuteDecrypt = async () => {
    if (!decryptFile || !decryptPassphrase) return;
    setIsDecrypting(true);
    setDecryptError(null);
    setDecryptSuccess(null);
    try {
      const result = await decryptRawFile(decryptFile, decryptPassphrase);
      const url = URL.createObjectURL(result.decryptedBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = result.originalName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setDecryptSuccess(`Successfully decrypted and restored "${result.originalName}".`);
    } catch (err: any) {
      setDecryptError('Decryption failed. Please verify your passphrase or file integrity.');
    } finally {
      setIsDecrypting(false);
    }
  };

  // Generate Key Pair (ECDSA P-256 or RSA-OAEP)
  const handleGenerateKeys = async () => {
    setIsGeneratingKey(true);
    try {
      if (generatedKeyType === 'ECDSA') {
        const kp = await crypto.subtle.generateKey(
          { name: 'ECDSA', namedCurve: 'P-256' },
          true,
          ['sign', 'verify']
        );
        const pubJwk = await crypto.subtle.exportKey('jwk', kp.publicKey);
        const privJwk = await crypto.subtle.exportKey('jwk', kp.privateKey);
        setKeyPair({
          publicJwk: JSON.stringify(pubJwk, null, 2),
          privateJwk: JSON.stringify(privJwk, null, 2)
        });
      } else {
        const kp = await crypto.subtle.generateKey(
          {
            name: 'RSA-OAEP',
            modulusLength: 2048,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: 'SHA-256'
          },
          true,
          ['encrypt', 'decrypt']
        );
        const pubJwk = await crypto.subtle.exportKey('jwk', kp.publicKey);
        const privJwk = await crypto.subtle.exportKey('jwk', kp.privateKey);
        setKeyPair({
          publicJwk: JSON.stringify(pubJwk, null, 2),
          privateJwk: JSON.stringify(privJwk, null, 2)
        });
      }
    } catch (e: any) {
      alert('Key generation failed: ' + e.message);
    } finally {
      setIsGeneratingKey(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold">
              <Lock className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Enterprise File Vault & Cryptographic Keys
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">
              Native WebCrypto
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-world in-browser client-side file encryption, decryption, SHA-256 document hashing, and NIST keypair generation.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Box 1: File Encryptor */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-indigo-600" />
              <span>Encrypt Document / File</span>
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold">
              AES-GCM 256-bit
            </span>
          </div>

          <p className="text-xs text-slate-500">
            Select any real document (PDF, Office, image, zip) to encrypt offline using 100,000 PBKDF2 iterations.
          </p>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Select File to Encrypt:
              </label>
              <input
                type="file"
                onChange={handleSelectEncryptFile}
                className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-950 dark:file:text-indigo-300 cursor-pointer"
              />
            </div>

            {encryptFile && (
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">File:</span>
                  <span className="font-bold text-slate-900 dark:text-white truncate max-w-[200px]">{encryptFile.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Size:</span>
                  <span>{(encryptFile.size / 1024).toFixed(1)} KB</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-500">SHA-256:</span>
                  <span className="truncate max-w-[180px] text-indigo-600 dark:text-indigo-400">{encryptHash}</span>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Master Passphrase:
              </label>
              <input
                type="text"
                value={encryptPassphrase}
                onChange={(e) => setEncryptPassphrase(e.target.value)}
                placeholder="Enter strong encryption passphrase"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
              />
            </div>

            <button
              onClick={handleExecuteEncrypt}
              disabled={!encryptFile || !encryptPassphrase || isEncrypting}
              className="btn-press w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20"
            >
              {isEncrypting ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Deriving Key & Encrypting...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Encrypt & Download .ciphervault</span>
                </>
              )}
            </button>

            {encryptSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>{encryptSuccess}</span>
              </div>
            )}
          </div>
        </div>

        {/* Box 2: File Decryptor */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Unlock className="w-4 h-4 text-emerald-600" />
              <span>Decrypt & Restore File</span>
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-bold">
              Offline Zero-Knowledge
            </span>
          </div>

          <p className="text-xs text-slate-500">
            Upload an encrypted <code>.ciphervault</code> package, enter the passphrase, and restore the original document.
          </p>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Select .ciphervault File:
              </label>
              <input
                type="file"
                onChange={handleSelectDecryptFile}
                className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 dark:file:bg-emerald-950 dark:file:text-emerald-300 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Decryption Passphrase:
              </label>
              <input
                type="text"
                value={decryptPassphrase}
                onChange={(e) => setDecryptPassphrase(e.target.value)}
                placeholder="Enter passphrase used for encryption"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
              />
            </div>

            <button
              onClick={handleExecuteDecrypt}
              disabled={!decryptFile || !decryptPassphrase || isDecrypting}
              className="btn-press w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20"
            >
              {isDecrypting ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Verifying Tag & Decrypting...</span>
                </>
              ) : (
                <>
                  <Unlock className="w-3.5 h-3.5" />
                  <span>Decrypt & Restore Document</span>
                </>
              )}
            </button>

            {decryptError && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>{decryptError}</span>
              </div>
            )}

            {decryptSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>{decryptSuccess}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Box 3: Cryptographic Key Generator */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Key className="w-4 h-4 text-indigo-600" />
              <span>NIST Standard Cryptographic Keypair Generator</span>
            </h3>
            <p className="text-xs text-slate-500">
              Generate real ECDSA P-256 signing keys or RSA-2048 encryption keypairs directly in browser memory.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={generatedKeyType}
              onChange={(e) => setGeneratedKeyType(e.target.value as any)}
              className="px-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
            >
              <option value="ECDSA">ECDSA P-256 (Sign / Verify)</option>
              <option value="RSA">RSA-OAEP 2048-bit (Encrypt / Decrypt)</option>
            </select>

            <button
              onClick={handleGenerateKeys}
              disabled={isGeneratingKey}
              className="btn-press px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5"
            >
              {isGeneratingKey ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
              <span>Generate Keypair</span>
            </button>
          </div>
        </div>

        {keyPair && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1">
              <span className="text-[11px] font-mono font-bold text-slate-500">Public Key (JWK):</span>
              <pre className="p-3 rounded-xl bg-slate-950 text-indigo-300 text-[10px] font-mono overflow-x-auto max-h-48 border border-slate-800">
                {keyPair.publicJwk}
              </pre>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-mono font-bold text-slate-500">Private Key (JWK):</span>
              <pre className="p-3 rounded-xl bg-slate-950 text-emerald-300 text-[10px] font-mono overflow-x-auto max-h-48 border border-slate-800">
                {keyPair.privateJwk}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
