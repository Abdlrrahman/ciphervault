# Cryptographic Data Dictionary

| Field / Parameter | Type | Description |
| :--- | :--- | :--- |
| `ciphertextBase64` | `string` | Base64-encoded encrypted payload including ciphertext and GCM authentication tag |
| `ivHex` | `string` | 96-bit cryptographic Initialization Vector formatted as hexadecimal |
| `saltHex` | `string` | 128-bit random salt for PBKDF2 key stretching |
| `iterations` | `number` | Number of iterative hashing cycles applied during key derivation |
| `entropyBits` | `number` | Shannon information entropy measuring key unpredictability |
| `nistStatus` | `string` | Compliance status against NIST SP 800-63B digital identity guidelines |
