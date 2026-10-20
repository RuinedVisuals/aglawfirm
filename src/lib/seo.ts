import type { Metadata } from 'next';
import type { Locale } from '@/content/content';

export function pageMeta(l: Locale, path: string, title: string, description?: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: '/' + l + path, languages: { el: '/el' + path, en: '/en' + path } },
    openGraph: { title, description, locale: l === 'el' ? 'el_GR' : 'en_US', siteName: 'AG Law Firm' }
  };
}
