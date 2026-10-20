import { Reveal } from '@/components/site/Reveal';
import { Figure } from '@/components/site/Figure';
import { Footer } from '@/components/site/Footer';
import { ContactForm } from '@/components/pages/ContactForm';
import { getDict } from '@/lib/i18n';
import { pageMeta } from '@/lib/seo';
import { site, type Locale } from '@/content/content';

export function generateMetadata({ params }: { params: { locale: Locale } }) {
  const d = getDict(params.locale);
  return pageMeta(params.locale, '/contact', d.labels.contact, d.contact.lede);
}

export default function Contact({ params }: { params: { locale: Locale } }) {
  const d = getDict(params.locale);
  const c = d.contact;
  const u = d.ui;
  return (
    <main>
      <section className="contact g">
        <div className="stack-40 pb-96">
          <Reveal className="kicker kicker--para"><span className="para">§</span>{c.kicker}</Reveal>
          <h1 className="serif display-xl"><Reveal type="line">{c.title}</Reveal></h1>
          <Reveal as="p" className="lede on-navy">{c.lede}</Reveal>
        </div>
        <div className="grid12 contact__grid">
          <div className="col-1-5 stack-40">
            <Reveal className="info info--big"><span className="info__k">{u.office}</span><span className="serif">{u.address}</span></Reveal>
            <Reveal className="info info--big"><span className="info__k">{u.phone}</span><a className="serif" href={site.phoneHref}>{site.phone}</a></Reveal>
            <Reveal className="info info--big"><span className="info__k">{u.email}</span><a className="serif" href={'mailto:' + site.email}>{site.email}</a></Reveal>
            <Reveal type="clip" className="ratio-4-3"><Figure label={c.mapPh} sizes="40vw" /></Reveal>
          </div>
          <div className="col-7-12"><Reveal><ContactForm f={c.form} /></Reveal></div>
        </div>
      </section>
      <Footer d={d} />
    </main>
  );
}
