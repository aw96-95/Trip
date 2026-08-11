# Family Trip Site

A single-page mobile website for our trip. No app to install, no account —
just a link, a shared code, and everything in one place.

- Five tabs at the bottom: **Today, Plan, Travel, Bags, Checklist**
- **Today** knows the date and shows only what matters right now
- **English / हिंदी** toggle in the top right — one language at a time
- Phone numbers are tap-to-call, addresses are tap-to-open in Maps
- Large text, high contrast, light and dark mode
- Checklist ticks are saved on each person's own phone
- No frameworks, no internet dependencies — loads instantly on weak signal

## How to change anything

Everything comes from one file: **`trip-data.js`**. Open it, edit the text
between the quotes, save.

| To change… | Edit this part of `trip-data.js` |
| --- | --- |
| Passcode | `passcode` |
| Trip name, dates | `title`, `startDate`, `endDate` |
| Day-by-day plan | `days` |
| Flights and trains | `travel` |
| Hotels | `stays` |
| What's packed, whose bag | `bags` |
| Tick-box checklist | `checklist` |
| Phone numbers | `contacts` |
| Tips and reminders | `notes` |

Rules: keep the `"quotes"` and `,` commas as they are, dates are always
`YYYY-MM-DD`, and anything left empty (`""`) simply doesn't appear.

### The two languages

Any piece of text can be written one of two ways:

```js
"Leave home"                                 // same text in both languages
{ en: "Leave home", hi: "घर से निकलना" }     // switches with the toggle
```

Plain English is a valid entry everywhere. Add the `{ en: …, hi: … }` form only
for the lines Mummy and Papa will actually read — a line with no Hindi just
falls back to English, nothing breaks.

## The passcode — read this before publishing

`passcode` puts a code screen in front of the site. It stops a stranger who
stumbles on the link, and that is all it does.

**It is not real security.** The check runs in the browser, so the code and all
the trip content are inside the page source and anyone determined can read them
without typing anything. Treat the site as *semi-public*:

- Fine to include: hotel name and address, flight and train numbers, times,
  seat numbers, the last few digits of a booking reference.
- Keep out: Aadhaar/passport numbers, card details, full ID scans, anything
  you would not want a stranger to see.

Set `passcode: ""` to remove the screen entirely.

## How to see it

- **On this computer:** open `index.html` in a browser.
- **On a phone:** publish it (below) and open the link.

## How to publish (free)

GitHub Pages, in the repo settings:

1. **Settings → Pages**
2. Source: *Deploy from a branch*
3. Branch: the one holding these files, folder `/ (root)`
4. Save. After a minute the site is live at `https://<username>.github.io/Trip/`

Send that link on WhatsApp with the code. On a phone: Share → *Add to Home
Screen* gives it an icon that opens like an app.
