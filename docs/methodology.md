# Cryptographic Specifications & Mathematical Formulations

## 1. AES-256-GCM Authenticated Encryption (AEAD)

$$\text{Ciphertext} = \text{Plaintext} \oplus \text{AES}_K(\text{Counter}_i)$$

$$\text{Auth Tag} = \text{GHASH}_H(\text{AAD} \parallel \text{Ciphertext} \parallel \text{Lengths}) \oplus \text{AES}_K(J_0)$$

## 2. Shamir's Secret Sharing Scheme

$$\text{Polynomial: } P(x) = S + a_1 x + a_2 x^2 + \dots + a_{k-1} x^{k-1} \pmod p$$

$$\text{Secret: } S = P(0) = \sum_{i=1}^k y_i \prod_{j \neq i} \frac{-x_j}{x_i - x_j} \pmod p$$

Where $p = 2^{31} - 1 = 2147483647$ (Mersenne Prime).

## 3. Shannon Information Entropy

$$H = L \times \log_2(R) \text{ bits}$$

Where $L$ is password length and $R$ is character set pool size.
