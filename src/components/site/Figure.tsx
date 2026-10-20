import Image from 'next/image';

type Props = { src?: string; alt?: string; label?: string; priority?: boolean; sizes?: string; grayscale?: boolean; className?: string };

// Fills its (relatively positioned) parent. Renders a labelled placeholder until a real photo is supplied.
export function Figure({ src, alt = '', label, priority, sizes = '100vw', grayscale, className }: Props) {
  return (
    <div className={'figure ' + (className ?? '')}>
      {src ? (
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} style={{ objectFit: 'cover', filter: grayscale ? 'grayscale(1)' : undefined }} />
      ) : (
        <span className="figure__ph">{label}</span>
      )}
    </div>
  );
}
