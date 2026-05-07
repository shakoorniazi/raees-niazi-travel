# Raees Niazi Travel — Frontend Only

Bilingual EN/FR landing site that redirects all flight, hotel, and car
searches to Trip.com using your affiliate ID. **No backend required.**

## What's included

- Homepage with search panel (Flights, Hotels, Car Rental)
- Airport / city autocomplete with IATA codes (loads from `public/airports.json`)
- "Search" button → opens Trip.com with your affiliate ID baked in
- Light / Dark theme toggle
- English / French language toggle
- WhatsApp button
- About, Contact, Privacy Policy, Terms pages
- Google Analytics already installed (`G-WGXF29H29C` in `index.html`)

---

## Deploy to Vercel (FREE — recommended)

### Easiest way — Vercel CLI

1. Install Node.js 20+ from https://nodejs.org if you don't have it
2. Open a terminal in this folder and run:
   ```bash
   npm install -g vercel
   vercel
   ```
3. Follow the prompts (sign in with email or GitHub)
4. Vercel will give you a live URL like `your-site.vercel.app`

### Alternative — GitHub + Vercel dashboard

1. Push this folder to a new GitHub repository
2. Go to https://vercel.com → "Add New Project" → import the repo
3. Vercel auto-detects Vite. Defaults are correct:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Click "Deploy"

The included `vercel.json` makes sure URLs like `/contact` and `/about`
work correctly when shared directly.

---

## Deploy to Netlify (FREE — alternative)

1. Run these commands locally:
   ```bash
   npm install
   npm run build
   ```
2. Go to https://app.netlify.com/drop
3. Drag and drop the generated `dist/` folder onto the page

The included `public/_redirects` handles SPA routing on Netlify.

---

## Local development

```bash
npm install
npm run dev
```

Site runs at http://localhost:5173

## Build for production

```bash
npm run build
```

Static site is generated in `dist/`.

---

## Custom domain (raeesniazitravel.com)

1. Deploy first to Vercel or Netlify and verify it works on the temporary URL
2. In Vercel/Netlify dashboard, add `raeesniazitravel.com` as a custom domain
3. They'll show you exactly which records to update at Namecheap
4. Update DNS at Namecheap and wait for propagation (usually < 1 hour)

---

## Affiliate configuration

Your Trip.com affiliate IDs are in `src/components/search-panel.tsx`:
- Allianceid: `8119252`
- SID: `307403300`

If you ever need to change them, search the file for those numbers.

### ⚠️ Important — preserve referer for affiliate tracking

The "Search" button uses `window.open(url, "_blank", "noopener")` —
**never** add `noreferrer` to that call. Trip.com uses the HTTP Referer
header to attribute clicks. Adding `noreferrer` will break attribution
and you will lose commissions.

---

## Google Analytics

Tracking ID `G-WGXF29H29C` is in `index.html`. Replace the two occurrences
if you want to use a different GA property.
