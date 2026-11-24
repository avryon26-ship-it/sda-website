import Image from 'next/image';

/** Only products with a clean packshot photograph show a photo. The old product posters carry claim text,
 *  so every other product is shown as a drawn apothecary jar with a paper label (name and category only). */
export const PACKSHOTS = new Set(['narmadha-bathing-soap']);
type P = { slug: string; name: string; category?: string; image: string };

function split(name: string): string[] {
  const n = name.replace(/^(Narmadha|நர்மதா)\s*/i, '').trim();
  const w = n.split(/\s+/);
  if (w.length <= 2) return [n];
  const mid = Math.ceil(w.length / 2);
  return [w.slice(0, mid).join(' '), w.slice(mid).join(' ')];
}

export default function ProductArt({ p, sizes = '24vw', priority, alt = '' }: { p: P; sizes?: string; priority?: boolean; alt?: string }) {
  if (PACKSHOTS.has(p.slug)) {
    return <Image src={`/${p.image}`} alt={alt} fill sizes={sizes} priority={priority} loading={priority ? undefined : 'lazy'} className="object-cover" />;
  }
  const L = split(p.name);
  const longest = Math.max(...L.map(l => l.length));
  const fs = longest > 15 ? 7.2 : longest > 11 ? 8.4 : 9.6;
  return (
    <span className="jarart" role={alt ? 'img' : undefined} aria-label={alt || undefined} aria-hidden={alt ? undefined : true}>
      <svg viewBox="0 0 120 150" focusable="false" className="botanical" style={{ color: 'var(--ink)' }}>
        <rect x="38" y="3" width="44" height="14" rx="2" fill="#9a7b4a" />
        <path d="M34 17H86V27C86 32 108 36 108 54V136C108 143 104 146 97 146H23C16 146 12 143 12 136V54C12 36 34 32 34 27Z" fill="#d3ddc0" fillOpacity="0.85" />
        <path d="M22 70V132" stroke="#f2f3e1" strokeWidth="3" strokeOpacity="0.85" />
        <rect x="24" y="62" width="72" height="58" fill="#f2f3e1" />
        <rect x="27" y="65" width="66" height="52" fill="none" strokeWidth="0.8" />
        <text x="60" y="76" textAnchor="middle" fontSize="5" letterSpacing="1.2" fill="currentColor" stroke="none" style={{ fontFamily: 'var(--typew)' }}>NARMADHA</text>
        {L.map((l, i) => (
          <text key={i} x="60" y={L.length === 1 ? 96 : 90 + i * 11} textAnchor="middle" fontSize={fs} fontWeight="700" fill="currentColor" stroke="none" style={{ fontFamily: 'var(--display)' }}>{l}</text>
        ))}
        {p.category && <text x="60" y="113" textAnchor="middle" fontSize="4.6" fill="#48623f" stroke="none" style={{ fontFamily: 'var(--body)' }}>{p.category.length > 22 ? p.category.slice(0, 21) + '…' : p.category}</text>}
      </svg>
    </span>
  );
}
