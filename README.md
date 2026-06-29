# Mananda — Community Based Organisation website

A single-page website for **Mananda**, a Community Based Organisation in Kenya
restoring dignity, safety and care to the elderly — starting with safe
sanitation.

## What's here
```
knya/
├─ index.html        # the whole site (one page, scrolls top to bottom)
├─ styles.css        # design / layout
├─ script.js         # nav, scroll animations, photo placeholders, contact form
├─ 404.html          # friendly not-found page
├─ robots.txt        # search-engine hints
├─ sitemap.xml       # search-engine sitemap
├─ .nojekyll         # tells GitHub Pages to serve files as-is
└─ assets/           # photos & video  ← see assets/PHOTOS-GO-HERE.md
```

## See it locally
Just open `index.html` in a browser. Or, for a proper local server:
```bash
# from the knya/ folder
python -m http.server 8000
# then visit http://localhost:8000
```

## Add the photos
Put the real photos/video in `assets/` using the names in
`assets/PHOTOS-GO-HERE.md`. Until then the site shows tidy labelled
placeholders, so it already looks complete.

## Things to update before going live
- **Contact details** in `index.html` (email + phone — search for "update this").
- **Donation link** — the Donate button currently points to the contact form.
  When you have an M-Pesa / PayPal / bank or fundraising link, paste it in.
- **Contact form** — works now via the visitor's email app (`mailto`). Two edits:
  1. Set the real address in `data-email="..."` on the form in `index.html`.
  2. (Optional) To collect submissions on a server instead of email, create a
     free endpoint at [Formspree](https://formspree.io) or
     [Web3Forms](https://web3forms.com) and put its URL in `data-endpoint="..."`.

## Hosting: GitHub Pages (free HTTPS)
This repo is set up to publish straight from GitHub Pages.

**Already done for you:** repo created, code pushed, and Pages enabled on the
`main` branch. Live URL:

> https://angelodsantos.github.io/mananda-cbo/

To publish future changes, just commit and push:
```bash
git add -A
git commit -m "Update site"
git push
```
GitHub rebuilds the site automatically within a minute or two.

A custom domain (e.g. `mananda.org`) can be added later in
**repo → Settings → Pages → Custom domain**.
