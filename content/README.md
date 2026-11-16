# /content

Source of truth for site copy and images. Generated from the old PHP site by `tools/build-images.mjs`; the old folder is never modified.

- `images/` optimised WebP, max 1600 px wide and under 250 KB each, grouped by `doctors/`, `clinic/`, `brand/`, `products/`, `stock-unverified/`
- `images.json` machine-readable list: size, status, alt text (en/ta), source
- `photo-sources.md` where each photo came from and its approval status
- `excluded-images.md` every old image that was left out, with the reason
- `content.en.json`, `content.ta.json` same structure; Tamil is machine-drafted and needs proofreading
- `_review/` contact sheets for approval (git-ignored, regenerate with `tools/contact.mjs`)

Regenerate: `cd tools && npm install && node build-images.mjs <old>/assets ../content`
