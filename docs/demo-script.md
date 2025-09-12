# 5-Minute Portfolio Demonstration Script

1. **Minute 1: Introduction & Web Crypto Workbench:**
   - Open `https://abdlrrahman.github.io/ciphervault/`.
   - Enter a confidential message, adjust PBKDF2 iterations to 100,000, and click **Encrypt (AES-256-GCM)**.
   - Inspect the generated 96-bit IV, 128-bit Salt, and Base64 ciphertext. Click **Decrypt** to verify roundtrip.
2. **Minute 2: Shamir's Secret Sharing Scheme:**
   - Navigate to **Shamir's Secret Sharing**.
   - Set 5 Custodian Shares with a 3-of-5 threshold.
   - Generate shares, select shares #1, #3, and #5, and click **Reconstruct Secret** to demonstrate Lagrange interpolation over $\text{GF}(2^{31}-1)$.
3. **Minute 3: STRIDE Threat Modeling Canvas:**
   - Navigate to **STRIDE Threat Canvas**. Filter by **Information Disclosure** and explain how non-extractable CryptoKey handles in IndexedDB mitigate XSS storage leaks.
4. **Minute 4: Entropy & Key Hygiene:**
   - Navigate to **Entropy & Key Hygiene**. Type passphrases with different character pools to demonstrate Shannon entropy bits and crack-time scaling.
5. **Minute 5: Bilingual & Arabic RTL Mode:**
   - Toggle language to **العربية (RTL)** to showcase native Arabic right-to-left layout and localized cryptographic terminology.
