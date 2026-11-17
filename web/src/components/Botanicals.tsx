/* Hand-drawn style botanical line art. One stroke weight (set in .botanical), round caps,
   drawn from a single leaf primitive so every plant feels like the same hand. Inline SVG, ~1 KB each. */
import type { ReactNode } from 'react';

const leaf = (L: number, w: number) =>
  `M0 0C${w} ${-L * 0.25} ${w} ${-L * 0.72} 0 ${-L}C${-w} ${-L * 0.72} ${-w} ${-L * 0.25} 0 0Z`;
const rib = (L: number) => `M0 0L0 ${-L * 0.86}`;

function Leaf({ x, y, a, L, w, vein = true }: { x: number; y: number; a: number; L: number; w: number; vein?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${a})`}>
      <path d={leaf(L, w)} />
      {vein && <path d={rib(L)} />}
    </g>
  );
}
type P = { className?: string; title?: string };
const Svg = ({ children, className = '', title, vb = '0 0 200 280' }: P & { children: ReactNode; vb?: string }) => (
  <svg viewBox={vb} className={`botanical ${className}`} role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true} focusable="false">{children}</svg>
);

export function Tulsi(p: P) {
  const pairs = [232, 198, 164, 130, 98];
  return (
    <Svg {...p} title={p.title}>
      <path d="M100 272C98 220 103 150 100 66" />
      <path d="M100 272C92 276 84 278 76 276M100 272C108 277 116 278 126 275M100 272L100 279" />
      {pairs.map((y, i) => (
        <g key={y}>
          <Leaf x={100} y={y} a={-58 + i * 3} L={40 - i * 3} w={15 - i} />
          <Leaf x={100} y={y} a={58 - i * 3} L={40 - i * 3} w={15 - i} />
        </g>
      ))}
      {[60, 48, 36, 24].map((y, i) => (
        <g key={y}>
          <ellipse cx={91 - (i % 2) * 2} cy={y + 8} rx="6" ry="3.2" transform={`rotate(-24 ${91} ${y + 8})`} />
          <ellipse cx={109 + (i % 2) * 2} cy={y + 8} rx="6" ry="3.2" transform={`rotate(24 ${109} ${y + 8})`} />
        </g>
      ))}
      <path d="M100 66L100 16" />
    </Svg>
  );
}

export function Neem(p: P) {
  const ys = [244, 214, 184, 154, 124, 94];
  return (
    <Svg {...p} title={p.title}>
      <path d="M100 274C92 230 110 170 98 120C92 90 100 56 102 36" />
      {ys.map((y, i) => (
        <g key={y}>
          <Leaf x={99 + (i % 2 ? 2 : -1)} y={y} a={-66} L={46 - i * 3} w={9} />
          <Leaf x={99 + (i % 2 ? 2 : -1)} y={y - 14} a={62} L={46 - i * 3} w={9} />
        </g>
      ))}
      <Leaf x={102} y={40} a={4} L={40} w={9} />
    </Svg>
  );
}

export function Turmeric(p: P) {
  return (
    <Svg {...p} title={p.title}>
      <path d="M100 214C98 190 96 170 92 150M104 214C106 180 114 150 124 128" />
      <Leaf x={100} y={212} a={-26} L={196} w={36} />
      <Leaf x={100} y={212} a={4} L={206} w={38} />
      <Leaf x={100} y={212} a={30} L={178} w={34} />
      {/* rhizome fingers with growth rings */}
      <path d="M60 232C50 236 48 252 62 256L96 260C106 262 112 252 104 246Z" />
      <path d="M96 232C100 226 120 224 134 230C146 236 148 250 136 254L108 258" />
      <path d="M118 256C128 258 146 262 156 256C166 250 160 238 150 238" />
      {[68, 76, 84, 92].map(x => <path key={x} d={`M${x} 244C${x - 2} 250 ${x - 1} 256 ${x + 1} 259`} />)}
      {[112, 120, 128].map(x => <path key={x} d={`M${x} 236C${x + 2} 242 ${x + 2} 248 ${x} 254`} />)}
    </Svg>
  );
}

export function Ashwagandha(p: P) {
  return (
    <Svg {...p} title={p.title}>
      <path d="M100 274C100 230 96 190 100 150C104 110 98 80 100 52" />
      <path d="M99 200C80 190 64 178 52 164M100 160C122 150 140 140 150 124M100 118C86 108 76 96 70 82" />
      <Leaf x={52} y={164} a={-44} L={50} w={20} />
      <Leaf x={150} y={124} a={46} L={50} w={20} />
      <Leaf x={70} y={82} a={-30} L={44} w={18} />
      <Leaf x={100} y={52} a={8} L={44} w={19} />
      <Leaf x={100} y={236} a={-70} L={44} w={17} />
      <Leaf x={100} y={216} a={72} L={44} w={17} />
      {/* berries in papery husks */}
      {[[132, 196], [70, 138], [118, 90]].map(([x, y]) => (
        <g key={x}>
          <path d={`M${x} ${y - 14}C${x} ${y - 8} ${x} ${y - 8} ${x} ${y}`} />
          <circle cx={x} cy={y + 9} r="8" />
          <path d={`M${x - 12} ${y + 2}C${x - 14} ${y + 18} ${x - 4} ${y + 28} ${x} ${y + 28}C${x + 4} ${y + 28} ${x + 14} ${y + 18} ${x + 12} ${y + 2}`} />
        </g>
      ))}
    </Svg>
  );
}

export function Lotus(p: P) {
  const petals: [number, number, number][] = [[0, 118, 22], [-24, 106, 22], [24, 106, 22], [-48, 90, 20], [48, 90, 20], [-72, 70, 17], [72, 70, 17]];
  return (
    <Svg {...p} title={p.title}>
      <path d="M100 270L100 206" />
      {petals.map(([a, L, w]) => <Leaf key={a} x={100} y={206} a={a} L={L} w={w} vein={false} />)}
      <path d="M100 206L100 112" />
      <path d="M52 232C72 226 84 238 100 232C116 226 128 238 148 232" />
      <path d="M62 250C80 244 90 254 100 250C110 246 122 254 140 248" />
    </Svg>
  );
}

/** Pulli-kolam inspired divider: dots on a grid joined by pinched diamond loops. */
export function KolamRule({ className = '' }: { className?: string }) {
  return (
    <svg className={`botanical ${className}`} width="100%" height="26" aria-hidden="true" focusable="false" preserveAspectRatio="xMinYMid slice">
      <defs>
        <pattern id="kolam" width="52" height="26" patternUnits="userSpaceOnUse">
          <path d="M0 13Q11 5 26 0Q41 5 52 13Q41 21 26 26Q11 21 0 13Z" />
          <circle cx="26" cy="13" r="1.8" fill="currentColor" stroke="none" />
          <circle cx="0" cy="13" r="1.8" fill="currentColor" stroke="none" />
          <circle cx="52" cy="13" r="1.8" fill="currentColor" stroke="none" />
        </pattern>
      </defs>
      <rect width="100%" height="26" fill="url(#kolam)" stroke="none" />
    </svg>
  );
}
