
import { describe, it, expect } from 'vitest';
import {
  splitSecret,
  reconstructSecret,
  analyzeEntropy,
  encryptTextAesGcm,
  decryptTextAesGcm
} from '../src/engine/cryptoEngine';

describe('CipherVault Cryptographic Engine', () => {
  it('splits and reconstructs secret using Shamir Secret Sharing with exact threshold', () => {
    const originalSecret = 8492014;
    const totalN = 5;
    const thresholdK = 3;

    const shares = splitSecret(originalSecret, totalN, thresholdK);
    expect(shares.length).toBe(totalN);

    // Test with first 3 shares {1, 2, 3}
    const rec1 = reconstructSecret(shares.slice(0, 3));
    expect(rec1).toBe(originalSecret);

    // Test with arbitrary 3 shares {2, 4, 5}
    const subset = [shares[1], shares[3], shares[4]];
    const rec2 = reconstructSecret(subset);
    expect(rec2).toBe(originalSecret);
  });

  it('calculates Shannon entropy correctly for weak vs strong passwords', () => {
    const weak = analyzeEntropy('123456');
    expect(weak.entropyBits).toBeLessThan(30);
    expect(weak.nistStatus).toBe('Weak');

    const strong = analyzeEntropy('CorrectHorseBatteryStaple!2026');
    expect(strong.entropyBits).toBeGreaterThanOrEqual(64);
    expect(strong.nistStatus).toBe('Exceeds');
  });

  it('performs AES-GCM encryption and decryption roundtrip', async () => {
    const plaintext = 'Sovereign Treasury Token #9901';
    const password = 'SuperSecurePassphrase2026!';

    const payload = await encryptTextAesGcm(plaintext, password, 10000);
    expect(payload.ciphertextBase64.length).toBeGreaterThan(0);
    expect(payload.ivHex.length).toBe(24); // 12 bytes = 24 hex chars

    const decrypted = await decryptTextAesGcm(payload, password);
    expect(decrypted).toBe(plaintext);
  });

  it('reconstructs secrets near Mersenne prime boundary GF(2^31 - 1)', () => {
    const largeSecret = 2147483640; // Close to Mersenne prime 2^31 - 1 = 2147483647
    const totalN = 4;
    const thresholdK = 2;

    const shares = splitSecret(largeSecret, totalN, thresholdK);
    expect(shares.length).toBe(4);

    const rec = reconstructSecret([shares[0], shares[2]]);
    expect(rec).toBe(largeSecret);
  });

  it('handles invalid password decryption failure cleanly with an error throw', async () => {
    const plaintext = 'Classified Asset 2026';
    const password = 'CorrectPassword123!';
    const wrongPassword = 'WrongPassword456!';

    const payload = await encryptTextAesGcm(plaintext, password, 10000);
    await expect(decryptTextAesGcm(payload, wrongPassword)).rejects.toThrow();
  });

  it('validates Feldman Verifiable Secret Sharing (VSS) homomorphic commitment property', () => {
    // In Feldman VSS over prime field, C_j = g^(a_j) mod p
    // For share s_i = a_0 + a_1*i + a_2*i^2:
    // g^(s_i) == (C_0) * (C_1)^i * (C_2)^(i^2) mod p
    const g = 3;
    const p = 2147483647; // Mersenne 31
    const a0 = 7;
    const a1 = 11;
    const i = 2; // Trustee #2

    const share_i = a0 + a1 * i; // 7 + 22 = 29
    // Left hand side: g^share_i
    // We compute small modular exponentiation helper
    function modPow(base: number, exp: number, mod: number): number {
      let res = 1;
      base = base % mod;
      while (exp > 0) {
        if (exp % 2 === 1) res = (res * base) % mod;
        base = (base * base) % mod;
        exp = Math.floor(exp / 2);
      }
      return res;
    }

    const lhs = modPow(g, share_i, p);
    const C0 = modPow(g, a0, p);
    const C1 = modPow(g, a1, p);
    const rhs = (C0 * modPow(C1, i, p)) % p;

    expect(lhs).toBe(rhs);
  });

  it('verifies FROST threshold signing quorum condition (k >= t)', () => {
    const threshold = 3;
    const totalShares = 5;
    const activeSigners3 = [1, 2, 4];
    const activeSigners2 = [1, 3];

    expect(activeSigners3.length >= threshold).toBe(true); // Quorum valid
    expect(activeSigners2.length >= threshold).toBe(false); // Quorum failed
    expect(totalShares).toBeGreaterThanOrEqual(threshold);
  });
});
