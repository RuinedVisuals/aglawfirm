import { PageHero } from '@/components/site/PageHero';
import { Footer } from '@/components/site/Footer';
import { InsightsView } from '@/components/pages/InsightsView';
import { getDict } from '@/lib/i18n';
import { pageMeta } from '@/lib/seo';
import type { Locale } from '@/content/content';

export function generateMetadata({ params }: { params: { locale: Locale } }) {
  const d = getDict(params.locale);
  return pageMeta(params.locale, '/insights', d.labels.insights, d.insights.lede);
}

export default function Insights({ params }: { params: { locale: Locale } }) {
  const l = params.locale;
  const d = getDict(l);
  return (
    <main>
      <PageHero kicker={d.insights.kicker} title={d.insights.title} lede={d.insights.lede} size="xl" lineTitle />
      <InsightsView d={d} l={l} />
      <Footer d={d} />
    </main>
  );
}
