
export const translations = {
  en: {
    appTitle: 'CipherVault',
    appTagline: 'Applied Cryptography, Local-First Browser Security & Threat Modeling Lab',
    demoNotice: 'LIVE CLIENT-SIDE CRYPTOGRAPHY — All encryption, secret sharing, and entropy benchmarks execute 100% locally via Web Crypto API.',

    // Tabs
    tabWorkbench: 'Web Crypto Workbench',
    tabShamir: "Shamir's Secret Sharing",
    tabStride: 'STRIDE Threat Canvas',
    tabEntropy: 'Entropy & Key Hygiene',
    tabStorage: 'Local-First Vault',
    tabMethodology: 'Security Methodology',

    // Workbench
    plaintext: 'Plaintext Message / Secret',
    passphrase: 'Master Encryption Password',
    iterations: 'PBKDF2 Iterations',
    encryptAction: 'Encrypt (AES-256-GCM)',
    decryptAction: 'Decrypt Ciphertext',
    ciphertext: 'Encrypted Ciphertext (Base64)',
    iv: 'Initialization Vector (IV)',
    salt: 'PBKDF2 Salt (128-bit)',
    decryptedText: 'Decrypted Output',

    // Shamir
    secretNumber: 'Master Secret Numeric Value',
    totalShares: 'Total Custodian Shares (N)',
    threshold: 'Recovery Threshold (K)',
    splitAction: 'Generate Shamir Polynomial Shares',
    reconstructAction: 'Reconstruct Secret from Shares',
    sharesList: 'Generated Custodian Shares',
    selectedShares: 'Shares Selected for Quorum',
    reconstructedOutput: 'Reconstructed Master Secret',

    // STRIDE
    threatMatrix: 'STRIDE Threat Modeling Ledger',
    allCategories: 'All Categories',
    mitigated: 'Mitigated',
    inReview: 'In Review',
    unmitigated: 'Unmitigated',

    // Entropy
    passwordInput: 'Test Passphrase / Secret Key',
    entropyScore: 'Shannon Entropy Score',
    crackTime: 'Brute-Force Time Estimate',
    nistStatus: 'NIST SP 800-63B Compliance',

    // Controls
    language: 'Language',
    darkMode: 'Dark Mode',
    resetDemo: 'Reset Parameters',
    exportReport: 'Export Security Audit'
  },
  ar: {
    appTitle: 'سايفر فولت',
    appTagline: 'مختبر التشفير التطبيقي وأمان المتصفح ونمذجة التهديدات السيبرانية',
    demoNotice: 'تشفير محلي مباشر — كافة عمليات التشفير وتقسيم الأسرار واختبار العشوائية تعمل 100% داخل المتصفح عبر Web Crypto API.',

    // Tabs
    tabWorkbench: 'منصة التشفير الحي (Web Crypto)',
    tabShamir: 'تقاسم الأسرار (خوارزمية شامير)',
    tabStride: 'لوحة نمذجة التهديدات (STRIDE)',
    tabEntropy: 'قياس عشوائية المفاتيح (Entropy)',
    tabStorage: 'الخزنة المحلية المشفرة',
    tabMethodology: 'المنهجية والمعايير الأمنية',

    // Workbench
    plaintext: 'النص الصريح / الرسالة السرية',
    passphrase: 'كلمة المرور الرئيسية للتشفير',
    iterations: 'عدد تكرارات PBKDF2',
    encryptAction: 'تشفير (AES-256-GCM)',
    decryptAction: 'فك تشفير النص المشفر',
    ciphertext: 'النص المشفر (Base64)',
    iv: 'متجه التهيئة (IV)',
    salt: 'الملح المشفر (PBKDF2 Salt)',
    decryptedText: 'النص المفكوك الناتج',

    // Shamir
    secretNumber: 'القيمة الرقمية للسر الرئيسي',
    totalShares: 'إجمالي حصص الأمناء (N)',
    threshold: 'نصاب استعادة السر (K)',
    splitAction: 'توليد حصص شامير متعددة الحدود',
    reconstructAction: 'إعادة بناء السر من النصاب',
    sharesList: 'حصص الأمناء المولدة',
    selectedShares: 'الحصص المختارة لاكتمال النصاب',
    reconstructedOutput: 'السر الرئيسي المسترجع',

    // STRIDE
    threatMatrix: 'سجل نمذجة التهديدات وفق إطار STRIDE',
    allCategories: 'كافة التصنيفات',
    mitigated: 'تمت معالجته',
    inReview: 'قيد المراجعة',
    unmitigated: 'غير معالج',

    // Entropy
    passwordInput: 'كلمة المرور / المفتاح للاختبار',
    entropyScore: 'مؤشر عشوائية شانون (Entropy)',
    crackTime: 'زمن الكسر التقديري بالقوة الغاشمة',
    nistStatus: 'مطابقة معايير NIST SP 800-63B',

    // Controls
    language: 'اللغة',
    darkMode: 'الوضع الليلي',
    resetDemo: 'إعادة تعيين المعايير',
    exportReport: 'تصدير تقرير التدقيق الأمني'
  }
};
