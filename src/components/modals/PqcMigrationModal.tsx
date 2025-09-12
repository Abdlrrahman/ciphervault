import React, { useState } from 'react';
import {
  Download,
  Copy,
  Check,
  X,
  AlertTriangle,
  Sparkles,
  Layers,
  Cpu
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { broadcastMeshEvent } from '../../utils/meshBus';

interface PqcMigrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PqcMigrationModal: React.FC<PqcMigrationModalProps> = ({ isOpen, onClose }) => {
  const { currentUser } = useApp();
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const pqcStandards = [
    {
      name: 'ML-KEM-768 (Kyber)',
      fips: 'FIPS 203',
      type: 'Key Encapsulation Mechanism (KEM)',
      quantumSecurity: 'NIST Level 3 (AES-192 equivalent)',
      classicalReplacement: 'Replaces ECDH P-256 / X25519',
      publicKeySize: '1,184 Bytes',
      ciphertextSize: '1,088 Bytes',
      status: 'Ready for Hybrid Deployment'
    },
    {
      name: 'ML-DSA-65 (Dilithium)',
      fips: 'FIPS 204',
      type: 'Digital Signature Algorithm (DSA)',
      quantumSecurity: 'NIST Level 3 (AES-192 equivalent)',
      classicalReplacement: 'Replaces RSA-3072 / ECDSA P-256',
      publicKeySize: '1,952 Bytes',
      signatureSize: '3,309 Bytes',
      status: 'Under Hardware Evaluation'
    },
    {
      name: 'SLH-DSA-SHA2-128s (SPHINCS+)',
      fips: 'FIPS 205',
      type: 'Stateless Hash-Based Signatures',
      quantumSecurity: 'NIST Level 1 (AES-128 equivalent)',
      classicalReplacement: 'Long-term Sovereign Archival Root of Trust',
      publicKeySize: '32 Bytes',
      signatureSize: '7,856 Bytes',
      status: 'Archival Hardening'
    }
  ];

  const handleCopy = () => {
    const summary = JSON.stringify({
      title: 'CipherVault Post-Quantum Cryptography Migration Report',
      auditor: currentUser.name,
      standards: pqcStandards,
      recommendation: 'Adopt NIST SP 800-227 Hybrid X25519 + ML-KEM-768 for all SCIF key exchanges by Q4 2026.'
    }, null, 2);
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    broadcastMeshEvent({
      appId: 'ciphervault',
      appName: 'CipherVault',
      type: 'security',
      message: 'Post-Quantum Cryptography migration assessment copied: NIST FIPS 203/204/205 roadmap',
      metric: 'FIPS 203/204'
    });
  };

  const handleDownload = () => {
    const data = {
      meta: {
        title: 'Post-Quantum Cryptography (PQC) Migration Readiness Assessment',
        system: 'CipherVault Applied Cryptography Lab',
        timestamp: new Date().toISOString(),
        auditor: currentUser.name,
        role: currentUser.role
      },
      pqcStandards,
      threatAssessment: {
        hndlVulnerability: 'High for historical TLS session captures; Zero for local-first air-gapped AES-256-GCM payloads',
        quantumDecryptionHorizon: '2030-2035 for cryptanalytically relevant quantum computers (CRQCs)',
        pqcReadinessScore: '94/100 (Grade A)'
      }
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pqc-migration-readiness-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    broadcastMeshEvent({
      appId: 'ciphervault',
      appName: 'CipherVault',
      type: 'security',
      message: `PQC compliance dossier exported: ${a.download}`,
      metric: 'Grade A'
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-4xl w-full shadow-2xl space-y-5 animate-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>NIST Post-Quantum Cryptography (PQC) Migration Assessment</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-500/10 text-violet-700 dark:text-violet-300 border border-violet-500/20 font-bold">
                  FIPS 203/204/205
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Institutional transition plan from classical Elliptic Curves (NIST P-256) to Quantum-Resilient Lattice primitives.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="btn-press px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="btn-press px-3.5 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-violet-600/20"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export PQC Plan</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Harvest-Now-Decrypt-Later (HNDL) Threat Banner */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3 text-xs">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-amber-900 dark:text-amber-200">
              Harvest-Now-Decrypt-Later (HNDL) Exposure Analysis
            </span>
            <p className="text-amber-800/90 dark:text-amber-300/90 leading-relaxed">
              Adversarial state actors routinely intercept and store encrypted sovereign ciphertexts today to decrypt them when cryptanalytically relevant quantum computers (CRQCs) emerge (estimated 2030–2035). CipherVault mitigates this by maintaining local air-gapped AES-256-GCM symmetric encryption with 100% data sovereignty.
            </p>
          </div>
        </div>

        {/* Standards Table */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-violet-500" />
            NIST Standardized Post-Quantum Primitives Matrix
          </h4>

          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                <tr>
                  <th className="py-2.5 px-3">Standard / Algorithm</th>
                  <th className="py-2.5 px-3">FIPS Spec</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Replaces Classical</th>
                  <th className="py-2.5 px-3 text-right">Key Size</th>
                  <th className="py-2.5 px-3 text-center">Readiness</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {pqcStandards.map((std, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white font-mono">
                      {std.name}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-violet-600 dark:text-violet-400 font-bold">
                      {std.fips}
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">
                      {std.type}
                    </td>
                    <td className="py-2.5 px-3 text-slate-500 dark:text-slate-400">
                      {std.classicalReplacement}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-600 dark:text-slate-300">
                      {std.publicKeySize}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold border border-emerald-500/20">
                        {std.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Hybrid Classical/PQC Roadmap */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
          <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-violet-500" />
            Recommended Institutional Migration Roadmap
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-mono text-violet-600 dark:text-violet-400 font-bold block">Phase 1 (2026)</span>
              <strong className="text-slate-900 dark:text-white block mt-0.5">Hybrid KEM Transition</strong>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Combine classical X25519 + ML-KEM-768 for TLS 1.3 tunnels and secure session handshakes.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-bold block">Phase 2 (2027)</span>
              <strong className="text-slate-900 dark:text-white block mt-0.5">Dual-Signature Issuance</strong>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Deploy composite certificates signed by both ECDSA P-256 and ML-DSA-65.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold block">Phase 3 (2028+)</span>
              <strong className="text-slate-900 dark:text-white block mt-0.5">Pure Quantum-Resistant Root</strong>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Deprecate classical RSA and discrete logarithm primitives across all sovereign nodes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
