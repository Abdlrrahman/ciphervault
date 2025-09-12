# CipherVault Technical Architecture

## 1. Cryptographic System Flow

```
+---------------------------------------------------------------+
|                      React UI Layer                           |
|  [Header] [NavTabs] [Workbench] [Shamir Lab] [STRIDE Canvas]  |
+-------------------------------+-------------------------------+
                                |
+-------------------------------v-------------------------------+
|                      AppContext Provider                      |
|  - Passphrase, Iterations & Plaintext State                   |
|  - Shamir Polynomial Generator & Quorum Selector              |
|  - STRIDE Threat Model State & Category Filters               |
+-------------------------------+-------------------------------+
                                |
+-------------------------------v-------------------------------+
|                 Pure Cryptographic Subsystem                  |
|  - Web Crypto API (SubtleCrypto PBKDF2 & AES-256-GCM)        |
|  - Shamir Lagrange Interpolation over GF(2^31 - 1)            |
|  - Shannon Entropy Engine & NIST SP 800-63B Analyzer          |
+---------------------------------------------------------------+
```

## 2. Directory Layout

```
ciphervault/
├── src/
│   ├── types/crypto.ts             # Cryptographic types & STRIDE schemas
│   ├── data/seedSecurity.ts        # STRIDE threats & custodian configs
│   ├── engine/cryptoEngine.ts      # Web Crypto AES-GCM, Shamir & Entropy
│   ├── i18n/translations.ts        # Bilingual English/Arabic dictionary
│   ├── context/AppContext.tsx      # Reactive application state
│   ├── components/
│   │   ├── layout/                 # Header, NavTabs
│   │   └── views/                  # Workbench, Shamir, Stride, Entropy, Methodology
│   ├── App.tsx                     # Main shell
│   └── main.tsx                    # React DOM bootstrap
├── tests/
│   ├── cryptoEngine.test.ts        # Unit tests for Shamir, AES-GCM, Entropy
│   └── e2e_smoke.test.ts           # End-to-end smoke tests
└── docs/                           # Architecture, methodology, case study
```
