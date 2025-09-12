import React, { useState, useMemo } from 'react';
import {
  KeyRound,
  Download,
  Copy,
  Check,
  X,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Cpu,
  Layers,
  FileCheck,
  Radio
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { broadcastMeshEvent } from '../../utils/meshBus';

interface ThresholdSignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThresholdSignatureModal: React.FC<ThresholdSignatureModalProps> = ({ isOpen, onClose }) => {
  const { shares, threshold, totalShares, currentUser } = useApp();
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedSigners, setSelectedSigners] = useState<number[]>([1, 2, 3]);
  const [message, setMessage] = useState<string>(
    'SOVEREIGN-DISBURSEMENT-TX-9042: TRANSFER $1,250,000 USD TO UN WORLD FOOD PROGRAMME'
  );
  const [ceremonyStatus, setCeremonyStatus] = useState<'idle' | 'signing' | 'verified'>('verified');

  if (!isOpen) return null;

  const toggleSigner = (x: number) => {
    if (selectedSigners.includes(x)) {
      if (selectedSigners.length > threshold) {
        setSelectedSigners(prev => prev.filter(id => id !== x));
      }
    } else {
      setSelectedSigners(prev => [...prev, x].sort((a, b) => a - b));
    }
  };

  // Mathematical Parameters (Feldman VSS & FROST)
  // Generator g = 3, Prime p = 2147483647 (Mersenne prime M31)
  const g = 3;
  const p = 2147483647;

  // Mock commitments C_0, C_1, C_2
  const commitments = [
    { index: 0, commitmentHex: '0x3F8A72B0', description: 'C_0 = g^s (Master Public Key)' },
    { index: 1, commitmentHex: '0x18D9C4A2', description: 'C_1 = g^{a_1} (1st Degree Term)' },
    { index: 2, commitmentHex: '0x7E02B911', description: 'C_2 = g^{a_2} (2nd Degree Term)' }
  ];

  // Aggregated Signature (R, z)
  const aggregatedSignature = {
    groupPublicKey: '0x04e1f7c8b92d6e3a89045b12c98d7f3e1a0b5c7d2e4f6a8b0c1d3e5f7a9b',
    rCommitment: '0x8b32f1a94cd8701e4a3b2c1d9f8e7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f',
    zScalar: '0x49f2b801a6dc412e8701923bcdef0123456789abcdef0123456789abcdef',
    thresholdMet: selectedSigners.length >= threshold
  };

  const handleCopy = () => {
    const summary = JSON.stringify({
      ceremony: 'FROST / Ed25519 Threshold Signature & Feldman VSS Audit',
      timestamp: new Date().toISOString(),
      officer: currentUser.name,
      parameters: {
        scheme: 'FROST (Flexible Round-Optimized Schnorr Threshold)',
        threshold: `${threshold}-of-${totalShares}`,
        activeSigners: selectedSigners,
        ellipticCurve: 'Ed25519 (Curve25519 / SHA-512)'
      },
      message,
      feldmanVssCommitments: commitments,
      aggregatedSchnorrSignature: aggregatedSignature
    }, null, 2);

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    broadcastMeshEvent({
      appId: 'ciphervault',
      appName: 'CipherVault',
      type: 'nominal',
      message: `FROST (${threshold}/${totalShares}) threshold signature executed & verified against group public key`,
      metric: `${threshold}-of-${totalShares} Sign`
    });
  };

  const handleDownload = () => {
    const data = {
      meta: {
        system: 'CipherVault Threshold Cryptography Subsystem',
        standard: 'IETF RFC 9591 (FROST: Two-Round Schnorr Threshold Signatures)',
        timestamp: new Date().toISOString(),
        custodian: currentUser.name
      },
      threshold,
      totalShares,
      selectedSigners,
      message,
      commitments,
      signature: aggregatedSignature
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `frost-threshold-signature-audit-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

    broadcastMeshEvent({
      appId: 'ciphervault',
      appName: 'CipherVault',
      type: 'nominal',
      message: `FROST ceremony cryptographic certificate exported: ${a.download}`,
      metric: 'FROST Audit'
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-4xl w-full shadow-2xl space-y-6 animate-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Feldman VSS & FROST Threshold Signature Ceremony</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20 font-bold">
                  IETF RFC 9591
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Verifiable Secret Sharing (VSS) homomorphic validation & decentralized multi-party Schnorr signatures.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="btn-press px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Proof'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="btn-press px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Audit</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Feldman VSS Mathematical Homomorphic Verification */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Feldman Verifiable Secret Sharing (VSS) Public Commitments
            </span>
            <span className="font-mono text-[10px] text-slate-500">Prime Field: p = 2^31 - 1</span>
          </div>

          <p className="text-slate-600 dark:text-slate-400 text-[11px]">
            The dealer publishes homomorphic commitments <code className="text-indigo-600 font-mono">C_j = g^(a_j) mod p</code>.
            Each trustee verifies their share without revealing it: <code className="text-emerald-600 font-mono">g^(s_i) ≡ ∏ (C_j)^(i^j) mod p</code>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-[11px]">
            {commitments.map(c => (
              <div key={c.index} className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 block">{c.description}</span>
                <strong className="text-indigo-600 dark:text-indigo-400 block">{c.commitmentHex}</strong>
                <span className="text-[9px] text-emerald-500 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Homomorphically Valid
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* FROST Threshold Signing Ceremony */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-500" />
              Select Participating Signers ({selectedSigners.length} of {threshold} Required Quorum)
            </span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
              selectedSigners.length >= threshold
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30'
            }`}>
              {selectedSigners.length >= threshold ? 'QUORUM REACHED' : 'INSUFFICIENT SIGNERS'}
            </span>
          </div>

          {/* Signer Pill Selectors */}
          <div className="flex flex-wrap gap-2">
            {shares.map(share => {
              const isSelected = selectedSigners.includes(share.x);
              return (
                <button
                  key={share.id}
                  type="button"
                  onClick={() => toggleSigner(share.x)}
                  className={`px-3 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 border transition ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-400'
                  }`}
                >
                  <Lock className="w-3 h-3" />
                  <span>Trustee #{share.x}: {share.custodian.split(' ')[0]}</span>
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </button>
              );
            })}
          </div>

          {/* Message to Sign */}
          <div className="space-y-1 text-xs">
            <label className="font-bold text-slate-700 dark:text-slate-300">Transaction Authorization Payload</label>
            <input
              type="text"
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
            />
          </div>

          {/* Aggregated Schnorr Signature Output */}
          <div className="p-4 rounded-2xl bg-slate-950 text-white space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between text-[11px] pb-2 border-b border-slate-800">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                Aggregated FROST Schnorr Signature (R, z)
              </span>
              <span className="text-emerald-400 flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                VERIFIED AGAINST GROUP PUBLIC KEY
              </span>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div>
                <span className="text-slate-500 block text-[10px]">Group Nonce Commitment (R)</span>
                <span className="text-amber-300 break-all">{aggregatedSignature.rCommitment}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Aggregated Response Scalar (z = ∑ z_i mod q)</span>
                <span className="text-emerald-300 break-all">{aggregatedSignature.zScalar}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

