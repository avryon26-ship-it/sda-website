# web (Next.js)

```
cd web
npm install
npm run dev -- -p 3100      # http://localhost:3100  (English)   http://localhost:3100/ta  (Tamil)
```
`npm run dev` first copies images + JSON from ../content (scripts/sync-content.mjs).
Port 3000 is often taken by other local apps, so 3100 is used here.

Design system lives in `src/app/globals.css` (glass tokens, fallbacks, spring motion).

## Consultation cart (shop without payment)
Patients browse `/products`, add items to a cart (kept in their browser), and send it from `/consult`.
The doctor sees every cart at `/doctor` (PIN from `DOCTOR_PIN`, see `../.env.example`), calls the patient,
and records one of: suitable, visit the hospital, not suitable, plus a note. The patient follows it at `/track/<reference>`.

Requests are stored in `web/data/requests.json` (git-ignored). Delete that file to reset; it re-seeds five demo patients marked DEMO.

### Demo script (about 5 minutes)
1. Home → scroll to "From our pharmacy" → **Add to cart** on two products.
2. Header bag icon → drawer → **Send cart to doctor** → fill the short form → **Send to doctor**.
3. The tracking page appears with a reference number.
4. Open `/doctor` (on a second screen or phone). The new cart appears within 8 seconds, marked NEW.
5. Open it → **Call** (marks it called) → add a quick note → **Visit hospital** or **Suitable**.
6. Reload the patient's tracking page: it shows the doctor's advice.
