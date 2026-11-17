import type { ReactNode } from 'react';
/** Renders *word* as <em>. Keeps content strings plain while allowing italic emphasis. */
export default function Rich({ t }: { t: string }): ReactNode {
  return <>{t.split(/(\*[^*]+\*)/).map((p, i) => (p.startsWith('*') ? <em key={i}>{p.slice(1, -1)}</em> : p))}</>;
}
