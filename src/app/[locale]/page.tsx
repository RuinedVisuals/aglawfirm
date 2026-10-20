import { Preloader } from '@/components/home/Preloader';
import { Hero } from '@/components/home/Hero';
import { Intro } from '@/components/home/Intro';
import { ExpertiseSticky } from '@/components/home/ExpertiseSticky';
import { Interlude } from '@/components/home/Interlude';
import { Heritage } from '@/components/home/Heritage';
import { PracticeAreas } from '@/components/home/PracticeAreas';
import { Approach, InsightsTeaser } from '@/components/home/Sections';
import { ClosingCta } from '@/components/site/ClosingCta';
import { Footer } from '@/components/site/Footer';
import { getDict } from '@/lib/i18n';
import { IMAGES } from '@/lib/images';
import { pageMeta } from '@/lib/seo';
import type { Locale } from '@/content/content';

export function generateMetadata({ params }: { params: { locale: Locale } }) {
  const h = getDict(params.locale).home;
  return pageMeta(params.locale, '', 'AG Law Firm — ' + h.heroA + ' ' + h.heroB, h.heroLede);
}

export default function Home({ params }: { params: { locale: Locale } }) {
  const l = params.locale;
  const d = getDict(l);
  const h = d.home;
  return (
    <main>
      <Preloader note={h.loaderNote} />
      <Hero h={h} src={IMAGES.hero} />
      <Intro h={h} l={l} />
      <ExpertiseSticky h={h} l={l} images={[IMAGES.commercial, IMAGES['real-estate']]} />
      <Interlude h={h} src={IMAGES.interlude} />
      <Heritage h={h} portrait={IMAGES.portrait} />
      <PracticeAreas h={h} l={l} images={IMAGES.areas} />
      <Approach h={h} />
      <InsightsTeaser h={h} l={l} />
      <ClosingCta d={d} l={l} label={h.art + ' VII — ' + h.ctLabel} />
      <Footer d={d} />
    </main>
  );
}
