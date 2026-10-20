import { content, type Dict, type Locale } from '@/content/content';

export const locales: Locale[] = ['el', 'en'];
export const defaultLocale: Locale = 'el';
export const isLocale = (v: string): v is Locale => (locales as string[]).includes(v);
export const getDict = (l: Locale): Dict => (content[l] ?? content[defaultLocale]) as Dict;

export const PRACTICE_SLUGS = { 'commercial-corporate-law': 'commercial', 'real-estate': 'real-estate' } as const;
export type PracticeSlug = keyof typeof PRACTICE_SLUGS;
export type PracticeKey = (typeof PRACTICE_SLUGS)[PracticeSlug];
export const ARTICLE_SLUG = 'property-due-diligence';

export const PAGE_ORDER = ['about', 'expertise', 'commercial', 'real-estate', 'insights', 'article', 'contact'] as const;
export type PageKey = 'home' | (typeof PAGE_ORDER)[number];
export const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
export const pad = (n: number) => String(n).padStart(2, '0');

export function pageKeyFromPath(path: string): PageKey {
  const seg = path.split('?')[0].split('#')[0].split('/').filter(Boolean).slice(1);
  if (!seg.length) return 'home';
  if (seg[0] === 'expertise' && seg[1]) return (PRACTICE_SLUGS as Record<string, PageKey>)[seg[1]] ?? 'expertise';
  if (seg[0] === 'insights' && seg[1]) return 'article';
  return (seg[0] as PageKey) ?? 'home';
}

export function pageHref(l: Locale, key: PageKey): string {
  switch (key) {
    case 'home': return '/' + l;
    case 'commercial': return '/' + l + '/expertise/commercial-corporate-law';
    case 'real-estate': return '/' + l + '/expertise/real-estate';
    case 'article': return '/' + l + '/insights/' + ARTICLE_SLUG;
    default: return '/' + l + '/' + key;
  }
}

export const labelFor = (d: Dict, key: PageKey) => (d.labels as Record<string, string>)[key] ?? '';
export const kickerFor = (d: Dict, key: PageKey) =>
  key === 'home' ? 'AG LAW FIRM' : d.ui.art + ' ' + ROMAN[PAGE_ORDER.indexOf(key as (typeof PAGE_ORDER)[number])];

export const PRACTICE_LABELS = {
  en: { overview: 'OVERVIEW', services: 'SCOPE OF PRACTICE', cases: 'IN PRACTICE', casesTitle: 'In practice.', faq: 'QUESTIONS', faqTitle: 'Common questions.' },
  el: { overview: 'ΕΠΙΣΚΟΠΗΣΗ', services: 'ΑΝΤΙΚΕΙΜΕΝΟ', cases: 'ΣΤΗΝ ΠΡΑΞΗ', casesTitle: 'Στην πράξη.', faq: 'ΕΡΩΤΗΣΕΙΣ', faqTitle: 'Συχνές ερωτήσεις.' }
} as const;
