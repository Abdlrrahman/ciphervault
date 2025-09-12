
import React from 'react';
import {
  BookOpen,
  Lock,
  Share2,
  Gauge,
  ShieldCheck,
  CheckCircle2,
  Cpu
} from 'lucide-react';

export const MethodologyView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Cryptographic Architecture & Mathematical Specifications
          </h2>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Formal engineering standards for CipherVault: AES-GCM AEAD, PBKDF2 key stretching, Shamir Lagrange polynomial interpolation, and Shannon information entropy.
        </p>
      </div>

      {/* 4 Methodological Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. AES-256-GCM AEAD */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-indigo-600">
            <Lock className="w-5 h-5" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              1. AES-256-GCM Authenticated Encryption (AEAD)
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Galois/Counter Mode (GCM) combines counter-mode confidentiality with Galois message authentication tag generation (GHASH) over GF(2^128):
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl font-mono text-xs text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 space-y-1">
            <div>Ciphertext = Plaintext &oplus; AES_K(Counter_i)</div>
            <div>Auth_Tag = GHASH_H(AAD || Ciphertext || Lengths) &oplus; AES_K(J_0)</div>
          </div>
          <p className="text-xs text-slate-500">
            Guarantees confidentiality and tamper-evident ciphertext integrity in a single pass.
          </p>
        </div>

        {/* 2. Shamir's Secret Sharing */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-violet-600">
            <Share2 className="w-5 h-5" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              2. Shamir's Secret Sharing (Lagrange Interpolation)
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Information-theoretically secure threshold secret sharing over finite prime field GF(2^31 - 1):
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl font-mono text-xs text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 space-y-1">
            <div>P(x) = S + a_1*x + a_2*x^2 + ... + a_{'{k-1}'}*x^{'{k-1}'} mod p</div>
            <div>Secret S = P(0) = &sum; [ y_i &times; &prod; ( -x_j / (x_i - x_j) ) ] mod p</div>
          </div>
          <p className="text-xs text-slate-500">
            Any subset of K shares reconstructs P(0); any K-1 shares leak zero information.
          </p>
        </div>

        {/* 3. PBKDF2 Key Derivation */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-emerald-600">
            <Cpu className="w-5 h-5" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              3. PBKDF2-HMAC-SHA256 Key Stretching
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Password-Based Key Derivation Function 2 introduces cryptographic work factors to resist offline GPU/ASIC dictionary attacks:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl font-mono text-xs text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800">
            DK = PBKDF2(Password, Salt, c=100000, dkLen=256)
            <br />
            F(P, S, c, i) = U_1 &oplus; U_2 &oplus; ... &oplus; U_c
          </div>
          <p className="text-xs text-slate-500">
            Iterative hashing forces high computational costs for each password candidate trial.
          </p>
        </div>

        {/* 4. Shannon Information Entropy */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-amber-600">
            <Gauge className="w-5 h-5" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              4. Shannon Information Entropy
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Theoretical measure of password unpredictability based on password length (L) and character set pool (R):
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl font-mono text-xs text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800">
            H = L &times; log_2(R) bits
            <br />
            Search_Space = R^L permutations
          </div>
          <p className="text-xs text-slate-500">
            NIST SP 800-63B recommends &ge; 64 bits of entropy for mission-critical administrative passphrases.
          </p>
        </div>
      </div>
    </div>
  );
};
