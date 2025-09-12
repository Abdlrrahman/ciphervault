
export type Language = 'en' | 'ar';

export interface LocalizedString {
  en: string;
  ar: string;
}

export type EncryptionAlgorithm = 'AES-GCM' | 'AES-CBC';
export type HashAlgorithm = 'SHA-256' | 'SHA-512' | 'HMAC-SHA256';

export interface ShamirShare {
  index: number;
  x: number;
  y: number;
  hex: string;
}

export type StrideCategory =
  | 'Spoofing'
  | 'Tampering'
  | 'Repudiation'
  | 'Information_Disclosure'
  | 'Denial_of_Service'
  | 'Elevation_of_Privilege';

export interface StrideThreat {
  id: string;
  category: StrideCategory;
  title: LocalizedString;
  description: LocalizedString;
  targetComponent: string;
  impactTier: 'Low' | 'Medium' | 'High' | 'Critical';
  mitigationStrategy: LocalizedString;
  status: 'Mitigated' | 'In_Review' | 'Unmitigated';
}

export interface EntropyAnalysis {
  entropyBits: number;
  length: number;
  hasLower: boolean;
  hasUpper: boolean;
  hasDigits: boolean;
  hasSymbols: boolean;
  charsetSize: number;
  crackTimeEstimate: string;
  nistStatus: 'Exceeds' | 'Compliant' | 'Weak';
}

export interface EncryptedPayload {
  ciphertextBase64: string;
  ivHex: string;
  saltHex: string;
  tagHex?: string;
  iterations: number;
  timestamp: number;
  keyDerivation: string;
  algorithm: string;
}

export type TabId = 'workbench' | 'shamir' | 'diffie_hellman' | 'ecc' | 'stride' | 'entropy' | 'storage' | 'methodology';
