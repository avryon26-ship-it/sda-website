# web (Next.js)

```
cd web
npm install
npm run dev -- -p 3100      # http://localhost:3100  (English)   http://localhost:3100/ta  (Tamil)
```
`npm run dev` first copies images + JSON from ../content (scripts/sync-content.mjs).
Port 3000 is often taken by other local apps, so 3100 is used here.

Design system lives in `src/app/globals.css` (glass tokens, fallbacks, spring motion).
