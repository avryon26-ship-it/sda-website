// Copies shared content (images + JSON) from /content into the web app so there is one source of truth.
import fs from 'fs'; import path from 'path'; import { fileURLToPath } from 'url';
const here = path.dirname(fileURLToPath(import.meta.url));
const src = path.resolve(here, '../../content');
const dst = path.resolve(here, '..');
if (!fs.existsSync(src)) { console.log('sync-content: ../content not found, skipping (Docker build copies it in)'); process.exit(0); }
fs.mkdirSync(path.join(dst, 'src/content'), { recursive: true });
for (const f of ['content.en.json', 'content.ta.json']) fs.copyFileSync(path.join(src, f), path.join(dst, 'src/content', f));
fs.rmSync(path.join(dst, 'public/images'), { recursive: true, force: true });
fs.cpSync(path.join(src, 'images'), path.join(dst, 'public/images'), { recursive: true });
console.log('sync-content: ok');
