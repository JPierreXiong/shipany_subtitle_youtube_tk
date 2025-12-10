// Lightweight i18n helper
// - Usage:
//    import { t, setLocale, getLocale, availableLocales } from 'src/core/i18n';
//    t('app.title')
// Note: If you're using TypeScript, enable "resolveJsonModule": true in tsconfig.json
import en from './en.json';
import zh from './zh.json';

export type Locale = 'en' | 'zh';

const messages: Record<Locale, Record<string, any>> = {
  en,
  zh
};

export const availableLocales: Locale[] = ['en', 'zh'];
export const defaultLocale: Locale = 'en';

let currentLocale: Locale = (typeof navigator !== 'undefined' && /^(zh|zh-)/i.test(navigator.language || '')) ? 'zh' : defaultLocale;

/**
 * Set the current locale
 */
export function setLocale(locale: Locale) {
  if (!availableLocales.includes(locale)) {
    console.warn(`[i18n] Unsupported locale "${locale}", falling back to default (${defaultLocale})`);
    currentLocale = defaultLocale;
  } else {
    currentLocale = locale;
  }
}

/** Get current locale */
export function getLocale(): Locale {
  return currentLocale;
}

/**
 * Simple dot-notation getter with fallback to default locale.
 * Supports interpolation with {{var}} where var is a key in vars.
 */
export function t(key: string, vars?: Record<string, string | number>): string {
  const value = lookup(key, currentLocale) ?? lookup(key, defaultLocale);
  if (typeof value !== 'string') return String(value ?? key);
  if (!vars) return value;
  return interpolate(value, vars);
}

function lookup(key: string, locale: Locale): string | undefined {
  const parts = key.split('.');
  let node: any = messages[locale];
  for (const p of parts) {
    if (node && typeof node === 'object' && p in node) {
      node = node[p];
    } else {
      return undefined;
    }
  }
  return typeof node === 'string' ? node : undefined;
}

function interpolate(str: string, vars: Record<string, string | number>): string {
  return str.replace(/{{\s*([^}\s]+)\s*}}/g, (_, name) => {
    const val = vars[name];
    return val === undefined ? `{{${name}}}` : String(val);
  });
}

/**
 * Initialize i18n optionally with a locale override (e.g. from app settings)
 */
export function initI18n(overrideLocale?: Locale) {
  if (overrideLocale) setLocale(overrideLocale);
}src/core/i18n/index.ts
