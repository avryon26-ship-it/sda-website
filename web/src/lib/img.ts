import images from '@/content/images.json';
type Entry = { file: string; ht?: { file: string } | null };
/** Halftone twin when one exists (only for sources of 900 px or more), otherwise the smooth duotone. */
export function ht(file: string): string {
  const e = (images as Entry[]).find(i => i.file === file);
  return `/${e?.ht?.file ?? file}`;
}
