// Image map. Put files in /public/images and set the paths below.
// Anything left undefined renders a labelled placeholder.
const WP = 'https://aglawfirm.co/wp-content/uploads/2023/12/';

export const IMAGES = {
  hero: undefined as string | undefined, // '/images/hero.jpg' — architecture, stone, light (dark-toned)
  interlude: undefined as string | undefined, // '/images/interlude.jpg' — office, archive, books
  portrait: undefined as string | undefined, // '/images/portrait.jpg' (b/w)
  commercial: undefined as string | undefined,
  'real-estate': undefined as string | undefined,
  office: undefined as string | undefined,
  article: undefined as string | undefined,
  gens: [undefined, undefined] as (string | undefined)[],
  areas: [undefined, undefined, undefined, undefined] as (string | undefined)[],
  about1: WP + '338940586_247697237616820_4005818914437811899_n-1-1024x537.jpg',
  about2: WP + '339244505_816811046634808_3100284138490780276_n-1024x682.jpg',
  logo: 'https://aglawfirm.co/wp-content/uploads/2023/03/ag-logo.png'
};
