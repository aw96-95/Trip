/* Builds a single self-contained preview.html by inlining the stylesheet and
   both scripts into index.html.
 *
 * Why: the real site is four files that reference each other, which works when
 * it is served from a folder (GitHub Pages, or a local server). A single file
 * can be handed to any host — or opened straight from a phone's Files app —
 * with nothing else alongside it.
 *
 *   node make-preview.js              -> writes preview.html
 *   node make-preview.js out.html     -> writes out.html
 */

const fs = require("fs");
const path = require("path");

const dir = __dirname;
const out = process.argv[2] || path.join(dir, "preview.html");

const read = (f) => fs.readFileSync(path.join(dir, f), "utf8");

const html = read("index.html");
const css = read("styles.css");
const data = read("trip-data.js");
const app = read("app.js");

/* Pull out everything inside <body>, and the body tag's own attributes —
   a wrapper host supplies its own <body>, so the class has to be re-applied. */
const bodyTag = html.match(/<body([^>]*)>/i);
const bodyClass = (bodyTag && bodyTag[1].match(/class="([^"]*)"/i) || [, ""])[1];
const inner = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)[1]
  .replace(/<script src="[^"]*"><\/script>/gi, "")   // drop the external script tags
  .trim();

const title = (html.match(/<title>([\s\S]*?)<\/title>/i) || [, "Trip"])[1];

const preview = `<title>${title}</title>
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<style>
${css}
</style>

${inner}

${/* after the markup, so document.body exists by the time this runs */ ""}
${bodyClass ? `<script>document.body.className = ${JSON.stringify(bodyClass)};</script>` : ""}

<script>
${data}
</script>
<script>
${app}
</script>
`;

fs.writeFileSync(out, preview);
console.log(`Wrote ${out} (${(preview.length / 1024).toFixed(1)} KB, no external files needed)`);
