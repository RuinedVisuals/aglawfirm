import type { MetadataRoute } from 'next';

const BASE = 'https://aglawfirm.co';
const PATHS = ['', '/about', '/expertise', '/expertise/commercial-corporate-law', '/expertise/real-estate', '/insights', '/insights/property-due-diligence', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.flatMap((p) =>
    ['el', 'en'].map((l) => ({
      url: BASE + '/' + l + p,
      lastModified: new Date(),
      alternates: { languages: { el: BASE + '/el' + p, en: BASE + '/en' + p } }
    }))
  );
}
