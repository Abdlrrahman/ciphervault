# Case Study: Designing Emergency Multi-Custodian Secret Sharing for High-Assurance Field Operations

## Context & Challenge

In humanitarian relief operations and distributed NGO treasury hubs, single-custodian passkeys present a catastrophic point of failure or coercion. Organizations require a mechanism to distribute master decryption keys across regional team leads such that emergency funds can only be unsealed when a verified quorum (e.g. 3 of 5 directors) concurs.

## Solution Implemented

1. **Threshold Polynomial Cryptography:** Deployed Shamir's Secret Sharing Scheme over prime field $\text{GF}(2^{31}-1)$.
2. **Local-First Web Crypto API:** Executed all cryptographic key generation and decryption inside the browser sandbox with zero network telemetry.
3. **STRIDE Threat Modeling:** Addressed token spoofing, local storage leakage via XSS, and non-repudiation logging.

## Results

- **Zero Information Leakage:** Proved mathematically that any $< K$ shares leak 0 bits of information regarding the master secret.
- **High Operational Resilience:** Guaranteed that loss of any 2 custodians will not compromise treasury continuity.
