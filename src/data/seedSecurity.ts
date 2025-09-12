
import type { StrideThreat } from '../types/crypto';

export const seedThreats: StrideThreat[] = [
  {
    id: 't-spoof-jwt',
    category: 'Spoofing',
    title: { en: 'Client-Side Session Token Forgery', ar: 'تزوير رمز جلسة المستخدم (JWT Forgery)' },
    description: {
      en: 'Adversary creates arbitrary JWT claims using weak HMAC secrets or unverified "none" algorithm headers.',
      ar: 'يقوم المهاجم بإنشاء ترويسات جلسة مزورة باستخدام مفاتيح HMAC ضعيفة أو عبر استغلال خوارزمية none غير المدققة.'
    },
    targetComponent: 'API Gateway & Auth Middleware',
    impactTier: 'Critical',
    mitigationStrategy: {
      en: 'Enforce asymmetric RS256/Ed25519 signature verification with ephemeral public keys and strict audience validation.',
      ar: 'إلزام التحقق من التوقيع الرقمي غير المتماثل (Ed25519) مع المفاتيح العامة والتحقق الصارم من حقول الرمز.'
    },
    status: 'Mitigated'
  },
  {
    id: 't-tamper-db',
    category: 'Tampering',
    title: { en: 'In-Transit Financial Ledger Modification', ar: 'التلاعب ببيانات السجل المالي أثناء النقل' },
    description: {
      en: 'Man-in-the-middle attacker tampers with unauthenticated HTTP request payloads altering recipient payout accounts.',
      ar: 'هجوم اعتراض في المنتصف لتعديل حمولة الطلبات غير الموثقة وتغيير الحسابات المصرفية للمستفيدين.'
    },
    targetComponent: 'Disbursement Dispatch Channel',
    impactTier: 'Critical',
    mitigationStrategy: {
      en: 'Deploy AES-256-GCM authenticated encryption combined with HMAC-SHA256 integrity tags across all payload streams.',
      ar: 'تطبيق التشفير الموثق AES-256-GCM مع وسوم التحقق HMAC-SHA256 على كافة قنوات تدفق البيانات.'
    },
    status: 'Mitigated'
  },
  {
    id: 't-repudiate-sign',
    category: 'Repudiation',
    title: { en: 'Denial of Emergency Treasury Authorization', ar: 'إنكار التوقيع على أذونات الصرف الطارئة' },
    description: {
      en: 'Executive authorizer claims an emergency relief wire transfer was submitted without their explicit consent.',
      ar: 'ادعاء المسؤول المخول بعدم إصدار أمر التحويل المالي الطارئ أو إنكار الموافقة الصريحة.'
    },
    targetComponent: 'Treasury Multi-Sig Approval Engine',
    impactTier: 'High',
    mitigationStrategy: {
      en: 'Cryptographic non-repudiation logging with hardware-backed ECDSA digital signatures and immutable timestamping.',
      ar: 'تسجيل غير قابل للإنكار باستخدام التواقيع الرقمية ECDSA المدعومة بالعتاد المشفر والأختام الزمنية الثابتة.'
    },
    status: 'Mitigated'
  },
  {
    id: 't-info-leak',
    category: 'Information_Disclosure',
    title: { en: 'Local-Storage Key Leakage via XSS', ar: 'تسريب المفاتيح المخزنة محلياً عبر ثغرات XSS' },
    description: {
      en: 'Cross-Site Scripting attack accesses unencrypted encryption keys stored in window.localStorage.',
      ar: 'ثغرة حقن نصوص برمجية (XSS) تتيح الوصول إلى مفاتيح التشفير المخزنة بنصوص صريحة في الذاكرة المحلية.'
    },
    targetComponent: 'Browser Storage & Web Crypto Subsystem',
    impactTier: 'Critical',
    mitigationStrategy: {
      en: 'Store sensitive master keys exclusively in non-extractable IndexedDB CryptoKey handles guarded by CSP.',
      ar: 'حفظ المفاتيح في IndexedDB ككائنات CryptoKey غير قابلة للاستخراج مع تفعيل سياسة أمان المحتوى (CSP).'
    },
    status: 'Mitigated'
  },
  {
    id: 't-dos-kdf',
    category: 'Denial_of_Service',
    title: { en: 'PBKDF2 CPU Exhaustion Resource Starvation', ar: 'استنزاف المعالج عبر تكرارات KDF المفرطة' },
    description: {
      en: 'Malicious client sends high-iteration KDF requests designed to tie up web worker compute threads.',
      ar: 'إرسال طلبات اشتقاق مفاتيح مفرطة التكرار تهدف إلى شل خيوط المعالجة في المتصفح.'
    },
    targetComponent: 'Key Derivation Web Worker',
    impactTier: 'Medium',
    mitigationStrategy: {
      en: 'Client-side throttling, Web Worker background sandboxing, and maximum iteration validation bounds (100k–600k).',
      ar: 'تحديد سقف التكرارات في حدود آمنة وتشغيل الاشتقاق في بيئة معزولة (Web Worker) مع تقييد المعدل.'
    },
    status: 'In_Review'
  },
  {
    id: 't-priv-escalate',
    category: 'Elevation_of_Privilege',
    title: { en: 'Unauthenticated Emergency Secret Reconstruction', ar: 'إعادة بناء المفتاح السري دون اكتمال النصاب' },
    description: {
      en: 'A compromised single-custodian attempts to reconstruct Shamir master keys without the requisite K-of-N quorum.',
      ar: 'محاولة مستخدم فردي اختراق النصاب وإعادة بناء المفتاح الرئيسي دون توفر الحد الأدنى من الحصص (K من N).'
    },
    targetComponent: 'Shamir Secret Sharing Module',
    impactTier: 'Critical',
    mitigationStrategy: {
      en: 'Strict mathematical polynomial threshold enforcement over finite field GF(2^31 - 1) guaranteeing zero information leak below K.',
      ar: 'إلزام رياضي صارم لمعادلة لاغرانج فوق الحقول المنتهية تضمن استحالة استنتاج أي معلومة بأقل من K حصة.'
    },
    status: 'Mitigated'
  }
];
