/** Deterministic torn-paper edge for clip-path (bottom or top). Pure CSS, costs nothing to load. */
export function torn(side: 'bottom' | 'top' = 'bottom', n = 46, amp = 9, seed = 7): string {
  let s = seed; const r = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  const pts: string[] = [];
  for (let i = 0; i <= n; i++) { const x = (i / n) * 100; const y = 2 + r() * amp; pts.push(side === 'bottom' ? `${x.toFixed(1)}% calc(100% - ${y.toFixed(1)}px)` : `${x.toFixed(1)}% ${y.toFixed(1)}px`); }
  return side === 'bottom' ? `polygon(0 0, 100% 0, ${pts.reverse().join(', ')})` : `polygon(${pts.join(', ')}, 100% 100%, 0 100%)`;
}
