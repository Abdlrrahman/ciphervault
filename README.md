# CipherVault — Applied Cryptography, Local-First Browser Security & Threat Modeling Lab

[![CI/CD](https://github.com/abdlrrahman/cashshield/actions/workflows/ci.yml/badge.svg)](https://github.com/abdlrrahman/ciphervault/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Live Demo](https://img.shields.io/badge/demo-online-brightgreen.svg)](https://abdlrrahman.github.io/ciphervault/)

> **"I build explainable digital products that convert operational data and budgets into measurable financial, service, and social outcomes."** — Abdlrrahman Shibani

---

## Executive Overview

**CipherVault** is an interactive, local-first cryptography and browser security engineering laboratory. It demonstrates real, client-side Web Crypto API implementations, Shamir's Secret Sharing Scheme (SSSS) for emergency multi-custodian quorum recovery, STRIDE threat modeling architectures, and Shannon entropy key hygiene diagnostics.

---

## Core Capabilities

1. **Web Crypto API Workbench (SubtleCrypto):**
   - Live AES-256-GCM authenticated symmetric encryption and decryption with 96-bit random IVs and 128-bit authentication tags.
   - PBKDF2-HMAC-SHA256 password-based key derivation with configurable iteration work factors (10k to 600k rounds).

2. **Shamir's Secret Sharing Scheme (SSSS):**
   - Distribute emergency recovery keys across $N$ custodians with a mathematical threshold $K$ of $N$ required to reconstruct.
   - Lagrange polynomial interpolation over finite prime field $\text{GF}(2^{31} - 1)$ guaranteeing zero information leakage with $< K$ shares.

3. **STRIDE Threat Modeling Canvas:**
   - Formal threat decomposition across Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, and Elevation of Privilege.
   - Actionable cryptographic mitigation mappings (mTLS, Nonces, HMAC, AES-GCM, Rate limiting, Zero-Trust).

4. **Information Entropy & NIST SP 800-63B Diagnostics:**
   - Shannon entropy score ($H = L \log_2 R$), character space distribution, and brute-force time estimates against 10B H/s ASIC clusters.

5. **Bilingual Arabic (العربية) RTL & English (LTR) Interface:**
   - Full localization and responsive theme switcher.

---

## Tech Stack & Architecture

- **Frontend:** React 19, TypeScript, Tailwind CSS v4, Lucide Icons
- **Cryptography:** Web Crypto API (`window.crypto.subtle`), Pure TypeScript Field Arithmetic Fallback
- **Build & Test:** Vite 8, Vitest, JSDOM, GitHub Actions
- **Data Governance:** 100% deterministic synthetic models — zero confidential corporate keys or production secrets.
- **Deployment:** Client-side static build on GitHub Pages.

---

## Getting Started

```bash
# Clone repository
git clone https://github.com/abdlrrahman/ciphervault.git
cd ciphervault

# Install dependencies
npm install

# Run local dev server
npm run dev

# Run automated tests
npm run test

# Build production bundle
npm run build
```

---

## Documentation

- [Architecture & Cryptographic Primitives](docs/architecture.md)
- [Mathematical Specifications & Formulas](docs/methodology.md)
- [Security Architecture Case Study](docs/case-study.md)
- [Cryptographic Data Dictionary](docs/data-dictionary.md)
- [5-Minute Demonstration Script](docs/demo-script.md)

---

## License

MIT License © 2026 Abdlrrahman Shibani.
