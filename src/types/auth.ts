export type UserRole = 'sec_admin' | 'cryptographer' | 'auditor' | 'researcher';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  roleTitle: { en: string; ar: string };
  clearanceLevel: string;
  organization: string;
  avatarInitials: string;
  avatarColor: string;
  sessionStartedAt: string;
  token: string;
}

export const DEMO_PERSONAS: Record<UserRole, UserProfile> = {
  sec_admin: {
    id: 'usr-sec-01',
    name: 'Abdlrrahman Shibani',
    email: 'abdlrrahman.shibani@gmail.com',
    role: 'sec_admin',
    roleTitle: { en: 'Chief Information Security Officer & Key Custodian', ar: 'رئيس أمن المعلومات وأمين المفاتيح' },
    clearanceLevel: 'Level 4 — Master Key Generation & Shamir Quorum',
    organization: 'Arriada Cyber Defense Operations',
    avatarInitials: 'AS',
    avatarColor: 'bg-indigo-600',
    sessionStartedAt: new Date().toISOString(),
    token: 'jwt-vault-ciso-001'
  },
  cryptographer: {
    id: 'usr-crypto-02',
    name: 'Dr. Karim Mansoor',
    email: 'k.mansoor@crypto-lab.org',
    role: 'cryptographer',
    roleTitle: { en: 'Principal Applied Cryptographer', ar: 'كبير باحثي التشفير التطبيقي' },
    clearanceLevel: 'Level 3 — WebCrypto & ECC Point Arithmetic',
    organization: 'Applied Cryptographic Research Core',
    avatarInitials: 'KM',
    avatarColor: 'bg-purple-600',
    sessionStartedAt: new Date().toISOString(),
    token: 'jwt-vault-cryp-002'
  },
  auditor: {
    id: 'usr-threat-03',
    name: 'STRIDE Security Auditor',
    email: 'audit@infosec-review.org',
    role: 'auditor',
    roleTitle: { en: 'Lead STRIDE Threat Modeling Assessor', ar: 'كبير مقيمي نمذجة التهديدات STRIDE' },
    clearanceLevel: 'Level 2 — Threat Matrix & Entropy Audit',
    organization: 'Independent InfoSec Assurance Mission',
    avatarInitials: 'ST',
    avatarColor: 'bg-rose-600',
    sessionStartedAt: new Date().toISOString(),
    token: 'jwt-vault-strd-003'
  },
  researcher: {
    id: 'usr-res-04',
    name: 'Security Research Fellow',
    email: 'researcher@local-sec.io',
    role: 'researcher',
    roleTitle: { en: 'Local-First Zero-Knowledge Researcher', ar: 'باحث أمان المتصفح والمعرفة الصفرية' },
    clearanceLevel: 'Level 1 — Cryptographic Workbench Sandbox',
    organization: 'Open Cryptography Initiative',
    avatarInitials: 'RF',
    avatarColor: 'bg-slate-600',
    sessionStartedAt: new Date().toISOString(),
    token: 'jwt-vault-res-004'
  }
};
