# Family Trip Site

A single-page mobile website for our trip. No app to install, no login — just a link.

## How to change anything

Everything on the site comes from one file: **`trip-data.js`**.
Open it, edit the text between the quotes, save. That's it.

| To change… | Edit this part of `trip-data.js` |
| --- | --- |
| Trip name, dates | `title`, `startDate`, `endDate` |
| Day-by-day plan | `days` |
| Flights and trains | `travel` |
| Hotels | `stays` |
| What's packed, whose bag | `bags` |
| Tick-box checklist | `checklist` |
| Phone numbers | `contacts` |
| Tips and reminders | `notes` |

Rules: keep the `"quotes"` and `,` commas as they are, dates are always `YYYY-MM-DD`,
and anything left empty (`""`) simply doesn't appear on the site.

## How to see it

- **On this computer:** open `index.html` in a browser.
- **On a phone:** publish it (below) and open the link.

## How to publish (free)

GitHub Pages, in the repo settings:

1. **Settings → Pages**
2. Source: *Deploy from a branch*
3. Branch: `main` (or whichever branch holds these files), folder `/ (root)`
4. Save. After a minute the site is live at `https://<username>.github.io/trip/`

Send that link on WhatsApp. On an iPhone: Share → *Add to Home Screen* to get an
icon that opens it like an app.

## Design notes

- Five tabs at the bottom: **Today, Plan, Travel, Bags, Checklist**.
- **Today** auto-detects the current date and shows only what matters right now.
- Phone numbers are tap-to-call; addresses are tap-to-open in Maps.
- Large text, high contrast, works in light and dark mode.
- Checklist ticks are saved on each person's own phone.
- No frameworks or internet dependencies — the page loads instantly, even on weak signal.
