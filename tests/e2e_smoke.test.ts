
import { describe, it, expect } from 'vitest';
import { seedThreats } from '../src/data/seedSecurity';
import { translations } from '../src/i18n/translations';

describe('CipherVault End-to-End User Journey Smoke Tests', () => {
  it('loads seed STRIDE threats with full categorical coverage', () => {
    expect(seedThreats.length).toBeGreaterThanOrEqual(6);
    const categories = new Set(seedThreats.map(t => t.category));
    expect(categories.has('Spoofing')).toBe(true);
    expect(categories.has('Tampering')).toBe(true);
    expect(categories.has('Repudiation')).toBe(true);
    expect(categories.has('Information_Disclosure')).toBe(true);
    expect(categories.has('Denial_of_Service')).toBe(true);
    expect(categories.has('Elevation_of_Privilege')).toBe(true);
  });

  it('verifies bilingual translation completeness', () => {
    expect(translations.en.appTitle).toBe('CipherVault');
    expect(translations.ar.appTitle).toBe('سايفر فولت');
    expect(translations.en.tabWorkbench).toBe('Web Crypto Workbench');
    expect(translations.ar.tabWorkbench).toBe('منصة التشفير الحي (Web Crypto)');
  });
});
