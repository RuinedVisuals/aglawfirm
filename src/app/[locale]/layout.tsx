import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { Inter, Noto_Serif_Display } from 'next/font/google';
import { SiteProvider } from '@/components/site/SiteProvider';
import { Header } from '@/components/site/Header';
import { Menu } from '@/components/site/Menu';
import { getDict, isLocale, locales } from '@/lib/i18n';
import '@/styles/globals.scss';

const serif = Noto_Serif_Display({ subsets: ['latin', 'greek'], weight: ['300', '400'], style: ['normal', 'italic'], variable: '--font-serif', display: 'swap' });
const sans = Inter({ subsets: ['latin', 'greek'], weight: ['400', '500'], variable: '--font-sans', display: 'swap' });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL('https://aglawfirm.co'),
  title: { default: 'AG Law Firm — Alkiviadis S. Gkanatsios & Associates', template: '%s — AG Law Firm' },
  description: 'Independent law firm in Volos, Greece — commercial & corporate law, real estate and litigation since 1983.'
};

export default function LocaleLayout({ children, params }: { children: ReactNode; params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const dict = getDict(params.locale);
  return (
    <html lang={params.locale} className={serif.variable + ' ' + sans.variable}>
      <body>
        <SiteProvider locale={params.locale} dict={dict}>
          <Header />
          <Menu />
          {children}
        </SiteProvider>
      </body>
    </html>
  );
}
